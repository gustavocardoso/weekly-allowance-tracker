# Requirements Document
## Weekly Allowance Tracker App

**Version:** 1.0  
**Date:** August 19, 2026  
**Interface language:** English  
**Initial platform:** Local application for a single user  
**Persistence:** SQLite database

## 1. Overview

The application will allow a parent or guardian to track a child’s weekly allowance. The responsible adult will define a weekly base amount, create situations that increase or decrease the allowance, and record those events during the week.

Each weekly cycle starts on Monday and ends on Sunday night. The cycle will not close automatically. Instead, the responsible adult will click a button to close it. Once closed, the application will automatically create a new weekly cycle while preserving the previous cycle as read-only history.

The interface should be simple, attractive, and appropriate for a child or teenager, using colors, emojis, cards, icons, and clear progress indicators.

## 2. Objectives

The application must:

- Track the weekly allowance amount.
- Allow the user to define the child’s name, emoji, and weekly base amount.
- Allow the user to create reward and penalty situations.
- Make it quick to record each event during the week.
- Display the current accumulated amount for the active cycle.
- Display total rewards and total penalties separately.
- Provide access to previously closed cycles.
- Show the child how different actions affect the allowance.
- Prevent data loss when the application is closed or restarted.
- Run locally without requiring an account or internet connection.

## 3. Initial scope

### Included

- Child profile configuration.
- Weekly base allowance configuration.
- Creation, editing, activation, and deactivation of situations.
- Reward and penalty entry logging.
- Weekly cycle management.
- Cycle history.
- Per-cycle financial summary.
- SQLite database.
- Responsive interface for desktop, tablet, and mobile.
- English interface.
- Single profile and single user.

### Not included initially

- Login or authentication.
- Multiple guardians.
- Multiple children.
- Cloud synchronization.
- Native iOS or Android applications.
- Bank or payment integrations.
- Email or push notifications.
- Automatic task verification through sensors or external integrations.
- User roles or permissions.

These features may be considered for future versions.

## 4. Core concepts

### Child profile

The profile contains the information displayed throughout the application:

- Name.
- Emoji or avatar.
- Weekly base amount.
- Optional visual preferences.

Example:

- Name: Sofia
- Emoji: 🦄
- Weekly base allowance: CAD 5.00

### Situation

A situation represents a behavior that changes the allowance.

Each situation must contain:

- Name.
- Optional description.
- Emoji or icon.
- Type: reward or penalty.
- Adjustment amount.
- Active or inactive status.
- Optional display order.

Examples:

| Situation | Type | Amount |
|---|---:|---:|
| Left the lights on | Penalty | -CAD 0.10 |
| Forgot to flush the toilet | Penalty | -CAD 0.10 |
| Did not clean the bathroom | Penalty | -CAD 0.10 |
| Tried a new food — at least 2 bites | Reward | +CAD 0.50 |

### Weekly cycle

A cycle represents one allowance week:

- Starts on Monday.
- Ends on Sunday.
- Initial state: open.
- Final state: closed.
- Only one cycle may be open at a time.
- A new cycle is created after the current cycle is closed.

The cycle must store its exact date range, for example:

- Monday, August 17, 2026.
- Sunday, August 23, 2026.

The application must not close the cycle automatically at midnight on Sunday. It remains open until the user selects **Close Cycle**.

### Entry

An entry is a recorded occurrence of a situation during a cycle.

Each entry must store:

- The selected situation.
- The amount applied at the time of recording.
- Date and time.
- Optional note.
- Related cycle.

The amount must be stored on the entry itself so that historical records remain accurate if the situation is edited later.

## 5. Functional requirements

### FR-01 — Initial setup

On first use, the application must display an initial setup screen.

The user must enter:

- Child’s name.
- Emoji or avatar.
- Weekly base amount.

The base amount must support Canadian dollars with up to two decimal places.

Suggested default:

```text
CAD 5.00
```

After the profile is saved, the application must automatically create the first open weekly cycle.

### FR-02 — Profile editing

The user must be able to edit:

- Name.
- Emoji.
- Weekly base amount.

A base-amount change must affect only new cycles. Existing or closed cycles must not be recalculated.

If an open cycle exists, the application should make clear that changing the profile amount will not modify the base amount already stored for that cycle.

### FR-03 — Create situations

The user must be able to create a situation with these fields:

- Required name.
- Optional description.
- Optional emoji.
- Type: Reward or Penalty.
- Required amount greater than zero.
- Active or inactive status.

The application should store the type internally as a positive or negative adjustment.

Example:

```text
Type: Reward
Entered amount: 0.50
Applied amount: +0.50
```

```text
Type: Penalty
Entered amount: 0.10
Applied amount: -0.10
```

### FR-04 — Edit situations

The user must be able to edit an existing situation.

Future changes must not modify existing entries. For example, if a penalty was CAD 0.10 and later changes to CAD 0.25, previous entries remain CAD 0.10.

### FR-05 — Activate and deactivate situations

The user must be able to deactivate a situation without deleting it.

Deactivated situations:

- Must not appear on the main screen for new entries.
- Must remain available in historical records.
- Must not delete previous entries.

Permanent deletion should be prevented when a situation has already been used. In that case, the application should offer deactivation instead.

### FR-06 — View the current cycle

The main screen must display:

- Child’s name and emoji.
- Current cycle date range.
- Base allowance.
- Total rewards.
- Total penalties.
- Net adjustment.
- Current allowance amount.
- Number of recorded entries.
- Button to close the cycle.

Example:

```text
Sofia 🦄

Week of August 17–23

Base allowance     CAD 5.00
Rewards            +CAD 1.50
Penalties          -CAD 0.30
Net adjustment     +CAD 1.20
Weekly total       CAD 6.20
```

### FR-07 — Quick entry

The main screen must display active situations as large cards or buttons.

Each card should show:

- Emoji.
- Name.
- Amount.
- A visual distinction between rewards and penalties.

When the user clicks a situation, the application must:

1. Create an entry in the current cycle.
2. Immediately update the totals.
3. Display visual confirmation.
4. Provide an option to undo the last action for a short period.

Example feedback:

```text
+CAD 0.50 recorded 🎉
```

or:

```text
-CAD 0.10 recorded
```

### FR-08 — Multiple occurrences

The application must support multiple occurrences of the same situation.

Example:

- The child left the lights on twice.
- The user records the situation twice.
- Total penalty: CAD 0.20.

The interface may support repeated clicks or a quantity control. It should reduce accidental duplicate entries through confirmation or an undo option.

### FR-09 — Entry notes

The user must be able to add an optional note when recording a situation.

Examples:

```text
Tried broccoli and mango.
```

```text
Left the bathroom light on overnight.
```

### FR-10 — Current-cycle entry list

The main screen must show entries recorded in the current cycle.

Each item should display:

- Situation emoji and name.
- Reward or penalty amount.
- Date and time.
- Note, when present.
- Option to remove or correct the entry.

The newest entries should appear first.

### FR-11 — Correct or remove an entry

The user must be able to remove an incorrectly recorded entry.

The application must request confirmation before removal. After removal, the cycle totals must be recalculated immediately.

### FR-12 — Allowance calculation

The cycle total must be calculated as follows:

\[
	ext{Cycle total} = 	ext{Base allowance} + 	ext{Total rewards} - 	ext{Total penalties}
\]

Example:

```text
Base allowance:  CAD 5.00
Rewards:         CAD 1.50
Penalties:       CAD 0.30
Total:           CAD 6.20
```

By default, the payable amount should not be lower than zero.

The application may still display the gross result and the payable result separately when penalties exceed the base amount:

```text
Base allowance:  CAD 5.00
Penalties:       CAD 6.00
Gross total:     -CAD 1.00
Payable amount:  CAD 0.00
```

### FR-13 — Close the cycle

The user must be able to close the current cycle through a **Close Cycle** button.

The application must:

1. Display a final summary.
2. Show the weekly total.
3. Request confirmation.
4. Mark the cycle as closed.
5. Store the closing date and time.
6. Automatically create a new open cycle.
7. Redirect the user to the new cycle.

The button should be visible only when an open cycle exists.

Suggested confirmation:

```text
Close Sofia’s week?

Weekly total: CAD 6.20

After closing, this cycle will be view-only.
A new cycle will start automatically.
```

### FR-14 — Create a new cycle

After a cycle is closed, the application must create a new cycle:

- Starting on the following Monday.
- Ending on the following Sunday.
- Using the current profile base amount.
- With no entries.
- In an open state.

If the application is opened after a new week has started and no open cycle exists, it should create the cycle for the current week.

The application must not automatically close an old open cycle only because the calendar week has changed. It should alert the user and offer a clear way to close the previous cycle first.

### FR-15 — Cycle history

The user must be able to access a history screen containing:

- Cycle period.
- Closing date.
- Base amount used.
- Total rewards.
- Total penalties.
- Final allowance amount.
- Cycle status.

Cycles should be listed from newest to oldest.

### FR-16 — Historical cycle details

When a historical cycle is selected, the application must show:

- Financial summary.
- All entries.
- Date and time of each entry.
- Notes.
- Base amount used.
- Applied situations and the recorded historical amounts.

Closed cycles should be read-only in the normal interface.

### FR-17 — Cumulative statistics

The application should show general statistics so the child can understand how actions have affected the allowance.

Possible statistics include:

- Total rewards across all cycles.
- Total penalties across all cycles.
- Total allowance earned.
- Number of closed cycles.
- Average weekly allowance.
- Most frequently used situation.
- Highest-earning week.
- Week with the most rewards.
- Week with the most penalties.

The first version may include only total rewards, total penalties, total received, and number of weeks.

### FR-18 — Currency formatting

All monetary amounts must:

- Use Canadian dollars.
- Display two decimal places.
- Use a Canadian locale format.
- Clearly distinguish positive and negative amounts.

Suggested display format:

```text
CAD 5.00
+CAD 0.50
-CAD 0.10
```

Monetary values should preferably be stored as integer cents to avoid floating-point rounding errors.

## 6. Interface requirements

### IR-01 — Visual style

The interface should be:

- Cheerful.
- Elegant.
- Easy to understand.
- Suitable for children and teenagers.
- Visually organized without appearing overly childish.
- Responsive across screen sizes.

Suggested visual elements:

- Rounded cards.
- Soft colors.
- Subtle gradients.
- Large emojis.
- Clear icons.
- Short animations when recording an action.
- Progress indicators.

### IR-02 — Main screen

Suggested layout:

1. Header with name and emoji.
2. Card showing the current weekly amount.
3. Rewards and penalties summary.
4. Grid of active situations.
5. Recent activity list.
6. Close-cycle button.
7. Navigation to history and settings.

### IR-03 — Color conventions

Suggested visual convention:

- Green or blue: rewards.
- Red or orange: penalties.
- Purple or dark blue: current total.
- Gray: neutral information.

Color must not be the only way to distinguish rewards and penalties. Amounts should also include explicit signs such as `+` and `-`, along with icons or labels.

### IR-04 — Responsiveness

The application must work well on:

- Desktop.
- Tablet.
- Mobile.

On smaller screens:

- Cards should reorganize into one or two columns.
- Buttons should have comfortable touch targets.
- The main summary should remain visible without excessive scrolling.
- Navigation should be simplified.

### IR-05 — Accessibility

The interface should follow accessibility best practices:

- Sufficient text/background contrast.
- Keyboard navigation.
- Visible focus states.
- Clear button labels.
- Alternative text or accessible descriptions for relevant icons.
- No reliance on color alone.
- Readable font sizes.
- Clear confirmation messages.
- Screen-reader support for primary controls.

## 7. Data model

### `profile` table

| Field | Type | Description |
|---|---|---|
| `id` | INTEGER | Identifier |
| `name` | TEXT | Child’s name |
| `emoji` | TEXT | Emoji or avatar |
| `base_amount_cents` | INTEGER | Base amount in cents |
| `created_at` | DATETIME | Creation timestamp |
| `updated_at` | DATETIME | Last update timestamp |

Because the application supports one profile, this table should contain only one record.

### `situations` table

| Field | Type | Description |
|---|---|---|
| `id` | INTEGER | Identifier |
| `name` | TEXT | Situation name |
| `description` | TEXT | Optional description |
| `emoji` | TEXT | Optional emoji |
| `type` | TEXT | `reward` or `penalty` |
| `amount_cents` | INTEGER | Positive amount in cents |
| `is_active` | BOOLEAN | Whether it appears for new entries |
| `sort_order` | INTEGER | Display order |
| `created_at` | DATETIME | Creation timestamp |
| `updated_at` | DATETIME | Last update timestamp |

### `cycles` table

| Field | Type | Description |
|---|---|---|
| `id` | INTEGER | Identifier |
| `start_date` | DATE | Monday of the cycle |
| `end_date` | DATE | Sunday of the cycle |
| `base_amount_cents` | INTEGER | Base amount for this cycle |
| `status` | TEXT | `open` or `closed` |
| `closed_at` | DATETIME | Closing timestamp |
| `created_at` | DATETIME | Creation timestamp |

### `entries` table

| Field | Type | Description |
|---|---|---|
| `id` | INTEGER | Identifier |
| `cycle_id` | INTEGER | Related cycle |
| `situation_id` | INTEGER | Related situation |
| `situation_name` | TEXT | Name preserved when recorded |
| `amount_cents` | INTEGER | Applied amount, positive or negative |
| `note` | TEXT | Optional note |
| `occurred_at` | DATETIME | Event date and time |
| `created_at` | DATETIME | Creation timestamp |

The `amount_cents` field must preserve the historical value even if the situation is edited later.

## 8. Business rules

### BR-01 — One open cycle

At most one cycle may be open at any time.

### BR-02 — Entries only in the open cycle

New entries may be added only to the open cycle.

### BR-03 — Closed cycles

Closed cycles remain available for viewing and must not be recalculated because of future profile or situation changes.

### BR-04 — Monday-based week

The application must calculate weekly cycles with Monday as the first day and Sunday as the last day.

### BR-05 — Manual closing

The transition from Sunday to Monday must not automatically close the cycle.

If an old cycle is still open, the application should notify the user and offer the option to close it before starting another cycle.

### BR-06 — New cycle after closing

The new cycle must be created only after the user confirms closing the current cycle.

### BR-07 — Negative values

Penalty situations must be stored as negative values in entries.

### BR-08 — Base amount changes

The base amount must be copied to the cycle when that cycle is created.

### BR-09 — Entry deletion

Deleting an entry requires confirmation and must update totals immediately.

### BR-10 — Accidental duplicates

The application should provide visual feedback and preferably an undo action to reduce accidental duplicate entries.

## 9. Main user flows

### Flow A — First-time setup

1. The user opens the application.
2. The application detects that no profile exists.
3. The initial setup form is displayed.
4. The user enters the name, emoji, and base amount.
5. The user saves the form.
6. The application creates the first weekly cycle.
7. The user is redirected to the main screen.

### Flow B — Record a reward

1. The user opens the current-cycle screen.
2. The user selects “Tried a new food.”
3. The application records `+CAD 0.50`.
4. The weekly total is updated.
5. A success message is displayed.
6. The entry appears in recent activity.

### Flow C — Record a penalty

1. The user selects “Left the lights on.”
2. The application records `-CAD 0.10`.
3. The weekly total is updated.
4. The penalty is clearly displayed.
5. The user can undo the action.

### Flow D — Close a week

1. The user clicks **Close Cycle**.
2. The application displays the final summary.
3. The user confirms.
4. The application closes the cycle.
5. A new cycle is created automatically.
6. The main screen displays the new empty week with the current base amount.

### Flow E — View history

1. The user opens **History**.
2. The application lists closed cycles.
3. The user selects a cycle.
4. The application displays its amounts and entries.
5. The cycle remains view-only.

## 10. Technical requirements

### TR-01 — Local execution

The application must run locally without relying on external services for its core functionality.

It may be implemented as:

- A local web application.
- A simple desktop application.
- An application served by a local development server.

The final choice should consider technical familiarity, maintainability, and ease of installation.

### TR-02 — Database

The database must be SQLite and should provide:

- A local database file.
- Persistence after application restart.
- Versioned schema migrations.
- Enabled foreign-key constraints.
- Indexes for cycles and entries.
- Consistent date storage.

### TR-03 — Financial integrity

Monetary values must be stored as integers representing cents. Floating-point values must not be used for financial storage.

### TR-04 — Basic security

The application must:

- Validate form input.
- Reject invalid values.
- Prevent SQL injection through parameterized queries.
- Require confirmation for destructive actions.
- Validate that entries belong to the correct cycle.

### TR-05 — Backup

The first version should provide at least one of the following:

- Manual copying of the SQLite file.
- JSON export.
- CSV export.
- Backup creation from the settings screen.

A simple data export and import feature is recommended.

### TR-06 — Currency configuration

The initial currency must be:

```text
CAD — Canadian dollar
```

Support for other currencies may be added later.

## 11. Acceptance criteria

The application will be considered functional when:

- The user can configure the name, emoji, and base amount.
- A weekly cycle is created automatically after initial setup.
- The cycle begins on Monday and ends on Sunday.
- The cycle remains open until manually closed.
- The user can create rewards and penalties.
- The user can edit and deactivate situations.
- The user can record a situation with one click or a small number of steps.
- Rewards, penalties, and the final allowance are calculated correctly.
- The user can remove an incorrect entry.
- Closing a cycle automatically creates the next cycle.
- Previous cycles can be viewed.
- Future changes do not modify historical cycles.
- Data remains available after restarting the application.
- Monetary values display two decimal places in Canadian dollars.
- The interface works on desktop and mobile.
- The main workflow is understandable to a child or teenager.

## 12. Suggested navigation

### Home

- Current cycle.
- Current weekly amount.
- Situation buttons.
- Recent activity.
- Close-cycle action.

### History

- List of previous cycles.
- Details for each cycle.
- Rewards, penalties, and final amounts.

### Situations

- Create a situation.
- Edit a situation.
- Activate or deactivate a situation.
- Reorder situations.

### Settings

- Edit profile.
- Change the base amount.
- Export or import data.
- Select a theme.
- View application information.

## 13. Future improvements

Potential future features include:

- Support for multiple children.
- Separate parent and child profiles.
- Savings goals.
- Weekly progress charts.
- Badges and achievements.
- Recurring tasks.
- Reminders.
- Dark mode.
- Installable PWA.
- Device synchronization.
- Automatic backups.
- PDF export.
- Tracking of allowance payments actually made.
- Rules with limits or maximum frequency.
- Parent approval for entries.
- Notification integrations.
- Additional languages.

## 14. MVP priorities

The first version should prioritize:

1. Profile setup.
2. Situation management.
3. Open weekly cycle.
4. Quick reward and penalty logging.
5. Balance calculation.
6. Manual cycle closing.
7. Automatic creation of the next cycle.
8. Cycle history.
9. SQLite persistence.
10. Responsive and visually appealing interface.

The most important workflow is allowing the responsible adult to quickly record a reward or penalty while making it immediately clear to the child how each action affected the allowance.
