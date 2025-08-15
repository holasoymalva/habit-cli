# Assets

This directory contains visual assets for the Habit-CLI project.

## Files

- `demo.gif` - Animated demonstration of the CLI in action
- `screenshots/` - Static screenshots of various commands
- `logo/` - Logo files and branding assets

## Creating Demo GIF

To create the demo.gif, you can use tools like:

- [asciinema](https://asciinema.org/) - Record terminal sessions
- [terminalizer](https://github.com/faressoft/terminalizer) - Record and share terminal sessions
- [ttygif](https://github.com/icholy/ttygif) - Convert terminal recordings to GIF

Example workflow:
```bash
# Record a session
asciinema rec demo.cast

# Convert to GIF (using agg or other tools)
agg demo.cast demo.gif
```

## Screenshots

Screenshots should show:
- Initial setup (`habit-cli init`)
- Adding habits (`habit-cli add`)
- Daily dashboard (`habit-cli today`)
- Streak overview (`habit-cli streaks`)
- Statistics view (`habit-cli stats`)