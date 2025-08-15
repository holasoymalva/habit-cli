# Habit-CLI

A delightful CLI habit tracker with visual terminal experience.

## Installation

```bash
npm install -g .
```

Or run locally:
```bash
npm install
npm link
```

## Quick Start

1. Initialize Habit-CLI:
```bash
habit-cli init
```

2. Add your first habit:
```bash
habit-cli add "Morning Exercise"
```

3. Mark it complete for today:
```bash
habit-cli check "Morning Exercise"
```

4. See today's progress:
```bash
habit-cli today
```

## Commands

### Core Commands

- `habit-cli init` - Initialize Habit-CLI data directory
- `habit-cli add <habit>` - Add a new habit
- `habit-cli list` - List all habits
- `habit-cli check <habit>` - Mark habit as completed for today
- `habit-cli uncheck <habit>` - Unmark habit for today
- `habit-cli today` - Show today's habits and completion status
- `habit-cli help` - Show help information

### Examples

```bash
# Add habits
habit-cli add "Meditate"
habit-cli add "Read for 30 minutes"
habit-cli add "Drink 8 glasses of water"

# Check off completed habits
habit-cli check "Meditate"
habit-cli check "Read"  # Partial matching works

# See your progress
habit-cli today
habit-cli list

# Undo a completion
habit-cli uncheck "Meditate"
```

## Data Storage

Habit-CLI stores your data locally in `~/.habit-cli/data.json`. Your data never leaves your machine.

## Phase 1 Features ✅

- ✅ Create, list, and check-off habits
- ✅ Local JSON storage
- ✅ Basic colored terminal output
- ✅ Partial habit name matching
- ✅ Today's progress overview with progress bar
- ✅ Data persistence across sessions

## Coming Soon

- Visual identity with ASCII banners
- Streak calculations and analytics
- Interactive mode and onboarding
- Calendar views and trend analysis
- Celebration effects and achievements