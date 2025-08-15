# Contributing to Habit-CLI

We love your input! We want to make contributing to Habit-CLI as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## Development Process

We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

### Pull Requests

1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes.
5. Make sure your code lints.
6. Issue that pull request!

### Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/habit-cli.git
cd habit-cli

# Install dependencies
npm install

# Link for local development
npm link

# Run tests
npm test

# Run linting
npm run lint
```

### Code Style

- Use 2 spaces for indentation
- Use semicolons
- Use single quotes for strings
- Follow existing code patterns
- Add JSDoc comments for functions
- Keep functions small and focused

### Commit Messages

We follow the [Conventional Commits](https://conventionalcommits.org/) specification:

- `feat:` new features
- `fix:` bug fixes
- `docs:` documentation changes
- `style:` formatting changes
- `refactor:` code refactoring
- `test:` adding tests
- `chore:` maintenance tasks

Examples:
```
feat: add calendar view for habit tracking
fix: resolve streak calculation bug
docs: update installation instructions
```

## Bug Reports

We use GitHub issues to track public bugs. Report a bug by [opening a new issue](https://github.com/holasoymalva/habit-cli/issues/new).

**Great Bug Reports** tend to have:

- A quick summary and/or background
- Steps to reproduce
  - Be specific!
  - Give sample code if you can
- What you expected would happen
- What actually happens
- Notes (possibly including why you think this might be happening, or stuff you tried that didn't work)

## Feature Requests

We welcome feature requests! Please:

1. Check if the feature has already been requested
2. Provide a clear description of the problem you're trying to solve
3. Describe the solution you'd like
4. Consider alternative solutions
5. Provide additional context

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Questions?

Feel free to open an issue with the `question` label or reach out to the maintainers.

## Recognition

Contributors will be recognized in our README and release notes. Thank you for making Habit-CLI better! 🎉