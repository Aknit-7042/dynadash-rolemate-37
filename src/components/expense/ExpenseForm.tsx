
import React, { useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { toast } from 'sonner';
import { upload } from 'lucide-react';

const ExpenseForm: React.FC = () => {
  const [amount, setAmount] = useState<string>('0.00');
  const [category, setCategory] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [receiptPreview, setReceiptPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only numbers and decimal point
    const value = e.target.value.replace(/[^0-9.]/g, '');
    setAmount(value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setReceiptFile(file);
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setReceiptPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveReceipt = () => {
    setReceiptFile(null);
    setReceiptPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    if (!category) {
      toast.error('Please select a category');
      return;
    }
    if (!description) {
      toast.error('Please provide a description');
      return;
    }

    // If all validations pass, submit the form
    toast.success('Expense submitted successfully!');
    
    // Reset form
    setAmount('0.00');
    setCategory('');
    setDescription('');
    setReceiptFile(null);
    setReceiptPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-6">Submit New Expense</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (₹)</Label>
              <Input
                id="amount"
                type="text"
                value={amount}
                onChange={handleAmountChange}
                placeholder="0.00"
                className="text-lg"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Travel, Meals, Equipment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="travel">Travel</SelectItem>
                  <SelectItem value="meals">Meals</SelectItem>
                  <SelectItem value="equipment">Equipment</SelectItem>
                  <SelectItem value="office-supplies">Office Supplies</SelectItem>
                  <SelectItem value="training">Training</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2 mb-6">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide details about the expense"
              rows={4}
            />
          </div>
          
          <div className="space-y-2 mb-6">
            <Label>Upload Receipt</Label>
            <input
              type="file"
              accept="image/*,.pdf"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            
            {!receiptPreview ? (
              <div 
                className="border-2 border-dashed rounded-md p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={handleUploadClick}
              >
                <div className="flex flex-col items-center">
                  <upload className="h-10 w-10 text-gray-400 mb-2" />
                  <p className="text-gray-500">Click to upload receipt</p>
                  <p className="text-xs text-gray-400 mt-1">JPG, PNG, or PDF</p>
                </div>
              </div>
            ) : (
              <div className="relative border rounded-md p-2">
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center mr-4">
                    {receiptFile?.type.includes('image') ? (
                      <img 
                        src={receiptPreview} 
                        alt="Receipt preview" 
                        className="max-w-full max-h-full object-contain" 
                      />
                    ) : (
                      <div className="text-gray-400">PDF</div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium truncate">{receiptFile?.name}</p>
                    <p className="text-sm text-gray-500">{(receiptFile?.size / 1024).toFixed(2)} KB</p>
                  </div>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={handleRemoveReceipt}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          <Button type="submit" className="w-full py-6 text-lg">
            Submit Expense
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ExpenseForm;
