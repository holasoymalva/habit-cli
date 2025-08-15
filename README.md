<div align="center">

# 🔥 Habit-CLI

**A delightful command-line habit tracker with visual terminal experience**

[![npm version](https://img.shields.io/npm/v/habit-cli.svg?style=flat-square)](https://www.npmjs.com/package/habit-cli)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/node/v/habit-cli.svg?style=flat-square)](https://nodejs.org)
[![Build Status](https://img.shields.io/github/workflow/status/holasoymalva/habit-cli/CI?style=flat-square)](https://github.com/holasoymalva/habit-cli/actions)

*Track your habits. Build your streaks. Transform your life.*

[Features](#-features) • [Installation](#-installation) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [Contributing](#-contributing)

<img width="462" height="137" alt="image" src="https://github.com/user-attachments/assets/0c1b8d97-83bb-46f8-9f79-10a635f18408" />

</div>

---

## 🚀 Features

### ✨ **Beautiful Terminal Experience**
- Rich ASCII art branding and visual identity
- Color-coded progress indicators and status
- Elegant boxed layouts with rounded borders
- Real-time progress bars and completion metrics

### 📊 **Advanced Analytics**
- **Streak Tracking**: Current and longest streaks with fire emojis
- **Success Rates**: Percentage-based completion analytics  
- **Statistics Dashboard**: Comprehensive habit performance metrics
- **Progress Visualization**: Daily, weekly, and monthly insights

### 🎯 **Smart Habit Management**
- **Partial Matching**: Type "med" to match "Meditation"
- **Milestone Celebrations**: Special effects for 3, 7, 30, 100+ day streaks
- **Today's Dashboard**: At-a-glance view of daily progress
- **Flexible Commands**: Both quick commands and interactive flows

### 🔒 **Privacy First**
- **100% Local Storage**: Your data never leaves your machine
- **Lightweight JSON**: Fast, portable data format
- **No Tracking**: Zero analytics or data collection
- **Cross-Platform**: Works on macOS, Linux, and Windows

---

## 📦 Installation

### Global Installation (Recommended)
```bash
npm install -g habit-cli
```

### Local Development
```bash
git clone https://github.com/holasoymalva/habit-cli.git
cd habit-cli
npm install
npm link
```

### Requirements
- Node.js 14.0.0 or higher
- npm 6.0.0 or higher

---

## ⚡ Quick Start

### 1. Initialize Your Habit Tracker
```bash
habit-cli init
```

### 2. Add Your First Habits
```bash
habit-cli add "Morning Workout"
habit-cli add "Meditation"
habit-cli add "Read 30 minutes"
```

### 3. Track Daily Progress
```bash
habit-cli check "Morning Workout"
habit-cli today
```

### 4. View Analytics
```bash
habit-cli streaks
habit-cli stats
```

---

## 📖 Documentation

### Core Commands

| Command | Description | Example |
|---------|-------------|---------|
| `init` | Initialize data directory | `habit-cli init` |
| `add <habit>` | Create a new habit | `habit-cli add "Exercise"` |
| `check <habit>` | Mark habit complete | `habit-cli check "Exercise"` |
| `uncheck <habit>` | Unmark habit | `habit-cli uncheck "Exercise"` |
| `list` | Show all habits | `habit-cli list` |
| `today` | Daily dashboard | `habit-cli today` |
| `streaks` | Current streaks | `habit-cli streaks` |
| `stats [habit]` | Statistics view | `habit-cli stats "Exercise"` |

### Advanced Usage

#### Partial Habit Matching
```bash
# These all match "Morning Workout"
habit-cli check "Morning"
habit-cli check "Workout" 
habit-cli check "morn"
```

#### Viewing Specific Statistics
```bash
# All habits overview
habit-cli stats

# Specific habit details
habit-cli stats "Meditation"
```

#### Daily Workflow
```bash
# Morning routine
habit-cli today                    # Check today's progress
habit-cli check "Morning Workout"  # Complete habits
habit-cli check "Meditation"

# Evening review
habit-cli streaks                  # Review active streaks
habit-cli stats                    # Analyze performance
```

---

## 🎨 Visual Examples

### Today's Dashboard
```
⚡ HABIT-CLI

╭─────── 📅 Today's Progress ────────╮
│                                    │
│   Thursday, August 14th, 2025      │
│                                    │
│   Progress: 2/3 habits completed   │
│   █████████████████░░░░░░░░ 67%    │
│                                    │
╰────────────────────────────────────╯

╭─────── ✅ Today's Habits ───────╮
│                                 │
│   ✓ Morning Workout 7d 🔥🔥     │
│   ✓ Meditation 3d 🔥            │
│   ○ Read 30 minutes             │
│                                 │
╰─────────────────────────────────╯
```

### Streak Overview
```
╭────── 🔥 Current Streaks ───────╮
│                                 │
│   ✓ Morning Workout 7d 🔥🔥     │
│   ✓ Meditation 3d 🔥            │
│   ○ Read 30 minutes 0d          │
│                                 │
╰─────────────────────────────────╯

Active Streaks: 2/3  •  Longest Current: 7d  •  Total Streak Days: 10d
```

---

## 🏗️ Architecture

### Data Storage
- **Location**: `~/.habit-cli/data.json`
- **Format**: Lightweight JSON with habits and completion logs
- **Backup**: Manual export/import capabilities
- **Migration**: Built-in data migration system

### Technology Stack
- **Runtime**: Node.js 14+
- **CLI Framework**: Commander.js
- **Styling**: Chalk (colors) + Boxen (layouts)
- **Date Handling**: date-fns
- **Tables**: cli-table3

### Design Principles
- **Performance**: Sub-200ms command execution
- **Reliability**: Graceful error handling and data validation
- **Usability**: Intuitive commands with helpful feedback
- **Extensibility**: Clean architecture for future enhancements

---

## 🛣️ Roadmap

### Phase 1: Core MVP ✅
- [x] Basic habit CRUD operations
- [x] Local JSON storage
- [x] Command-line interface
- [x] Progress tracking

### Phase 2: Visual Identity ✅
- [x] ASCII art branding
- [x] Streak calculations
- [x] Statistics dashboard
- [x] Enhanced terminal UI

### Phase 3: Interactive Experience (Coming Soon)
- [ ] Guided onboarding flow
- [ ] Interactive menu system
- [ ] Input validation and error recovery
- [ ] Contextual help system

### Phase 4: Advanced Analytics (Planned)
- [ ] Calendar view visualization
- [ ] Trend analysis with sparklines
- [ ] Weekly/monthly reports
- [ ] Success rate analytics

### Phase 5: Gamification (Planned)
- [ ] Achievement system
- [ ] Milestone celebrations
- [ ] Motivational messaging
- [ ] Progress animations

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup
```bash
git clone https://github.com/holasoymalva/habit-cli.git
cd habit-cli
npm install
npm run dev
```

### Running Tests
```bash
npm test
npm run test:watch
npm run test:coverage
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Inspired by the productivity and habit-tracking community
- Built with modern Node.js CLI best practices
- Designed for developers who love beautiful terminal experiences

---

<div align="center">

**[⭐ Star this project](https://github.com/holasoymalva/habit-cli)** if you find it useful!

Made with ❤️ by developers, for developers.

</div>
