# Testing Checklist

## Manual user flows

- [ ] First-time setup creates the child profile and first open Monday-Sunday cycle.
- [ ] Creating reward and penalty situations shows them on the dashboard and preserves non-negative amounts.
- [ ] Recording entries updates weekly totals as base + rewards - penalties.
- [ ] Closing a cycle freezes history and creates exactly one new open cycle.
- [ ] Viewing history keeps closed cycles read-only.
- [ ] Exporting JSON downloads `allowance-backup-YYYY-MM-DD.json` with profile, situations, cycles, and entries.
- [ ] Downloading the database file saves a `.sqlite` backup.
- [ ] Importing a valid backup restores data without breaking relationships.
- [ ] Importing corrupt JSON shows a friendly error message.
- [ ] Editing profile updates only future cycles when base allowance changes.

## Suggested scenarios

### First-time setup
1. Load the app with empty storage.
2. Create a profile with a valid name, emoji, and base allowance.
3. Confirm the dashboard appears and the current week is open.

### Creating situations
1. Add one reward and one penalty.
2. Verify zero/negative values are rejected.
3. Confirm used situations cannot be deleted.

### Recording entries
1. Add several rewards and penalties.
2. Confirm totals update immediately.
3. Remove an entry from the open cycle and verify totals roll back.

### Closing a cycle
1. Close the current cycle.
2. Verify the previous cycle becomes read-only.
3. Confirm a new open cycle is created for the next week.

### Viewing history
1. Open a closed cycle from history.
2. Verify all entries and totals match the closed values.
3. Confirm no edit controls modify historical data.

### Exporting and importing data
1. Export JSON and inspect required keys.
2. Import the same JSON and verify data matches before/after.
3. Corrupt the file manually and verify import fails gracefully.
4. Download the raw database file.

### Editing profile
1. Change child name and emoji.
2. Change base amount and confirm existing closed cycles are unchanged.

## Known limitations

- JSON import validates structure and key integrity, but raw `.sqlite` imports are not yet supported through the UI.
- Browser download behavior may vary slightly between browsers for automatic file prompts.
- If local storage is manually edited outside the app, invalid data is reset to a safe empty state.
