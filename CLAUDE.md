# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with this repository.

## Project Overview

This is a web-based clock application project with multiple features including:
- Analog clock with visual clock hands
- Stopwatch functionality
- Timer functionality
- Weather display
- Digital clock with configurable settings
- Sound/visual effects

## Common Development Tasks

### Local Development
- `npm install` - Install project dependencies
- `npm start` - Start the development server
- `npm test` - Run the test suite
- `npm run build` - Create a production build

## Project Structure

```
project/
├── index.html          # Main HTML file with UI components
├── js/                 # JavaScript files
│   ├── clock.js        # Main clock application logic
│   ├── timer.js        # Timer functionality
│   ├── stopwatch.js     # Stopwatch functionality
│   ├── weather.js      # Weather functionality
│   └── settings.js    # Settings management
├── css/               # Styles for UI components
├── package.json       # Project configuration
└── assets/            # Static assets like images, sounds
```

## Architecture

The application follows a modular design pattern with:
- A main clock module for the visual clock with hands
- Separate modules for timer and stopwatch functionality
- A dedicated weather module for current conditions
- Settings module for user preferences
- Sound module for audio feedback

## Common Patterns

The project follows these patterns:
- Modular design with separate files for each feature
- Event-driven architecture for real-time updates
- Asynchronous operations for weather data fetching
- Local storage for settings persistence

## Development Notes

This is a learning project designed to create a comprehensive clock application. The code should be organized in modules:
1. Core clock rendering
2. Timer functionality
3. Stopwatch functionality
4. Weather display
5. Settings panel for user preferences
6. Sound effects control

## Debugging

To debug this project:
1. Open the browser's developer tools
2. Check the console for any error messages
3. Use console.log statements to trace execution
4. Test in a modern browser with developer tools

## Testing

Tests can be run with:
```
npm test
```

Or for a specific test:
```
npm test -- --testNamePattern="clock"
```

## File Structure

The project contains:
1. index.html - Main page with all components
2. CSS files for styling
3. JavaScript files for each module
4. package.json - Project configuration
5. Assets for sounds and images

## Development Workflow

The main tasks for building the application:
1. Create visual clock with hands
2. Implement timer functionality
3. Add stopwatch features
4. Integrate weather display
5. Add settings for user preferences
6. Implement sound features

## Tips for Development

1. Use modern JavaScript (ES6+) for new features
2. Follow modular pattern for each component
3. Use proper error handling
4. Keep code organized in separate modules
5. Test in modern browsers
6. Use the Web Audio API for sound features
7. Use CSS3 for animations and visual effects