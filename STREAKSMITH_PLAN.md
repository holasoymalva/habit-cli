# StreakSmith Development Plan
*A Node.js CLI-based habit tracker with engaging visual terminal experience*

## Project Overview
StreakSmith is a terminal-native habit tracker focused on:
- Delightful visual terminal experience with distinctive identity
- Fast, low-friction habit management
- Clear progress analytics and feedback loops
- Local data storage with clean architecture

## Development Phases

### Phase 1: Minimal Core (MVP)
**Goal**: Create, list, and check-off habits; store data locally (JSON)

**Duration**: 1-2 weeks

**Components**:
- CLI command parser (commander.js)
- Data layer abstraction (repository pattern for habits and logs)
- Basic commands: `init`, `add`, `list`, `check`, `uncheck`, `today`, `help`
- Simple output formatting (chalk for colors)

**Commands to implement**:
```bash
streaksmith init                    # Initialize app, create data directory
streaksmith add "Meditate"          # Add new habit
streaksmith list                    # Show all habits
streaksmith check "Meditate"        # Mark habit as done today
streaksmith uncheck "Meditate"      # Unmark habit for today
streaksmith today                   # Show today's habits and status
streaksmith help                    # Show help screen
```

**Data Structure**:
```json
{
  "habits": [
    {
      "id": "uuid",
      "name": "Meditate",
      "createdAt": "2025-01-15",
      "archived": false
    }
  ],
  "logs": [
    {
      "habitId": "uuid",
      "date": "2025-01-15",
      "completed": true
    }
  ]
}
```

**Deliverables**:
- ✅ Habits can be added and completed for today
- ✅ Data persists in `~/.streaksmith/data.json`
- ✅ Basic help screen with command overview
- ✅ Simple colored output for status feedback

---

### Phase 2: Visual Identity & Basic Analytics
**Goal**: Establish distinctive visual branding and add streak calculations

**Duration**: 1-2 weeks

**Components**:
- ASCII art banner/logo
- Box-drawing characters for layouts
- Streak calculation logic
- Basic statistics (current streak, total completions)
- Enhanced `today` and `list` commands with visual improvements

**New Commands**:
```bash
streaksmith stats [habit-name]      # Show statistics for habit or all habits
streaksmith streaks                 # Show current streaks for all habits
```

**Visual Enhancements**:
- App banner on startup
- Boxed layouts for habit lists
- Color-coded streak indicators (🔥 for active streaks)
- Progress indicators for daily completion

**Deliverables**:
- ✅ Distinctive StreakSmith visual identity
- ✅ Current streak calculation and display
- ✅ Enhanced terminal layouts with boxes
- ✅ Color-coded status indicators

---

### Phase 3: Interactive Mode & Onboarding
**Goal**: Add guided experience for new users and interactive menu system

**Duration**: 1-2 weeks

**Components**:
- Interactive prompts using inquirer.js
- Onboarding flow for first-time users
- Menu-driven interface as alternative to commands
- Input validation and error handling

**New Features**:
```bash
streaksmith                         # Launch interactive mode
streaksmith onboard                 # Run onboarding flow
```

**Interactive Features**:
- First-run onboarding (add 3 habits, explain commands)
- Menu system for habit management
- Guided habit creation with validation
- Interactive daily check-in flow

**Deliverables**:
- ✅ Smooth onboarding for new users
- ✅ Interactive menu system
- ✅ Input validation and error handling
- ✅ Help users understand core workflows

---

### Phase 4: Advanced Analytics & Visualizations
**Goal**: Rich progress visualization and comprehensive statistics

**Duration**: 2-3 weeks

**Components**:
- Calendar view of completions
- Sparklines for trend visualization
- Weekly/monthly summary reports
- Success rate calculations
- Longest streak tracking

**New Commands**:
```bash
streaksmith calendar [habit-name]   # Show calendar view
streaksmith report [week|month]     # Generate summary reports
streaksmith trends                  # Show trend sparklines
```

**Analytics Features**:
- 30-day calendar grid with completion markers
- Mini sparklines showing weekly trends
- Success rate percentages
- Longest streak records
- Weekly/monthly completion summaries

**Deliverables**:
- ✅ Calendar visualization of habit completions
- ✅ Trend analysis with sparklines
- ✅ Comprehensive statistics dashboard
- ✅ Time-based summary reports

---

### Phase 5: Celebrations & Gamification
**Goal**: Add motivational feedback and milestone celebrations

**Duration**: 1-2 weeks

**Components**:
- Streak milestone celebrations
- Achievement system
- Motivational messages
- Progress animations
- Celebration effects for completions

**Celebration Features**:
- Animated effects for streak milestones (7, 30, 100 days)
- Achievement badges for consistency
- Motivational quotes/messages
- Progress bar animations
- Confetti-style terminal effects

**Deliverables**:
- ✅ Milestone celebration system
- ✅ Achievement tracking
- ✅ Motivational feedback loops
- ✅ Engaging completion animations

---

### Phase 6: Data Management & Export
**Goal**: Robust data handling, backup, and export capabilities

**Duration**: 1-2 weeks

**Components**:
- Data backup and restore
- Export to CSV/JSON
- Data migration utilities
- SQLite migration preparation
- Data integrity checks

**New Commands**:
```bash
streaksmith backup                  # Create data backup
streaksmith restore <file>          # Restore from backup
streaksmith export [format]         # Export data (csv, json)
streaksmith migrate                 # Prepare for future migrations
```

**Deliverables**:
- ✅ Data backup and restore functionality
- ✅ Export capabilities for external analysis
- ✅ Data integrity validation
- ✅ Migration framework for future enhancements

---

## Technical Architecture

### Core Dependencies
```json
{
  "commander": "^11.0.0",      // CLI framework
  "chalk": "^5.3.0",           // Terminal colors
  "inquirer": "^9.2.0",        // Interactive prompts
  "boxen": "^7.1.0",           // Terminal boxes
  "cli-table3": "^0.6.0",      // Tables
  "date-fns": "^2.30.0",       // Date utilities
  "uuid": "^9.0.0"             // Unique IDs
}
```

### Project Structure
```
streaksmith/
├── bin/
│   └── streaksmith.js           # CLI entry point
├── src/
│   ├── commands/                # Command implementations
│   ├── data/                    # Data layer (repository pattern)
│   ├── ui/                      # Terminal UI components
│   ├── utils/                   # Utilities and helpers
│   └── config/                  # Configuration management
├── tests/
└── docs/
```

### Data Layer Abstraction
- Repository pattern for clean data access
- Interface-based design for easy SQLite migration
- Validation layer for data integrity
- Caching for performance optimization

## Success Metrics
- **Usability**: New users can add habits and complete first check-in within 2 minutes
- **Performance**: All commands execute in <200ms
- **Reliability**: Zero data loss with proper error handling
- **Engagement**: Visual feedback makes daily usage delightful

## Future Considerations
- SQLite migration for better performance
- Habit categories and tags
- Goal setting and targets
- Data synchronization across devices
- Plugin system for custom visualizations