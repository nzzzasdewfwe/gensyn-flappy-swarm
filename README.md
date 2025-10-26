# 🎮 Gensyn Flappy Swarm

A Flappy Bird-style game featuring Gensyn AI quiz questions! Navigate through pipes, collect swarm orbs for shields, and answer questions about Gensyn AI to continue playing.

## 🚀 Play the Game

[**Play Now**](https://your-username.github.io/gensyn-flappy-swarm) - Deployed on GitHub Pages

## 🎯 Game Features

- **Classic Flappy Bird gameplay** with modern graphics
- **50 Gensyn AI quiz questions** covering the project comprehensively
- **Shield power-ups** - collect swarm orbs to get temporary invincibility
- **Soft collision system** - slight touches won't end the game
- **Responsive design** - works on desktop and mobile
- **High score tracking** - compete with yourself!

## 🧠 Quiz Content

The game includes 50 questions about:
- Gensyn AI company basics (founders, funding, investors)
- Technical components (RL Swarm, BlockAssist, Judge, Verde, etc.)
- Community programs (Pioneer Program, roles)
- Statistics and metrics
- Technical concepts (verifiable compute, task orchestration, etc.)

## 🎮 How to Play

1. **Tap/Click** to make the bird flap
2. **Navigate** through the green pipes
3. **Collect** pink swarm orbs for shields
4. **Answer** quiz questions every 5 points
5. **Correct answers** let you continue
6. **Wrong answers** end the game

## 🛠️ Technical Details

- Built with **Next.js 15** and **TypeScript**
- **Canvas-based** game engine
- **Optimized performance** with text caching
- **Mobile-friendly** touch controls
- **Audio effects** for better gameplay experience

## 🚀 Local Development

```bash
# Clone the repository
git clone https://github.com/your-username/gensyn-flappy-swarm.git
cd gensyn-flappy-swarm

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

## 📦 Deployment

The game is automatically deployed to GitHub Pages. To deploy manually:

```bash
# Build the project
npm run build

# Export static files
npm run export

# Deploy to your hosting service
```

## 🎨 Game Customization

You can easily customize the game by modifying:

- **Game constants** in `components/flappy-game.tsx`:
  - `GRAVITY` - how fast the bird falls
  - `FLAP_STRENGTH` - how high the bird jumps
  - `PIPE_SPEED` - how fast pipes move
  - `PIPE_GAP` - space between pipes
  - `SHIELD_DURATION` - how long shields last

- **Quiz questions** - add more questions to the `questions` array
- **Visual styling** - modify colors, fonts, and effects
- **Audio** - customize sound effects

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Add more quiz questions
- Improve game mechanics
- Enhance visual effects
- Fix bugs
- Add new features

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🔗 Links

- [Gensyn AI Official Website](https://gensyn.ai)
- [Gensyn Documentation](https://docs.gensyn.ai)
- [GitHub Repository](https://github.com/your-username/gensyn-flappy-swarm)

---

Made with ❤️ for the Gensyn AI community