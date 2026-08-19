# 🛠️ Development Guide

## Architecture Overview

### Frontend Stack
- **React 18**: Modern React with hooks
- **TypeScript**: Strict typing for safety
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first styling
- **React Router**: Client-side routing

### Data Layer
- **sql.js**: SQLite compiled to WebAssembly
- **IndexedDB**: Browser storage for persistence
- **Local Storage**: Quick state persistence

### Design Patterns
- **Service Layer**: Business logic separated from UI
- **React Context**: Global state management
- **Custom Hooks**: Reusable stateful logic
- **Component Composition**: Modular UI components

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AmountDisplay.tsx
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── ConfirmDialog.tsx
│   ├── CurrencyInput.tsx
│   ├── EmojiPicker.tsx
│   └── ...
├── contexts/            # React contexts
│   ├── AppContext.tsx   # Main app state
│   └── ToastContext.tsx # Toast notifications
├── database/            # Database layer
│   ├── schema.ts        # SQL schema & migrations
│   ├── database.ts      # Database service
│   └── errors.ts        # Custom errors
├── hooks/               # Custom React hooks
│   ├── useProfile.ts
│   ├── useCycle.ts
│   ├── useSituations.ts
│   └── ...
├── lib/                 # Core libraries
│   └── storage.ts       # Storage abstraction
├── pages/               # Page components
│   ├── DashboardPage.tsx
│   ├── SetupPage.tsx
│   ├── SituationsPage.tsx
│   ├── HistoryPage.tsx
│   ├── StatsPage.tsx
│   └── SettingsPage.tsx
├── services/            # Business logic
│   ├── ProfileService.ts
│   ├── SituationService.ts
│   ├── CycleService.ts
│   ├── EntryService.ts
│   └── helpers.ts
├── types/               # TypeScript types
│   ├── index.ts         # Main types
│   └── app.ts           # App-specific types
├── utils/               # Utility functions
│   ├── currency.ts      # Currency formatting
│   ├── dates.ts         # Date utilities
│   ├── validation.ts    # Input validation
│   └── classNames.ts    # CSS class helpers
├── App.tsx              # Main app component
└── main.tsx             # Entry point
```

## Database Schema

### Tables

**profile** (singleton)
- `id`: Always 1
- `child_name`: Child's name
- `base_allowance_cents`: Weekly base amount (integer cents)
- `currency`: Always 'CAD'
- `created_at`, `updated_at`: Timestamps

**situations**
- `id`: Auto-increment
- `profile_id`: Foreign key to profile
- `name`: Situation name
- `amount_cents`: Absolute amount (always positive)
- `type`: 'reward' or 'penalty'
- `is_active`: Boolean (1 or 0)
- `created_at`, `updated_at`: Timestamps

**cycles**
- `id`: Auto-increment
- `profile_id`: Foreign key to profile
- `start_date`: Monday (YYYY-MM-DD)
- `end_date`: Sunday (YYYY-MM-DD)
- `base_allowance_cents`: Snapshot from profile
- `total_adjustment_cents`: Sum of entries
- `final_amount_cents`: Calculated total
- `status`: 'open' or 'closed'
- `closed_at`: Timestamp when closed
- `created_at`, `updated_at`: Timestamps

**entries**
- `id`: Auto-increment
- `cycle_id`: Foreign key to cycles
- `situation_id`: Foreign key to situations
- `note`: Optional text
- `amount_cents`: Signed amount (preserved from situation at time of recording)
- `created_at`: Timestamp

### Indexes
- Unique index on `cycles.status` where status='open' (enforces one open cycle)
- Index on `situations(profile_id, is_active)`
- Index on `cycles(profile_id, status, start_date DESC)`
- Index on `entries(cycle_id, created_at DESC)`
- Index on `entries(situation_id)`

## Key Business Rules

### 1. Single Open Cycle
- Only one cycle can have `status='open'` at any time
- Enforced by unique partial index
- New cycle created only after closing current cycle

### 2. Monday-Sunday Weeks
- All cycles start on Monday
- All cycles end on Sunday
- Use `startOfWeek` and `endOfWeek` from date-fns with `weekStartsOn: 1`

### 3. Manual Cycle Closing
- Cycles never close automatically
- User must explicitly click "Close Week"
- Confirmation dialog shows summary

### 4. Historical Data Immutability
- Closed cycles are read-only
- Entry amounts preserve situation value at recording time
- Base amount changes don't affect existing cycles

### 5. Amount Storage
- All monetary values stored as **integer cents**
- Never use floating-point for currency
- Display formatted with 2 decimal places

### 6. Data Validation
- All user inputs validated
- SQL queries use parameterized statements
- Foreign keys enforced
- Check constraints on critical fields

## Development Workflow

### Setup
```bash
npm install
npm run dev
```

### Building
```bash
npm run build      # Production build
npm run preview    # Preview production build
```

### Code Quality
```bash
npm run lint       # ESLint
npm run type-check # TypeScript checking
```

### Testing
- Manual testing checklist in docs/TESTING.md
- Test on Chrome/Edge/Safari
- Test on mobile viewport (320px, 375px, 768px)

## Common Tasks

### Adding a New Page
1. Create component in `src/pages/NewPage.tsx`
2. Add route in `src/App.tsx`
3. Update navigation in `src/components/Header.tsx`

### Adding a New Component
1. Create component in `src/components/ComponentName.tsx`
2. Export from `src/components/ui.tsx` if reusable
3. Add proper TypeScript types for props

### Modifying Database Schema
1. Update `src/database/schema.ts`
2. Add new migration object
3. Increment `CURRENT_SCHEMA_VERSION`
4. Update TypeScript types in `src/types/index.ts`
5. Update service layer methods

### Adding a New Service Method
1. Add method to appropriate service class
2. Use `helpers.ts` utilities for common operations
3. Add JSDoc comment
4. Handle errors appropriately
5. Call `databaseService.persist()` after modifications

## Performance Considerations

### Database
- Use indexes for frequent queries
- Batch operations when possible
- Cache open cycle in AppContext
- Lazy load history data

### UI
- Use React.memo for expensive components
- Lazy load routes with React.lazy
- Debounce expensive operations
- Use CSS transitions (faster than JS animations)

### Storage
- IndexedDB for large data (database file)
- localStorage for small state (UI preferences)
- Persist database after each transaction

## Security Best Practices

### SQL Injection Prevention
```typescript
// ✅ Good: Parameterized query
execute('SELECT * FROM situations WHERE id = ?', [situationId]);

// ❌ Bad: String concatenation
execute(`SELECT * FROM situations WHERE id = ${situationId}`);
```

### Input Validation
- Sanitize all text inputs
- Validate numeric ranges
- Check required fields
- Trim whitespace
- Enforce max lengths

### XSS Prevention
- React automatically escapes JSX
- Be careful with dangerouslySetInnerHTML (don't use it)
- Validate user input

## Debugging Tips

### Database Issues
```typescript
// Check current database state
const db = databaseService.getDB();
const result = db.exec('SELECT * FROM cycles WHERE status = "open"');
console.log(result);
```

### State Issues
- Use React DevTools
- Log context values
- Check localStorage/IndexedDB in browser devtools

### Build Issues
- Clear dist folder: `rm -rf dist`
- Clear node_modules: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npm run type-check`

## Browser Compatibility

### Supported Browsers
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile Safari (iOS 14+)
- Chrome Android

### Required Features
- ES2020 features
- CSS Grid and Flexbox
- IndexedDB
- WebAssembly (for sql.js)
- localStorage

## Future Enhancements

### Potential Features
- Multiple children support
- Cloud sync (optional)
- Charts and graphs
- Recurring situations
- Goal setting
- Reward milestones
- Print reports
- Dark mode
- Language support (i18n)

### Technical Improvements
- Add unit tests (Jest, Vitest)
- Add E2E tests (Playwright, Cypress)
- Improve error boundaries
- Add performance monitoring
- PWA support (offline, install)
- Web share API for export

## Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [sql.js Documentation](https://sql.js.org/)
- [React Router Docs](https://reactrouter.com/)

## Contributing Guidelines

1. Follow existing code style
2. Add TypeScript types for everything
3. Write JSDoc comments for public APIs
4. Test on multiple screen sizes
5. Ensure accessibility
6. Keep components small and focused
7. Use semantic HTML
8. Validate all user inputs
9. Handle errors gracefully
10. Document complex logic
