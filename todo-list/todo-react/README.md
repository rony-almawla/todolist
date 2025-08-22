# Todo Application (React + TypeScript + Redux Toolkit + MUI)

Figma: [To‑Do Application](https://www.figma.com/design/JcXWZP8aP2wo6NvRFGmbGc/To-Do-Application?node-id=0-1&t=9X32BSCEjZHpUdDi-1)

## Features
- Add, toggle complete, delete todos
- Filter by All / Active / Completed (URL synced)
- State management via Redux Toolkit
- Material UI theme with Inter font
- localStorage persistence (mock REST)

## Requirements
- Node.js >= 20.19 or >= 22.12

## Getting Started
```bash
npm install
npm run dev
```

## Project Structure
```
src/
  api/            # localStorage-backed API
  components/     # UI components
  features/todos/ # Redux slice
  hooks/          # typed store hooks
  store/          # Redux store
  types/          # app types
  theme.ts        # MUI theme (Inter font)
```

## Accessibility
- Inputs and buttons are labelled
- Tabs are keyboard accessible
- Live regions announce loading/empty states

## GitHub Workflow
1. Create a public repo and push this folder
2. Use feature branches (e.g., `feat/ui`, `feat/api`)
3. Open Pull Requests and merge after review
4. Commit daily with meaningful messages

## Deployment
### Vercel
1. Import the GitHub repo on Vercel
2. Framework Preset: Vite
3. Build Command: `vite build`
4. Output Directory: `dist`

### Netlify
1. New site from Git
2. Build Command: `vite build`
3. Publish Directory: `dist`
