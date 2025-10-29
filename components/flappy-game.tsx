"use client"

import { useEffect, useRef, useState } from "react"

export default function FlappyGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isClient, setIsClient] = useState(false)
  let frameCount = 0 // Declare frameCount variable

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Telegram integration can be added after deployment to production

    // Set canvas size
    function resizeCanvas() {
      if (!canvas) return
      canvas.width = Math.min(window.innerWidth, 480)
      canvas.height = Math.min(window.innerHeight, 854)
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const playerImage = new Image()
    const assetPrefix =
      (typeof window !== "undefined" && (window as any).__NEXT_DATA__?.assetPrefix) ||
      (process.env.NEXT_PUBLIC_BASE_PATH as string) ||
      ""
    playerImage.src = `${assetPrefix}/player.png`
    let imageLoaded = false
    playerImage.onload = () => {
      imageLoaded = true
    }

    // Background image
    const backgroundImage = new Image()
    backgroundImage.src = `${assetPrefix}/pattern31.png`
    let backgroundLoaded = false
    backgroundImage.onload = () => {
      backgroundLoaded = true
    }

    // Game constants
    const SPEED_MULTIPLIER = 0.7 // 30% slower overall
    const GRAVITY = 0.8 * SPEED_MULTIPLIER
    const FLAP_STRENGTH = -11.5 * SPEED_MULTIPLIER
    const PIPE_SPEED = 4 * SPEED_MULTIPLIER
    const PIPE_GAP = 180
    const PIPE_SPACING = 220
    const PLAYER_SIZE = 35 // Увеличен размер игрока на 10% (с 32 до 35)
    const SWARM_SIZE = 20
    const SHIELD_DURATION = 5000

    // Game state
    let gameState = "menu"
    let score = 0
    let highScore = 0
    let pipesPassed = 0
    let nextQuizAt = 5 // Next quiz at 5 points
    let quizState = {
      isActive: false,
      currentQuestion: 0,
      showResult: false,
      selectedAnswer: -1,
      isCorrect: false,
      questions: [
        {
          question: "What is Gensyn AI?",
          options: [
            "A social network for AI enthusiasts",
            "A decentralized compute network for machine learning",
            "A blockchain-based game",
            "An AI-powered food delivery service"
          ],
          correct: 1
        },
        {
          question: "Who are the founders of Gensyn AI?",
          options: [
            "Elon Musk and Vitalik Buterin",
            "Harry Grieve and Ben Fielding",
            "Mark Zuckerberg and Jeff Bezos",
            "Sam Altman and Greg Brockman"
          ],
          correct: 1
        },
        {
          question: "How much funding has Gensyn AI raised?",
          options: [
            "$10 million",
            "$50 million",
            "$100 million",
            "$200 million"
          ],
          correct: 1
        },
        {
          question: "Who is one of the key investors in Gensyn AI?",
          options: [
            "Apple",
            "a16z crypto",
            "Google",
            "Microsoft"
          ],
          correct: 1
        },
        {
          question: "What is the Gensyn protocol built on?",
          options: [
            "Solana",
            "Ethereum Rollup",
            "Bitcoin",
            "Polkadot"
          ],
          correct: 1
        },
        {
          question: "What does RL Swarm do in Gensyn?",
          options: [
            "Manages social media",
            "Enables collective reinforcement learning",
            "Stores user photos",
            "Plays chess"
          ],
          correct: 1
        },
        {
          question: "What is BlockAssist in Gensyn?",
          options: [
            "An AI assistant for Minecraft",
            "A video editing service",
            "A crypto calculator",
            "A weather chatbot"
          ],
          correct: 0
        },
        {
          question: "What does the Judge system in Gensyn verify?",
          options: [
            "Real-time weather",
            "The accuracy of AI predictions",
            "Internet speed",
            "Stock prices"
          ],
          correct: 1
        },
        {
          question: "How many models have been trained in BlockAssist?",
          options: [
            "100,000",
            "500,000",
            "1 million",
            "10,000"
          ],
          correct: 1
        },
        {
          question: "How many participants are in the latest Judge market?",
          options: [
            "10,000",
            "42,200",
            "100,000",
            "5,000"
          ],
          correct: 1
        },
        {
          question: "What is Verde in Gensyn?",
          options: [
            "A mobile game",
            "A system for verifying ML computations",
            "A music player",
            "A kitchen robot"
          ],
          correct: 1
        },
        {
          question: "What does NoLoCo solve in Gensyn?",
          options: [
            "Gradient synchronization in ML",
            "Logo design",
            "Text translation",
            "Traffic management"
          ],
          correct: 0
        },
        {
          question: "Where can you run an RL Swarm node?",
          options: [
            "Only on a smartphone",
            "Via GitHub",
            "In a browser",
            "On a smartwatch"
          ],
          correct: 1
        },
        {
          question: "What is the Pioneer Program in Gensyn?",
          options: [
            "A gaming tournament",
            "A community program in Discord",
            "A coding course",
            "An art contest"
          ],
          correct: 1
        },
        {
          question: "How many roles are there in the Pioneer Program?",
          options: [
            "1",
            "2",
            "3",
            "4"
          ],
          correct: 2
        },
        {
          question: "What is the Rover Role in Gensyn?",
          options: [
            "For creating memes",
            "For active community members",
            "For programmers",
            "For investors"
          ],
          correct: 1
        },
        {
          question: "Where is Gensyn hosting an event in November 2025?",
          options: [
            "New York",
            "Buenos Aires (Devcon)",
            "Tokyo",
            "London"
          ],
          correct: 1
        },
        {
          question: "How many transactions occurred in Gensyn's testnet in a month?",
          options: [
            "100,000",
            "4 million",
            "10,000",
            "1 million"
          ],
          correct: 1
        },
        {
          question: "How many onchain accounts are in Gensyn's testnet?",
          options: [
            "1,000",
            "40,000",
            "100,000",
            "500"
          ],
          correct: 1
        },
        {
          question: "What is gswarm in Gensyn?",
          options: [
            "The name of Gensyn's mascot (an ant)",
            "A type of cryptocurrency",
            "A feature in a game",
            "A server name"
          ],
          correct: 0
        },
        {
          question: "Why does Gensyn use an ant as a symbol?",
          options: [
            "For fun",
            "To represent collective work, like a swarm",
            "Because of the logo's color",
            "By coincidence"
          ],
          correct: 1
        },
        {
          question: "What was recently updated in Gensyn's docs?",
          options: [
            "Food recipes",
            "Structure: Protocol, Components, Products",
            "A list of jokes",
            "Weather updates"
          ],
          correct: 1
        },
        {
          question: "How many bets were placed in the Fright Night Face-Off?",
          options: [
            "10,000",
            "198,211",
            "50,000",
            "1,000"
          ],
          correct: 1
        },
        {
          question: "What is SkipPipe in Gensyn?",
          options: [
            "A water pipe",
            "A system for fault tolerance in ML",
            "A jumping game",
            "A photo filter"
          ],
          correct: 1
        },
        {
          question: "Who mentioned Gensyn in the State of Crypto 2025?",
          options: [
            "Elon Musk",
            "a16z crypto and Chris Dixon",
            "Vitalik Buterin",
            "OpenAI"
          ],
          correct: 1
        },
        {
          question: "How many models are currently in Gensyn?",
          options: [
            "100,000",
            "650,000",
            "1 million",
            "10,000"
          ],
          correct: 1
        },
        {
          question: "What is CheckFree in Gensyn?",
          options: [
            "A free trial",
            "A trustless verification system",
            "A game for checks",
            "A task checklist"
          ],
          correct: 1
        },
        {
          question: "What is Gensyn's role in Minecraft?",
          options: [
            "Building houses",
            "BlockAssist learns from gameplay",
            "Multiplayer hosting",
            "Saving worlds"
          ],
          correct: 1
        },
        {
          question: "What are Diverse Expert Ensembles in Gensyn?",
          options: [
            "A team of experts",
            "A combination of models for better results",
            "A talent contest",
            "A music band"
          ],
          correct: 1
        },
        {
          question: "Why is Gensyn important for AI?",
          options: [
            "It makes coffee",
            "It democratizes compute resources",
            "It paints pictures",
            "It plays music"
          ],
          correct: 1
        },
        {
          question: "What does SAPO solve in Gensyn?",
          options: [
            "An algorithm for collective learning",
            "Website design",
            "Soup recipes",
            "Weather forecasting"
          ],
          correct: 0
        },
        {
          question: "Where can you join Gensyn's testnet?",
          options: [
            "Telegram",
            "Dashboard.gensyn.ai",
            "Instagram",
            "TikTok"
          ],
          correct: 1
        },
        {
          question: "How many participants are currently in Judge?",
          options: [
            "1,000",
            "40,000+",
            "100",
            "500,000"
          ],
          correct: 1
        },
        {
          question: "What is the Incentive Layer in Gensyn?",
          options: [
            "A gaming layer",
            "A reward system for compute contributions",
            "A UI design",
            "File storage"
          ],
          correct: 1
        },
        {
          question: "Who is @gab_p_andrade in Gensyn?",
          options: [
            "A founder",
            "A team member (handles gswarm)",
            "An investor",
            "A user"
          ],
          correct: 1
        },
        {
          question: "What is Gensyn planning for NeurIPS?",
          options: [
            "A concert",
            "Something special from the team",
            "A picnic",
            "A soccer match"
          ],
          correct: 1
        },
        {
          question: "How many total bets have been placed in Judge?",
          options: [
            "100",
            "Millions in total",
            "10",
            "1,000"
          ],
          correct: 1
        },
        {
          question: "What is Task Orchestration in Gensyn?",
          options: [
            "Distributing tasks across nodes",
            "A music orchestra",
            "Vacation planning",
            "Cooking"
          ],
          correct: 0
        },
        {
          question: "Why is Gensyn open-source?",
          options: [
            "To keep secrets",
            "For auditability and reproducibility",
            "For exclusive clubs",
            "For jokes"
          ],
          correct: 1
        },
        {
          question: "What does Gensyn reduce?",
          options: [
            "Compute costs",
            "Weight",
            "Noise",
            "Light"
          ],
          correct: 0
        },
        {
          question: "How many swarms are in RL Swarm?",
          options: [
            "1",
            "Multiple (2+ models)",
            "10",
            "100"
          ],
          correct: 1
        },
        {
          question: "What does RL stand for in Gensyn?",
          options: [
            "Reinforcement Learning",
            "Rock Music",
            "Real Life",
            "Red Light"
          ],
          correct: 0
        },
        {
          question: "Where is Gensyn's code hosted?",
          options: [
            "GitHub",
            "Facebook",
            "YouTube",
            "Pinterest"
          ],
          correct: 0
        },
        {
          question: "What does Gensyn do with idle hardware?",
          options: [
            "Ignores it",
            "Connects it to a network",
            "Sells it",
            "Deletes it"
          ],
          correct: 1
        },
        {
          question: "How many VCs invested in Gensyn's funding round?",
          options: [
            "1",
            "Several (a16z, Galaxy, etc.)",
            "10",
            "0"
          ],
          correct: 1
        },
        {
          question: "What is verifiable compute in Gensyn?",
          options: [
            "Provable computations",
            "Fast computations",
            "Expensive computations",
            "Hidden computations"
          ],
          correct: 0
        },
        {
          question: "What is the purpose of Judge in predictions?",
          options: [
            "AI-settled prediction market",
            "Weather forecasting",
            "Sports betting",
            "Food reviews"
          ],
          correct: 0
        },
        {
          question: "What was updated in Gensyn's docs on October 23?",
          options: [
            "Nothing",
            "A multi-page structure",
            "Photos",
            "Videos"
          ],
          correct: 1
        },
        {
          question: "How many views did the gswarm post get?",
          options: [
            "100",
            "14,000+",
            "1 million",
            "10"
          ],
          correct: 1
        },
        {
          question: "What is Gensyn's goal?",
          options: [
            "To entertain",
            "To create a global supercluster for ML",
            "To sell gadgets",
            "To cook food"
          ],
          correct: 1
        }
      ]
    }

    // Load high score from localStorage
    if (typeof window !== "undefined") {
      highScore = Number.parseInt(localStorage.getItem("gensynHighScore") || "0")
    }

    // Player
    const player = {
      x: 80,
      y: canvas.height / 2,
      velocityY: 0,
      size: PLAYER_SIZE,
      rotation: 0,
      hasShield: false,
      shieldEndTime: 0,
      pulsePhase: 0,
    }

    // Pipes array
    let pipes: any[] = []

    // Swarm collectible
    let swarm: any = null

    // Background parallax
    let bgOffset = 0
    let starsOffset = 0

    // Audio context for sound effects
    const audioContext =
      typeof window !== "undefined" ? new (window.AudioContext || (window as any).webkitAudioContext)() : null

    function playBeep(frequency: number, duration: number, type: OscillatorType = "sine") {
      if (!audioContext) return
      try {
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()

        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)

        oscillator.frequency.value = frequency
        oscillator.type = type

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration)

        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + duration)
      } catch (e) {
        // Игнорируем ошибки аудио
      }
    }

    function playFlap() {
      playBeep(400, 0.1, "square")
    }

    function playCollision() {
      playBeep(100, 0.3, "sawtooth")
    }

    function playPowerup() {
      playBeep(600, 0.2, "sine")
      setTimeout(() => playBeep(800, 0.2, "sine"), 100)
    }

    // Draw player
    function drawPlayer() {
      ctx.save()
      ctx.translate(player.x, player.y)

      // Shield effect
      if (player.hasShield) {
        ctx.globalAlpha = 0.3 + Math.sin(Date.now() / 100) * 0.2
        ctx.fillStyle = "#ff69b4"
        ctx.beginPath()
        ctx.arc(0, 0, player.size / 2 + 8, 0, Math.PI * 2)
        ctx.fill()
        ctx.globalAlpha = 1
      }

      // Pulsing effect
      const pulse = 1 + Math.sin(player.pulsePhase) * 0.1
      ctx.scale(pulse, pulse)

      // Draw player image if loaded, otherwise draw fallback
      if (imageLoaded) {
        ctx.drawImage(playerImage, -player.size / 2, -player.size / 2, player.size, player.size)
      } else {
        // Fallback: draw orb
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, player.size / 2)
        gradient.addColorStop(0, "#ffb3d9")
        gradient.addColorStop(0.7, "#ff69b4")
        gradient.addColorStop(1, "#ff1493")

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(0, 0, player.size / 2, 0, Math.PI * 2)
        ctx.fill()

        // Highlight
        ctx.fillStyle = "rgba(255, 255, 255, 0.6)"
        ctx.beginPath()
        ctx.arc(-player.size / 6, -player.size / 6, player.size / 6, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.restore()
    }

    // Draw pipes
    function drawPipe(x: number, y: number, width: number, height: number, isTop: boolean) {
      // Pipe body
      const gradient = ctx.createLinearGradient(x, 0, x + width, 0)
      gradient.addColorStop(0, "#2d5a3d")
      gradient.addColorStop(0.5, "#3d7a4d")
      gradient.addColorStop(1, "#2d5a3d")

      ctx.fillStyle = gradient
      ctx.fillRect(x, y, width, height)

      // Pipe border
      ctx.strokeStyle = "#1a3a2a"
      ctx.lineWidth = 2
      ctx.strokeRect(x, y, width, height)

      // Pipe cap
      const capHeight = 30
      const capWidth = width + 10
      const capX = x - 5
      const capY = isTop ? y + height - capHeight : y

      ctx.fillStyle = "#4d9a5d"
      ctx.fillRect(capX, capY, capWidth, capHeight)
      ctx.strokeStyle = "#1a3a2a"
      ctx.strokeRect(capX, capY, capWidth, capHeight)
    }

    // Draw swarm collectible
    function drawSwarm(x: number, y: number) {
      ctx.save()
      ctx.translate(x, y)

      // Pulsing particles
      const particleCount = 8
      const time = Date.now() / 200
      for (let i = 0; i < particleCount; i++) {
        const angle = (i / particleCount) * Math.PI * 2 + time
        const distance = 15 + Math.sin(time * 2 + i) * 5
        const px = Math.cos(angle) * distance
        const py = Math.sin(angle) * distance

        ctx.fillStyle = "rgba(255, 105, 180, 0.6)"
        ctx.beginPath()
        ctx.arc(px, py, 3, 0, Math.PI * 2)
        ctx.fill()
      }

      // Core orb
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, SWARM_SIZE / 2)
      gradient.addColorStop(0, "#ffffff")
      gradient.addColorStop(0.5, "#ff69b4")
      gradient.addColorStop(1, "#ff1493")

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(0, 0, SWARM_SIZE / 2, 0, Math.PI * 2)
      ctx.fill()

      ctx.restore()
    }

    // Draw background
    function drawBackground() {
      if (backgroundLoaded) {
        // Draw background image at 100% of canvas size, centered
        const scale = 1.0
        const drawWidth = canvas.width * scale
        const drawHeight = canvas.height * scale
        const drawX = (canvas.width - drawWidth) / 2
        const drawY = (canvas.height - drawHeight) / 2
        
        // Enable smooth scaling
        ctx.imageSmoothingEnabled = true
        ctx.imageSmoothingQuality = 'medium'
        
        // Draw background image
        ctx.drawImage(backgroundImage, drawX, drawY, drawWidth, drawHeight)
        
        // Fill empty areas with dark gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
        gradient.addColorStop(0, "#0a0a2e")
        gradient.addColorStop(0.5, "#16213e")
        gradient.addColorStop(1, "#0f3460")
        
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        
        // Draw background image on top
        ctx.drawImage(backgroundImage, drawX, drawY, drawWidth, drawHeight)
      } else {
        // Fallback gradient while image loads
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
        gradient.addColorStop(0, "#0a0a2e")
        gradient.addColorStop(0.5, "#16213e")
        gradient.addColorStop(1, "#0f3460")
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }

      // Gensyn branding - improved text rendering
      ctx.save()
      ctx.fillStyle = "rgba(250, 215, 209, 0.2)"
      ctx.font = 'bold 18px "Segoe UI", Arial, sans-serif'
      ctx.textBaseline = "middle"
      ctx.translate(canvas.width - 30, 20)
      ctx.rotate(Math.PI / 2)
      const brandText = "GENSYN GENSYN GENSYN"
      ctx.fillText(brandText, 0, 0)
      ctx.restore()
    }

    // Draw UI
    function drawUI() {
      if (gameState === "menu") {
        // Title - improved text rendering
        ctx.fillStyle = "#fad7d1"
        ctx.font = 'bold 32px "Segoe UI", Arial, sans-serif'
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText("GENSYN", canvas.width / 2, canvas.height / 3)

        ctx.fillStyle = "#ffffff"
        ctx.font = 'bold 24px "Segoe UI", Arial, sans-serif'
        ctx.fillText("FLAPPY SWARM", canvas.width / 2, canvas.height / 3 + 40)

        // Instructions
        ctx.font = '14px "Segoe UI", Arial, sans-serif'
        ctx.fillStyle = "#fad7d1"
        ctx.fillText("TAP TO PLAY", canvas.width / 2, canvas.height / 2 + 50)

        ctx.font = '11px "Segoe UI", Arial, sans-serif'
        ctx.fillText("Collect swarm orbs for shield!", canvas.width / 2, canvas.height / 2 + 80)

        // High score
        ctx.fillStyle = "#ffffff"
        ctx.fillText(`HIGH SCORE: ${highScore}`, canvas.width / 2, canvas.height - 100)
      } else if (gameState === "playing") {
        // Score - improved text rendering
        ctx.fillStyle = "#ffffff"
        ctx.font = 'bold 28px "Segoe UI", Arial, sans-serif'
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(score.toString(), canvas.width / 2, 50)

        // Quiz indicator - improved text rendering
        const pointsToNextQuiz = nextQuizAt - score
        if (pointsToNextQuiz > 0) {
          ctx.fillStyle = "#fad7d1"
          ctx.font = 'bold 14px "Segoe UI", Arial, sans-serif'
          ctx.textBaseline = "middle"
          ctx.fillText(`Quiz in: ${pointsToNextQuiz} points`, canvas.width / 2, 80)
        } else {
          ctx.fillStyle = "#00ff00"
          ctx.font = 'bold 14px "Segoe UI", Arial, sans-serif'
          ctx.textBaseline = "middle"
          ctx.fillText("QUIZ SOON!", canvas.width / 2, 80)
        }

        // Shield indicator - improved text rendering
        if (player.hasShield) {
          const timeLeft = Math.ceil((player.shieldEndTime - Date.now()) / 1000)
          ctx.fillStyle = "#fad7d1"
          ctx.font = 'bold 14px "Segoe UI", Arial, sans-serif'
          ctx.textBaseline = "middle"
          ctx.fillText(`SHIELD: ${timeLeft}s`, canvas.width / 2, 110)
        }
      } else if (gameState === "gameover") {
        // Game Over - improved text rendering
        ctx.fillStyle = "#fad7d1"
        ctx.font = 'bold 42px "Segoe UI", Arial, sans-serif'
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 3)

        // Scores
        ctx.fillStyle = "#ffffff"
        ctx.font = 'bold 20px "Segoe UI", Arial, sans-serif'
        ctx.fillText(`SCORE: ${score}`, canvas.width / 2, canvas.height / 2)
        ctx.fillText(`HIGH SCORE: ${highScore}`, canvas.width / 2, canvas.height / 2 + 40)

        // Instructions
        ctx.font = '14px "Segoe UI", Arial, sans-serif'
        ctx.fillStyle = "#fad7d1"
        ctx.fillText("TAP TO RESTART", canvas.width / 2, canvas.height / 2 + 100)
      } else if (gameState === "quiz") {
        // Quiz UI
        const question = quizState.questions[quizState.currentQuestion]
        
        // Background overlay
        ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        
        // Quiz title with shadow - improved text rendering
        ctx.textBaseline = "middle"
        ctx.font = 'bold 26px "Segoe UI", Arial, sans-serif'
        ctx.textAlign = "center"
        
        // Shadow
        ctx.fillStyle = "rgba(0, 0, 0, 0.5)"
        ctx.fillText("QUIZ!", canvas.width / 2 + 2, 82)
        
        // Main text
        ctx.fillStyle = "#fad7d1"
        ctx.fillText("QUIZ!", canvas.width / 2, 80)
        
        // Quiz info
        ctx.fillStyle = "#fad7d1"
        ctx.font = '14px Arial, sans-serif'
        ctx.fillText(`Score: ${score} | Next quiz: ${nextQuizAt}`, canvas.width / 2, 110)
        
        // Question with word wrapping - improved text rendering
        ctx.fillStyle = "#ffffff"
        ctx.font = 'bold 18px "Segoe UI", Arial, sans-serif'
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        
        // Optimized word wrapping function with caching
        const textCache = new Map<string, number>()
        const MAX_CACHE_SIZE = 100 // Limit cache size to prevent memory leaks
        
        function wrapText(text: string, maxWidth: number, x: number, y: number, lineHeight: number) {
          const words = text.split(' ')
          let line = ''
          let currentY = y
          
          for (let n = 0; n < words.length; n++) {
            const testLine = line + words[n] + ' '
            
            // Cache text measurements for performance
            let testWidth: number
            if (textCache.has(testLine)) {
              testWidth = textCache.get(testLine)!
            } else {
            const metrics = ctx.measureText(testLine)
              testWidth = metrics.width
              
              // Limit cache size
              if (textCache.size >= MAX_CACHE_SIZE) {
                const firstKey = textCache.keys().next().value
                textCache.delete(firstKey)
              }
              textCache.set(testLine, testWidth)
            }
            
            if (testWidth > maxWidth && n > 0) {
              ctx.fillText(line, x, currentY)
              line = words[n] + ' '
              currentY += lineHeight
            } else {
              line = testLine
            }
          }
          ctx.fillText(line, x, currentY)
          return currentY
        }
        
        const questionY = wrapText(question.question, canvas.width - 100, canvas.width / 2, 140, 25)
        
        // Options - position them below the question text - improved text rendering
        ctx.font = '16px "Segoe UI", Arial, sans-serif'
        ctx.textBaseline = "middle"
        const optionY = Math.max(questionY + 40, 200) // Start below question or at minimum 200px
        const optionSpacing = 60 // Increased spacing for multi-line text
        
        // Pre-calculate colors to avoid repeated calculations
        const colors = {
          correct: { bg1: "rgba(0, 255, 0, 0.4)", bg2: "rgba(0, 255, 0, 0.2)", border: "#00ff00" },
          incorrect: { bg1: "rgba(255, 0, 0, 0.4)", bg2: "rgba(255, 0, 0, 0.2)", border: "#ff0000" },
          correctHighlight: { bg1: "rgba(0, 255, 0, 0.3)", bg2: "rgba(0, 255, 0, 0.1)", border: "#00ff00" },
          normal: { bg1: "rgba(250, 215, 209, 0.3)", bg2: "rgba(250, 215, 209, 0.1)", border: "#fad7d1" },
          other: { bg1: "rgba(250, 215, 209, 0.2)", bg2: "rgba(250, 215, 209, 0.1)", border: "#fad7d1" }
        }
        
        question.options.forEach((option, index) => {
          const y = optionY + index * optionSpacing
          const buttonHeight = 50
          
          // Determine button colors based on result
          let colorSet
          if (quizState.showResult) {
            if (index === quizState.selectedAnswer) {
              colorSet = quizState.isCorrect ? colors.correct : colors.incorrect
            } else if (index === question.correct) {
              colorSet = colors.correctHighlight
              } else {
              colorSet = colors.other
              }
            } else {
            colorSet = colors.normal
          }
          
          // Option background with gradient
          const gradient = ctx.createLinearGradient(50, y - 20, 50, y + buttonHeight - 20)
          gradient.addColorStop(0, colorSet.bg1)
          gradient.addColorStop(1, colorSet.bg2)
          ctx.fillStyle = gradient
          ctx.fillRect(50, y - 20, canvas.width - 100, buttonHeight)
          
          // Option border
          ctx.strokeStyle = colorSet.border
          ctx.lineWidth = 2
          ctx.strokeRect(50, y - 20, canvas.width - 100, buttonHeight)
          
          // Option text with word wrapping
          ctx.fillStyle = "#ffffff"
          ctx.textAlign = "left"
          ctx.textBaseline = "middle"
          const optionText = `${index + 1}. ${option}`
          wrapText(optionText, canvas.width - 140, 70, y + 5, 20)
        })
        
        // Show result message - improved text rendering
        if (quizState.showResult) {
          ctx.fillStyle = quizState.isCorrect ? "#00ff00" : "#ff0000"
          ctx.font = 'bold 22px "Segoe UI", Arial, sans-serif'
          ctx.textAlign = "center"
          ctx.textBaseline = "middle"
          const resultText = quizState.isCorrect ? "CORRECT! ✅" : "WRONG! ❌"
          ctx.fillText(resultText, canvas.width / 2, canvas.height - 100)
          
          // Show correct answer if wrong
          if (!quizState.isCorrect) {
            ctx.fillStyle = "#ffffff"
            ctx.font = '16px "Segoe UI", Arial, sans-serif'
            const correctAnswer = question.options[question.correct]
            ctx.fillText(`Correct answer: ${question.correct + 1}. ${correctAnswer}`, canvas.width / 2, canvas.height - 70)
          }
        } else {
          // Instructions (only show when not showing result) - improved text rendering
          ctx.fillStyle = "#fad7d1"
          ctx.font = '14px "Segoe UI", Arial, sans-serif'
          ctx.textAlign = "center"
          ctx.textBaseline = "middle"
          ctx.fillText("CLICK ON ANSWER NUMBER", canvas.width / 2, canvas.height - 50)
        }
      }

      ctx.textAlign = "left"
    }

    // Initialize pipes
    function initPipes() {
      pipes = []
      for (let i = 0; i < 3; i++) {
        pipes.push(createPipe(canvas.width + i * PIPE_SPACING))
      }
    }

    // Create pipe
    function createPipe(x: number) {
      const minGapY = 100
      const maxGapY = canvas.height - 160
      const gapY = minGapY + Math.random() * (maxGapY - minGapY)

      return {
        x: x,
        gapY: gapY,
        width: 60,
        passed: false,
      }
    }

    // Check collision
    function checkCollision(rect1: any, rect2: any) {
      return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
      )
    }

    // Check soft collision - allows slight touching without game over
    function checkSoftCollision(rect1: any, rect2: any, tolerance: number = 8) {
      return (
        rect1.x < rect2.x + rect2.width - tolerance &&
        rect1.x + rect1.width > rect2.x + tolerance &&
        rect1.y < rect2.y + rect2.height - tolerance &&
        rect1.y + rect1.height > rect2.y + tolerance
      )
    }

    // Update game
    function update() {
      if (gameState !== "playing" || quizState.isActive) return

      frameCount++
      player.pulsePhase += 0.1

      // Update player physics
      player.velocityY += GRAVITY
      player.y += player.velocityY

      // Check shield expiration
      if (player.hasShield && Date.now() > player.shieldEndTime) {
        player.hasShield = false
      }

      // Update background
      bgOffset += PIPE_SPEED
      starsOffset += PIPE_SPEED * 0.3

      // Update pipes
      for (let i = pipes.length - 1; i >= 0; i--) {
        const pipe = pipes[i]
        pipe.x -= PIPE_SPEED

        // Check if passed
        if (!pipe.passed && pipe.x + pipe.width < player.x) {
          pipe.passed = true
          score++
          pipesPassed++

          // Check for quiz trigger every 5 points
          if (score === nextQuizAt && !quizState.isActive) {
            startQuiz()
            nextQuizAt += 5 // Set next quiz for 5 points later
            return
          }

          // Check for swarm spawn
          if (pipesPassed % 5 === 0 && Math.random() > 0.3 && !swarm) {
            const nextPipe = pipes.find((p) => p.x > canvas.width / 2)
            if (nextPipe) {
              swarm = {
                x: nextPipe.x + nextPipe.width / 2,
                y: nextPipe.gapY + PIPE_GAP / 2,
                size: SWARM_SIZE,
              }
            }
          }
        }

        // Remove off-screen pipes
        if (pipe.x + pipe.width < 0) {
          pipes.splice(i, 1)
          pipes.push(createPipe(pipes[pipes.length - 1].x + PIPE_SPACING))
        }

        // Check collision with pipes (if no shield) - using soft collision
        if (!player.hasShield) {
          const playerRect = {
            x: player.x - player.size / 2,
            y: player.y - player.size / 2,
            width: player.size,
            height: player.size,
          }

          const topPipeRect = {
            x: pipe.x,
            y: 0,
            width: pipe.width,
            height: pipe.gapY,
          }

          const bottomPipeRect = {
            x: pipe.x,
            y: pipe.gapY + PIPE_GAP,
            width: pipe.width,
            height: canvas.height - (pipe.gapY + PIPE_GAP),
          }

          // Use soft collision - allows 8px tolerance for slight touching
          if (checkSoftCollision(playerRect, topPipeRect, 8) || checkSoftCollision(playerRect, bottomPipeRect, 8)) {
            gameOver()
          }
        }
      }

      // Update swarm
      if (swarm) {
        swarm.x -= PIPE_SPEED

        // Check collection
        const dist = Math.hypot(player.x - swarm.x, player.y - swarm.y)
        if (dist < player.size / 2 + swarm.size / 2) {
          player.hasShield = true
          player.shieldEndTime = Date.now() + SHIELD_DURATION
          swarm = null
          playPowerup()
        }

        // Remove if off-screen
        if (swarm && swarm.x < -swarm.size) {
          swarm = null
        }
      }

      // Check floor/ceiling collision
      if (player.y - player.size / 2 < 0 || player.y + player.size / 2 > canvas.height - 60) {
        gameOver()
      }
    }

    // Draw game
    function draw() {
      drawBackground()

      // Draw pipes
      pipes.forEach((pipe) => {
        drawPipe(pipe.x, 0, pipe.width, pipe.gapY, true)
        drawPipe(pipe.x, pipe.gapY + PIPE_GAP, pipe.width, canvas.height - (pipe.gapY + PIPE_GAP), false)
      })

      // Draw swarm
      if (swarm) {
        drawSwarm(swarm.x, swarm.y)
      }

      // Draw player
      drawPlayer()

      // Draw UI
      drawUI()
    }

    // Game loop
    let animationFrameId: number
    function gameLoop() {
      update()
      draw()
      animationFrameId = requestAnimationFrame(gameLoop)
    }

    // Start game
    function startGame() {
      gameState = "playing"
      score = 0
      pipesPassed = 0
      nextQuizAt = 5 // Reset quiz counter
      player.y = canvas.height / 2
      player.velocityY = 0
      player.hasShield = false
      swarm = null
      quizState.isActive = false
      initPipes()
    }

    // Game over
    function gameOver() {
      gameState = "gameover"
      playCollision()

      // Update high score
      if (score > highScore) {
        highScore = score
        if (typeof window !== "undefined") {
          localStorage.setItem("gensynHighScore", highScore.toString())
        }
      }
    }

    // Quiz functions
    function startQuiz() {
      gameState = "quiz"
      quizState.isActive = true
      quizState.showResult = false
      quizState.selectedAnswer = -1
      quizState.isCorrect = false
      quizState.currentQuestion = Math.floor(Math.random() * quizState.questions.length)
    }

    function checkQuizAnswer(selectedOption: number) {
      const question = quizState.questions[quizState.currentQuestion]
      quizState.selectedAnswer = selectedOption
      quizState.isCorrect = selectedOption === question.correct
      quizState.showResult = true
      
      // After 1 second, proceed based on result
      setTimeout(() => {
        if (quizState.isCorrect) {
          // Correct answer - continue game
          quizState.isActive = false
          quizState.showResult = false
          gameState = "playing"
          playPowerup()
        } else {
          // Wrong answer - restart game
          quizState.isActive = false
          quizState.showResult = false
          gameOver()
        }
      }, 1000)
    }

    // Flap
    function flap() {
      if (gameState === "menu") {
        startGame()
      } else if (gameState === "playing") {
        player.velocityY = FLAP_STRENGTH
        playFlap()
      } else if (gameState === "gameover") {
        startGame()
      }
    }

    // Input handlers
    const handleClick = (e: MouseEvent) => {
      if (gameState === "quiz" && !quizState.showResult) {
        const rect = canvas.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        
        // Check if click is on quiz options
        const optionY = 200
        const optionSpacing = 50
        const optionHeight = 35
        
        for (let i = 0; i < 4; i++) {
          const optionTop = optionY + i * optionSpacing - 20
          const optionBottom = optionTop + optionHeight
          
          if (y >= optionTop && y <= optionBottom && x >= 50 && x <= canvas.width - 50) {
            checkQuizAnswer(i)
            return
          }
        }
      } else if (gameState !== "quiz") {
        flap()
      }
    }
    
    const handleTouch = (e: TouchEvent) => {
      e.preventDefault()
      if (gameState === "quiz" && !quizState.showResult) {
        const rect = canvas.getBoundingClientRect()
        const touch = e.touches[0]
        const x = touch.clientX - rect.left
        const y = touch.clientY - rect.top
        
        // Check if touch is on quiz options
        const optionY = 200
        const optionSpacing = 50
        const optionHeight = 35
        
        for (let i = 0; i < 4; i++) {
          const optionTop = optionY + i * optionSpacing - 20
          const optionBottom = optionTop + optionHeight
          
          if (y >= optionTop && y <= optionBottom && x >= 50 && x <= canvas.width - 50) {
            checkQuizAnswer(i)
            return
          }
        }
      } else if (gameState !== "quiz") {
        flap()
      }
    }
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState === "quiz" && !quizState.showResult) {
        // Handle quiz keyboard input
        if (e.key >= "1" && e.key <= "4") {
          const selectedOption = parseInt(e.key) - 1
          checkQuizAnswer(selectedOption)
        }
      } else if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault()
        flap()
      }
    }

    canvas.addEventListener("click", handleClick)
    canvas.addEventListener("touchstart", handleTouch)
    document.addEventListener("keydown", handleKeyDown)

    // Start game loop
    initPipes()
    gameLoop()

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      canvas.removeEventListener("click", handleClick)
      canvas.removeEventListener("touchstart", handleTouch)
      document.removeEventListener("keydown", handleKeyDown)
      cancelAnimationFrame(animationFrameId)
    }
  }, [isClient])

  return (
    <div className="fixed inset-0 overflow-hidden bg-black">
      <canvas
        ref={canvasRef}
        className="block h-screen w-screen"
        style={{
          imageRendering: "pixelated",
          touchAction: "none",
        }}
      />
    </div>
  )
}
