# StreakSmith

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

1. Initialize StreakSmith:
```bash
streaksmith init
```

2. Add your first habit:
```bash
streaksmith add "Morning Exercise"
```

3. Mark it complete for today:
```bash
streaksmith check "Morning Exercise"
```

4. See today's progress:
```bash
streaksmith today
```

## Commands

### Core Commands

- `streaksmith init` - Initialize StreakSmith data directory
- `streaksmith add <habit>` - Add a new habit
- `streaksmith list` - List all habits
- `streaksmith check <habit>` - Mark habit as completed for today
- `streaksmith uncheck <habit>` - Unmark habit for today
- `streaksmith today` - Show today's habits and completion status
- `streaksmith help` - Show help information

### Examples

```bash
# Add habits
streaksmith add "Meditate"
streaksmith add "Read for 30 minutes"
streaksmith add "Drink 8 glasses of water"

# Check off completed habits
streaksmith check "Meditate"
streaksmith check "Read"  # Partial matching works

# See your progress
streaksmith today
streaksmith list

# Undo a completion
streaksmith uncheck "Meditate"
```

## Data Storage

StreakSmith stores your data locally in `~/.streaksmith/data.json`. Your data never leaves your machine.

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