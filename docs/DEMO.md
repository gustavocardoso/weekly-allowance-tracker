# 🎬 Demo Walkthrough

## Quick Start

1. Open http://localhost:5173 (or deployed URL)
2. First-time setup will appear automatically

## Demo Flow

### 1. Initial Setup (First-Time User)
1. **See Welcome Screen**
   - Clean, friendly interface
   - Large emoji display

2. **Enter Child Information**
   - Name: "Sofia"
   - Emoji: 🦄 (pick from emoji picker)
   - Base Allowance: CAD $5.00
   - Click "Start Tracking"

3. **See Dashboard**
   - Automatically creates first week cycle
   - Shows current week (Monday-Sunday)
   - Empty state with no situations yet

### 2. Create Situations

1. **Click "Situations" in navigation**

2. **Add Reward Situations**
   - Name: "Tried a new food"
   - Type: Reward
   - Amount: $0.50
   - Emoji: 🥗
   - Save

   - Name: "Helped with chores"
   - Type: Reward  
   - Amount: $1.00
   - Emoji: 🧹
   - Save

3. **Add Penalty Situations**
   - Name: "Left lights on"
   - Type: Penalty
   - Amount: $0.10
   - Emoji: 💡
   - Save

   - Name: "Forgot to flush toilet"
   - Type: Penalty
   - Amount: $0.10
   - Emoji: 🚽
   - Save

4. **Return to Dashboard**
   - See situation cards displayed

### 3. Record Events

1. **Record Rewards**
   - Click "Tried a new food" card
   - See toast notification: "+$0.50 recorded 🎉"
   - Watch total update: $5.00 → $5.50
   - Click "Helped with chores"
   - Total now: $6.50

2. **Record Penalties**
   - Click "Left lights on"
   - See toast: "-$0.10 recorded"
   - Total updates: $6.50 → $6.40

3. **Add Multiple Events**
   - Click same situation multiple times
   - Each click adds one entry
   - Totals update immediately

4. **Undo Last Entry** (if needed)
   - Undo button appears in toast for 5 seconds
   - Click "Undo" to remove last entry

5. **View Entry List**
   - Scroll down to see all entries
   - Newest entries appear first
   - Each shows: emoji, name, amount, date/time
   - Click "Remove" to delete an entry (with confirmation)

### 4. View Summary

On Dashboard, see:
- **Base Allowance**: CAD $5.00
- **Rewards**: +CAD $1.50 (3 entries)
- **Penalties**: -CAD $0.10 (1 entry)
- **Net Adjustment**: +CAD $1.40
- **Weekly Total**: CAD $6.40

### 5. Close the Week

1. **Click "Close Week" button**
2. **See Confirmation Dialog**
   - Shows final summary
   - Weekly total: CAD $6.40
   - Warning that week will be read-only
3. **Click "Confirm"**
4. **See Success**
   - Week closes
   - New week starts automatically
   - Empty entry list for new week
   - Base amount carries over

### 6. View History

1. **Click "History" in navigation**
2. **See List of Closed Weeks**
   - Week of Aug 17-23, 2026
   - Closed: Aug 24, 2026
   - Final amount: CAD $6.40
3. **Click on a Week**
4. **See Detailed Breakdown**
   - All entries preserved
   - Financial summary
   - Read-only view
5. **Return to Dashboard**

### 7. View Statistics

1. **Click "Stats" in navigation**
2. **See Overall Performance**
   - Total rewards earned (all time)
   - Total penalties (all time)
   - Total allowance received
   - Number of weeks completed
   - Average weekly allowance
   - Most used situation
   - Charts showing trends

### 8. Manage Settings

1. **Click "Settings" in navigation**
2. **Edit Profile**
   - Change name, emoji, or base amount
   - Warning when changing base amount
3. **Export Data**
   - Click "Export Data"
   - Downloads JSON file
   - Includes all data (profile, situations, cycles, entries)
4. **Import Data**
   - Click "Choose File"
   - Select previously exported file
   - Confirmation dialog
   - Data restored

## Demo Scenarios

### Scenario A: Successful Week
- Multiple rewards recorded
- Few or no penalties
- High weekly total
- Child sees positive feedback

### Scenario B: Learning Week  
- More penalties than usual
- Lower than base amount
- Visual feedback shows areas to improve

### Scenario C: Long-Term Tracking
- Multiple weeks closed
- View history to see progress
- Statistics show improvement over time
- Patterns emerge (e.g., "Most common reward")

## Key Features to Highlight

1. **One-Click Recording**
   - Fast and simple
   - Instant visual feedback
   - Perfect for busy parents

2. **Cheerful Design**
   - Bright colors
   - Fun emojis
   - Positive reinforcement

3. **Educational Value**
   - Teaches cause and effect
   - Builds financial awareness
   - Encourages good behavior

4. **Data Persistence**
   - All data stored locally
   - No account required
   - Complete privacy

5. **Mobile Friendly**
   - Works on phone, tablet, desktop
   - Touch-friendly buttons
   - Responsive layout

6. **Historical Tracking**
   - See progress over time
   - Read-only past weeks
   - Never lose data

## Tips for Demo

1. **Start Fresh**
   - Clear browser data if needed
   - Show first-time setup

2. **Use Real Examples**
   - Situations kids actually do
   - Relatable scenarios

3. **Show Mobile View**
   - Resize browser window
   - Demonstrate responsiveness

4. **Highlight Speed**
   - One-click recording
   - Instant updates
   - Smooth animations

5. **Explain Benefits**
   - Teaches responsibility
   - Transparent allowance system
   - Reduces parent-child conflicts

## Common Questions

**Q: What if the child disagrees with a penalty?**
A: Parent can remove the entry with one click.

**Q: Can I have negative allowance?**
A: The app shows negative but typically pays $0 minimum.

**Q: What happens if I change the base amount?**
A: Only affects future weeks; historical data unchanged.

**Q: Is the data private?**
A: Yes, 100% local storage, never sent to servers.

**Q: Can I track multiple children?**
A: Not in v1.0, but planned for future version.

**Q: What if I lose my data?**
A: Export regularly as backup (JSON file).

## Demo Script (2 Minutes)

```
[0:00] "This is the Weekly Allowance Tracker—a simple way to manage your 
        child's allowance with rewards and penalties."

[0:10] "Setup is quick: just enter your child's name, pick a fun emoji, 
        and set the weekly base amount."

[0:20] "Create situations like 'Tried new food' for +50 cents, or 
        'Left lights on' for -10 cents."

[0:30] "Recording is one-click simple. Just tap a situation, and the 
        total updates instantly with visual feedback."

[0:40] "The dashboard shows everything at a glance: base amount, rewards, 
        penalties, and the weekly total."

[0:50] "At the end of the week, close the cycle with one click. A new 
        week starts automatically."

[1:00] "View history to see past weeks and track progress over time."

[1:10] "Statistics show overall performance and most common situations."

[1:20] "Everything is private and stored locally in your browser. 
        Export your data anytime for backup."

[1:30] "It's educational, transparent, and makes allowance management 
        fun for kids and stress-free for parents."

[1:40] "Try it today—no account needed, no cost, just better allowance 
        tracking."
```
