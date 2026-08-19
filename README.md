# 💰 Weekly Allowance Tracker

A beautiful and intuitive web application to track a child's weekly allowance with rewards and penalties.

## ✨ Features

- 👶 **Child Profile**: Name, emoji, and base weekly allowance
- 🎯 **Situations**: Create rewards and penalties with custom amounts
- ⚡ **Quick Entry**: One-click recording of events
- 📊 **Weekly Cycles**: Monday to Sunday tracking
- 📜 **History**: View past weeks (read-only)
- 📈 **Statistics**: Overall performance metrics
- 💾 **Local Storage**: All data stored in browser (IndexedDB)
- 📱 **Responsive**: Works on desktop, tablet, and mobile
- 🎨 **Cheerful Design**: Colorful, friendly interface for kids

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:3000
```

### Build for Production

```bash
npm run build
npm run preview
```

## 🏗️ Architecture

### Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite (sql.js) in browser
- **Storage**: IndexedDB for persistence
- **Routing**: React Router v6
- **Date Handling**: date-fns
- **Build Tool**: Vite

### Project Structure

```
src/
├── components/     # Reusable UI components
├── contexts/       # React contexts (AppContext, ToastContext)
├── database/       # Database schema and service
├── hooks/          # Custom React hooks
├── pages/          # Page components
├── services/       # Business logic services
├── types/          # TypeScript type definitions
├── utils/          # Utility functions
└── lib/            # Storage and helpers
```

### Database Schema

- **profile**: Child name, emoji, base allowance
- **situations**: Reward/penalty definitions
- **cycles**: Weekly periods (Monday-Sunday)
- **entries**: Individual recorded events

All monetary values stored as **integer cents** to avoid floating-point issues.

## 📖 User Guide

### First Time Setup

1. Enter child's name
2. Pick an emoji
3. Set weekly base allowance (CAD)
4. Click "Start Tracking"

### Managing Situations

1. Go to "Situations" page
2. Add rewards (e.g., "Tried new food" +$0.50)
3. Add penalties (e.g., "Left lights on" -$0.10)
4. Toggle active/inactive as needed

### Recording Events

1. Main dashboard shows active situations as cards
2. Click a situation to record instantly
3. See total update in real-time
4. Undo available for 5 seconds

### Closing a Week

1. Click "Close Week" button
2. Review final summary
3. Confirm to close
4. New week starts automatically

### Viewing History

1. Go to "History" page
2. Click any past week
3. View detailed breakdown (read-only)

## 🔒 Security Features

- ✅ Parameterized SQL queries (no SQL injection)
- ✅ Input validation on all forms
- ✅ Data sanitization
- ✅ Confirmation for destructive actions
- ✅ Local-only storage (no external services)

## 🎨 Design Principles

- **Cheerful**: Bright colors, emojis, rounded corners
- **Clear**: Visual distinction between rewards (green) and penalties (red)
- **Quick**: Minimal clicks to record events
- **Safe**: Undo and confirmation dialogs
- **Accessible**: Keyboard navigation, screen reader support

## 📝 License

MIT License - Feel free to use and modify!

## 🙏 Credits

Built with ❤️ using modern web technologies.
