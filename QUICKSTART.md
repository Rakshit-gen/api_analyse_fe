# 🚀 Quick Start Guide - Windows

## Setup Frontend (5 minutes)

### Step 1: Extract and Navigate
```powershell
# Extract the zip file
# Navigate to the folder
cd api-debugger-frontend
```

### Step 2: Install Dependencies
```powershell
npm install
```

If you get permission errors:
```powershell
npm install --force
```

### Step 3: Configure Environment
```powershell
# Copy environment file
copy .env.local.example .env.local
```

The default settings work if your backend is on `localhost:8001`

### Step 4: Run Development Server
```powershell
npm run dev
```

Frontend will start on: **http://localhost:3000** 🎉

---

## Full Stack Setup

### Terminal 1: Backend (Python)
```powershell
cd E:\api-debugger\api-debugger
.\.venv\Scripts\Activate.ps1
uvicorn api.main:app --reload --port 8001
```

### Terminal 2: Frontend (Next.js)
```powershell
cd api-debugger-frontend
npm run dev
```

Now open **http://localhost:3000** and start debugging! 🔥

---

## Quick Test

1. Click **"Load 401 Example"**
2. Click **"Debug My API"**
3. Watch the magic happen! ✨

---

## Troubleshooting

### Node.js not found
```powershell
# Download and install Node.js from:
# https://nodejs.org/ (get the LTS version)
```

### Port 3000 in use
```powershell
npm run dev -- -p 3001
```

### Can't connect to backend
1. Make sure backend is running on port 8001
2. Check backend terminal for errors
3. Try accessing: http://localhost:8001/health

---

## What's Included

✅ Next.js 14 with TypeScript
✅ Tailwind CSS v3
✅ shadcn/ui components  
✅ Dark mode support
✅ Fully responsive design
✅ Example templates
✅ Markdown rendering
✅ Real-time loading states

---

## Production Build

```powershell
npm run build
npm start
```

Happy debugging! 🎯
