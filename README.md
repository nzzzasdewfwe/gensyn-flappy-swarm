# Gensyn Flappy Swarm

A Telegram Mini App implementation of Flappy Bird with a sci-fi AI theme, featuring collectible "swarm" power-ups that provide temporary shields.

## Features

- 🎮 Classic Flappy Bird gameplay with pixel art graphics
- 🛡️ Collectible swarm orbs that grant 5-second shields
- 🌌 Sci-fi space theme with parallax scrolling background
- 📱 Fully responsive design for mobile and desktop
- 🔊 8-bit sound effects
- 💾 Local high score tracking
- 📤 Telegram score sharing integration

## Deployment Instructions

### 1. Create a Telegram Bot

1. Open Telegram and search for [@BotFather](https://t.me/BotFather)
2. Send `/newbot` and follow the instructions
3. Choose a name (e.g., "Gensyn Flappy Swarm")
4. Choose a username (e.g., "GensynFlappyBot")
5. Save the bot token provided

### 2. Host the Game

#### Option A: GitHub Pages

1. Create a new GitHub repository
2. Upload all files (`index.html`, `style.css`, `app.js`, `README.md`)
3. Go to Settings → Pages
4. Select "Deploy from a branch" and choose `main` branch
5. Your game will be available at `https://yourusername.github.io/repository-name/`

#### Option B: Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project directory
3. Follow the prompts
4. Your game will be deployed and you'll get a URL

#### Option C: Netlify

1. Drag and drop the project folder to [Netlify Drop](https://app.netlify.com/drop)
2. Your game will be instantly deployed

### 3. Configure the Bot

1. Go back to @BotFather in Telegram
2. Send `/mybots` and select your bot
3. Select "Bot Settings" → "Menu Button"
4. Choose "Configure menu button"
5. Send the URL where your game is hosted
6. Send a button text (e.g., "Play Game")

### 4. Set Up Web App

1. Send `/setmenubutton` to @BotFather
2. Select your bot
3. Paste your game URL
4. The game is now accessible via the menu button in your bot

### 5. Test

1. Open your bot in Telegram
2. Click the menu button (bottom-left)
3. The game should launch in full screen

## Game Controls

- **Tap/Click**: Flap to fly upward
- **Space/Arrow Up**: Alternative flap control (desktop)

## Gameplay

- Navigate through pipes by tapping to flap
- Collect pink swarm orbs for a 5-second shield
- Shield makes you invulnerable to pipes (but not floor/ceiling)
- Score increases by 1 for each pipe passed
- Game ends on collision with pipes, floor, or ceiling

## Technical Details

- Pure HTML5 Canvas + Vanilla JavaScript
- No external dependencies or frameworks
- Telegram Web App API integration
- LocalStorage for high score persistence
- Responsive design (320px+ width)
- 60 FPS target performance

## Browser Compatibility

- Chrome/Edge 90+
- Safari 14+
- Firefox 88+
- Telegram iOS/Android apps

## File Structure

\`\`\`
gensyn-flappy-swarm/
├── index.html      # Main HTML structure
├── style.css       # Minimal styling
├── app.js          # Game logic and rendering
└── README.md       # This file
\`\`\`

## Customization

### Adjust Difficulty

In `app.js`, modify these constants:

\`\`\`javascript
const GRAVITY = 0.25;          // Increase for harder
const FLAP_STRENGTH = -5.5;    // Decrease for harder
const PIPE_GAP = 150;          // Decrease for harder
const PIPE_SPEED = 2;          // Increase for harder
\`\`\`

### Change Colors

Modify the gradient colors in the drawing functions:
- `drawPlayer()` - Player orb colors
- `drawBackground()` - Space and planet colors
- `drawPipe()` - Pipe colors

## License

Free to use and modify for your Telegram Mini App projects.

## Credits

Inspired by the original Flappy Bird by Dong Nguyen.
Created for the Gensyn AI community.
