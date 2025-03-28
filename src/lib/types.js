
// Roles
// 'hr' | 'manager' | 'employee'

// User object structure:
// id: string
// name: string
// email: string
// avatar?: string
// roles: Role[]
// primaryRole: Role

// NavigationItem structure:
// name: string
// href: string
// icon: React.ComponentType<{ className?: string }>
// roles: Role[]

// Task structure:
// id: string
// title: string
// description: string
// status: 'pending' | 'in-progress' | 'completed'
// dueDate: string
// assignedTo: string

// LeaveRequest structure:
// id: string
// employeeId: string
// employeeName: string
// startDate: string
// endDate: string
// reason: string
// status: 'pending' | 'approved' | 'rejected'

// Expense structure:
// id: string
// employeeId: string
// employeeName: string
// amount: number
// category: string
// date: string
// status: 'pending' | 'approved' | 'rejected'

// AttendanceRecord structure:
// id: string
// employeeId: string
// date: string
// checkin: string
// checkout: string | null
// status: 'present' | 'absent' | 'late' | 'half-day'

// SalarySlip structure:
// id: string
// employeeId: string
// month: string
// year: number
// basicSalary: number
// allowances: number
// deductions: number
// netSalary: number
// issueDate: string

// CompanyUpdate structure:
// id: string
// title: string
// content: string
// date: string
// author: string
// important: boolean

// Employee structure:
// id: string
// name: string
// email: string
// position: string
// department: string
// joinDate: string
// managerId: string | null

// PerformanceMetric structure:
// id: string
// employeeId: string
// category: string
// score: number
// period: string
// comments: string
