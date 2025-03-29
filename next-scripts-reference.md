
# Next.js Scripts Reference

When updating your package.json file, replace the current scripts section with these Next.js scripts:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
}
```

These scripts will:
- `dev`: Start the development server on http://localhost:3000
- `build`: Build the application for production
- `start`: Start a production server
- `lint`: Run ESLint to catch errors and enforce code quality
