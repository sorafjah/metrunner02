<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8" />
  <title>ララランナー</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
  
  <!-- PWA基本設定 -->
  <meta name="theme-color" content="#87ceeb"/>
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <meta name="apple-mobile-web-app-title" content="ララランナー">

  <!-- iPhone / iPad アイコン（同じフォルダに metrunner01-180.png を置く） -->
  <link rel="apple-touch-icon" href="metrunner01-180.png">
  <!-- PWA manifest -->
  <link rel="manifest" href="manifest.json">
  
  <style>
    html, body {
      margin: 0;
      padding: 0;
      height: 100%;
      overflow: hidden;
      background: #87ceeb; /* 空の色 */
    }
    body {
      display: flex;
      justify-content: center;
      align-items: center;
      touch-action: none;
      -webkit-user-select: none;
      user-select: none;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }
    canvas {
      display: block;
      touch-action: none;
    }
  </style>
</head>
<body>
  <canvas id="gameCanvas"></canvas>

  <script>
    // ==========================
    // 基本設定・グローバル変数
    // ==========================
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    let player;
    let playerBaseX = 0;

    let walls = [];
    let platforms = [];
    let items = [];
    let birds = []; // 🦇, 💣, 🌶️, 🌀
    let bees = [];
    let ghosts = [];
    let turtles = [];
    let mushrooms = [];
    let holes = [];
    let floatTexts = [];

    let score = 0;
    let highScore = 0; // ハイスコア
    let gameOver = false;
    let isTouching = false;
    let prevIsTouching = false;

    let lastTime = 0;

    const BASE_SCROLL_SPEED = 240;
    const GRAVITY = 900;
    const GROUND_RATIO = 0.8;
    const TOP_LIMIT = 20;

    let spawnTimer = 0;
    let nextSpawnTime = 1.0;

    // --- モード管理 ---
    let isChickMode = false;
    let chickTimer = 0;
    const CHICK_MODE_DURATION = 4.0;

    let isBikeMode = false;
    let bikeTimer = 0;
    const BIKE_MODE_DURATION = CHICK_MODE_DURATION * 3;

    // ⭐無敵モード
    let isStarMode = false;
    let starTimer = 0;
    const STAR_MODE_DURATION = 10.0;

    // --- ライフ管理 ---
    let lives = 3;
    let invincibleTimer = 0;
    const INVINCIBLE_TIME = 0.8;

    // --- ジャンプ管理 ---
    let jumpUsesLeft = 2;
    let isCurrentlyThrusting = false;

    // --- スワイプ判定 ---
    let touchStartY = null;

    // --- ロスト表示＆一時停止 ---
    let lostMessageTimer = 0;
    let isRespawnPause = false;
    let respawnPauseTimer = 0;

    // ★ リスポーンの「2秒待ち」
    let pendingRespawn = false;
    let respawnDelayTimer = 0;
    let respawnSafeX = null;

    // --- 直前にやられた位置 ---
    let lastDeathAvoidCenterX = null;

    // 唐辛子 震え処理
    let isShaking = false;
    let shakeTimer = 0;
    const SHAKE_DURATION = 2.0; // しびれ2秒
    let shakeOffsetX = 0;

    // ゲームオーバー表示タイマー
    let gameOverDisplayTimer = 0;
    const GAME_OVER_DISPLAY_DURATION = 3.0;

    // スタート時説明
    let showInstructions = false;
    let instructionTimer = 0;
    const INSTRUCTION_DURATION = 2.0;
    // ★「走り方」を削除
    const instructionText = "画面を押すとジャンプ\n1回だけ２段ジャンプできる\n長押しでロングジャンプ\n下になぞると即落ち";

    // ==========================
    // ハイスコアのロード（ローカル保存）
    // ==========================
    try {
      const saved = localStorage.getItem("lalarunner_highscore");
      if (saved !== null) {
        highScore = parseFloat(saved) || 0;
      }
    } catch (e) {
      highScore = 0;
    }

    // ==========================
    // サウンド
    // ==========================
    let audioCtx = null;
    let audioUnlocked = false; // iPhone対策

    function initAudio() {
      if (!audioCtx) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (AC) {
          audioCtx = new AC();
        }
      }
    }

    function resumeAudio() {
      if (audioCtx && audioCtx.state === "suspended") {
        audioCtx.resume();
      }
    }

    function unlockAudio() {
      if (!audioCtx || audioUnlocked) return;
      try {
        const buffer = audioCtx.createBuffer(1, 1, 22050);
        const source = audioCtx.createBufferSource();
        source.buffer = buffer;
        source.connect(audioCtx.destination);
        source.start(0);
        audioUnlocked = true;
      } catch (e) {}
    }

    function playBeep(f, duration, type = "sine", volume = 0.3) {
      if (!audioCtx) return;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.value = f;
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      const now = audioCtx.currentTime;
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(volume, now + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      osc.start(now);
      osc.stop(now + duration + 0.05);
    }

    function playScoreItemSound() {
      playBeep(880, 0.10, "sine", 0.25);
      setTimeout(() => playBeep(1320, 0.10, "sine", 0.2), 90);
    }
    function playChickSound() {
      playBeep(660, 0.12, "triangle", 0.3);
      setTimeout(() => playBeep(990, 0.12, "triangle", 0.25), 120);
    }
    function playBikeSound() {
      playBeep(440, 0.10, "square", 0.3);
      setTimeout(() => playBeep(660, 0.10, "square", 0.25), 110);
      setTimeout(() => playBeep(880, 0.10, "square", 0.2), 220);
    }
    function playBikeBonusSound() {
      playBeep(1200, 0.08, "sawtooth", 0.3);
      setTimeout(() => playBeep(1600, 0.12, "sawtooth", 0.25), 80);
    }
    function playHitSound() {
      playBeep(220, 0.25, "square", 0.35);
      setTimeout(() => playBeep(180, 0.25, "square", 0.3), 180);
    }
    function playStarItemSound() {
      playBeep(1000, 0.08, "sawtooth", 0.3);
      setTimeout(() => playBeep(1300, 0.08, "sawtooth", 0.25), 80);
      setTimeout(() => playBeep(1600, 0.10, "sawtooth", 0.2), 160);
    }
    function playStarHitSound() {
      playBeep(1500, 0.06, "square", 0.3);
      setTimeout(() => playBeep(1800, 0.08, "square", 0.25), 60);
    }

    // ==========================
    // 画面サイズ・地面
    // ==========================
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      playerBaseX = canvas.width * 0.15;
    }

    function getGroundY() {
      return canvas.height * GROUND_RATIO;
    }

    // ==========================
    // 初期化・リスタート
    // ==========================
    function resetGame() {
      const groundY = getGroundY();
      playerBaseX = canvas.width * 0.15;

      player = {
        x: playerBaseX,
        y: groundY - 40,
        width: 40,
        height: 40,
        vy: 0,
        emoji: "🏃‍♂️",
        angle: 0,
        onGround: true
      };

      walls = [];
      platforms = [];
      items = [];
      birds = [];
      bees = [];
      ghosts = [];
      turtles = [];
      mushrooms = [];
      holes = [];
      floatTexts = [];

      score = 0;
      gameOver = false;
      spawnTimer = 0;
      nextSpawnTime = randomRange(0.8, 1.6);

      isChickMode = false;
      chickTimer = 0;
      isBikeMode = false;
      bikeTimer = 0;
      isStarMode = false;
      starTimer = 0;

      lives = 3;
      invincibleTimer = 0;

      jumpUsesLeft = 2;
      isCurrentlyThrusting = false;
      prevIsTouching = false;

      lostMessageTimer = 0;
      isRespawnPause = false;
      respawnPauseTimer = 0;

      pendingRespawn = false;
      respawnDelayTimer = 0;
      respawnSafeX = null;

      lastDeathAvoidCenterX = null;

      isShaking = false;
      shakeTimer = 0;
      shakeOffsetX = 0;
      
      gameOverDisplayTimer = 0;

      // スタート時説明
      showInstructions = true;
      instructionTimer = INSTRUCTION_DURATION;
    }

    // ==========================
    // ユーティリティ
    // ==========================
    function randomRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    function rectsOverlap(a, b) {
      return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
      );
    }

    function isPlayerOverHole(p) {
      const pxCenter = p.x + p.width / 2;
      for (const hole of holes) {
        if (pxCenter > hole.x && pxCenter < hole.x + hole.width) {
          return true;
        }
      }
      return false;
    }

    function isCenterOverHoleOrEnemy(centerX) {
      for (const hole of holes) {
        if (centerX > hole.x && centerX < hole.x + hole.width) {
          return true;
        }
      }
      const enemyLists = [turtles, mushrooms, birds, bees, ghosts];
      const margin = 30;
      for (const list of enemyLists) {
        for (const e of list) {
          const exCenter = e.x + e.width / 2;
          if (Math.abs(centerX - exCenter) < (e.width / 2 + margin)) {
            return true;
          }
        }
      }
      const avoidMargin = 80;
      if (lastDeathAvoidCenterX != null) {
        if (Math.abs(centerX - lastDeathAvoidCenterX) < avoidMargin) {
          return true;
        }
      }
      return false;
    }

    function findSafeRespawnX() {
      const minX = canvas.width * 0.10;
      const maxX = canvas.width * 0.30;
      const step = 20;

      const candidates = [];
      for (let x = minX; x <= maxX; x += step) {
        candidates.push(x);
      }
      for (let i = candidates.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
      }

      for (const x of candidates) {
        const cx = x + player.width / 2;
        if (!isCenterOverHoleOrEnemy(cx)) {
          return x;
        }
      }
      return playerBaseX;
    }

    // ==========================
    // モード切り替え
    // ==========================
    function activateChickMode() {
      isChickMode = true;
      chickTimer = CHICK_MODE_DURATION;
      if (isBikeMode) {
        isBikeMode = false;
        bikeTimer = 0;
      }
      player.emoji = "🐥";
      playChickSound();
    }

    function activateBikeMode() {
      isBikeMode = true;
      bikeTimer = BIKE_MODE_DURATION;
      if (isChickMode) {
        isChickMode = false;
        chickTimer = 0;
      }
      player.emoji = "🚴";
      playBikeSound();
    }

    function activateStarMode() {
      isStarMode = true;
      starTimer = STAR_MODE_DURATION;
      playStarItemSound();
    }

    function updateModeTimers(dt) {
      if (isChickMode) {
        chickTimer -= dt;
        if (chickTimer <= 0) {
          isChickMode = false;
          chickTimer = 0;
          if (!isBikeMode) player.emoji = "🏃‍♂️";
        }
      }
      if (isBikeMode) {
        bikeTimer -= dt;
        if (bikeTimer <= 0) {
          isBikeMode = false;
          bikeTimer = 0;
          if (!isChickMode) player.emoji = "🏃‍♂️";
        }
      }
      if (isStarMode) {
        starTimer -= dt;
        if (starTimer <= 0) {
          isStarMode = false;
          starTimer = 0;
        }
      }
    }

    function getCurrentScrollSpeed() {
      if (isRespawnPause || isShaking) return 0;
      if (isStarMode) return BASE_SCROLL_SPEED * 1.5;
      let speed = BASE_SCROLL_SPEED;
      if (isChickMode) speed = BASE_SCROLL_SPEED * 0.6;
      if (isBikeMode)  speed = BASE_SCROLL_SPEED * 1.3;
      return speed;
    }

    // ==========================
    // ダメージ処理
    // ==========================
    function damagePlayer(options = {}) {
      if (invincibleTimer > 0 || gameOver) return;

      lives--;
      playHitSound();
      invincibleTimer = INVINCIBLE_TIME;
      lostMessageTimer = 3.0;

      if (lives <= 0) {
        if (score > highScore) {
          highScore = score;
          try {
            localStorage.setItem("lalarunner_highscore", highScore);
          } catch (e) {}
        }
        gameOver = true;
        gameOverDisplayTimer = GAME_OVER_DISPLAY_DURATION;
        return;
      }
      
      if (options.respawnFromTop) {
        // 穴落ち・落下リスポーンパターン
        const safeX = findSafeRespawnX();
        respawnSafeX = safeX;
        playerBaseX = safeX;

        // モード解除
        isChickMode = false;
        chickTimer = 0;
        isBikeMode = false;
        bikeTimer = 0;
        isStarMode = false;
        starTimer = 0;
        player.emoji = "🏃‍♂️";

        // 画面停止＋2秒後に新しい自分が落ちてくる
        isRespawnPause = true;
        respawnPauseTimer = 2.2;
        pendingRespawn = true;
        respawnDelayTimer = 2.0;
        return;
      } else {
        // 敵ヒット・壁クラッシュ
        player.vy = -400;
        player.onGround = false;
        jumpUsesLeft = 0;
        isCurrentlyThrusting = false;

        // モード解除
        isChickMode = false;
        chickTimer = 0;
        isBikeMode = false;
        bikeTimer = 0;
        isStarMode = false;
        starTimer = 0;
        player.emoji = "🏃‍♂️";

        // ロストしたら2秒ほど画面停止 → 2秒後に新しい自分が上から落ちてくる
        isRespawnPause = true;
        respawnPauseTimer = 2.2;
        pendingRespawn = true;
        respawnDelayTimer = 2.0;
      }
    }

    // ==========================
    // オブジェクト生成
    // ==========================
    function spawnObject() {
      const groundY = getGroundY();
      const x = canvas.width + 40;

      const categories = [
        "score", "score", "score",
        "chick",
        "bike",
        "wall",
        "stairs",
        "air_wall",
        "turtle",
        "mushroom",
        "platform",
        "air",
        "bee",
        "ghost",
        "hole", "hole",
        "star"
      ];

      const type = categories[Math.floor(Math.random() * categories.length)];

      if (type === "score") {
        const foodEmojis = ["🍎", "🍌", "🍕", "🍩", "🍔", "🍇", "🍰", "🍖"];
        items.push({
          type: "score",
          x,
          y: randomRange(groundY * 0.3, groundY - 120),
          width: 28,
          height: 28,
          emoji: foodEmojis[Math.floor(Math.random() * foodEmojis.length)]
        });
      } else if (type === "chick") {
        items.push({
          type: "chick", x,
          y: randomRange(groundY * 0.3, groundY - 140),
          width: 30, height: 30, emoji: "🐣"
        });
      } else if (type === "bike") {
        items.push({
          type: "bike", x,
          y: randomRange(groundY * 0.3, groundY - 140),
          width: 34, height: 34, emoji: "🚲"
        });
      } else if (type === "wall") {
        const wallHeight = randomRange(50, 140);
        walls.push({
          x,
          y: groundY - wallHeight,
          width: 40,
          height: wallHeight
        });
      } else if (type === "air_wall") {
        const y = randomRange(groundY * 0.35, groundY * 0.6);
        const h = randomRange(50, 140);
        platforms.push({
          x, y, baseY: y, width: 40, height: h,
          isMoving: false,
          isAirWall: true
        });
      } else if (type === "stairs") {
        const stepCount = Math.random() < 0.5 ? 2 : 3;
        const stepWidth = 40;
        const stepHeight = 35;
        
        const isAirStairs = Math.random() < 0.5;
        const baseY = isAirStairs ? randomRange(groundY * 0.4, groundY * 0.6) : groundY;

        const list = isAirStairs ? platforms : walls;
        const props = isAirStairs ? { isMoving: false, isAirWall: true } : {};

        for (let i = 0; i < stepCount; i++) {
          const h = stepHeight * (i + 1);
          list.push({
            x: x + i * stepWidth,
            y: baseY - h,
            width: stepWidth,
            height: h,
            ...props
          });
        }
      } else if (type === "turtle") {
        const h = 32;
        const baseY = getGroundY() - h;
        let amp = randomRange(10, 30);
        if (Math.random() < 0.30) {
          amp *= 3;
        }
        turtles.push({
          x, baseY, y: baseY,
          width: 40, height: h,
          emoji: "🐢",
          amp: amp,
          omega: randomRange(2.0, 4.0),
          phase: Math.random() * Math.PI * 2
        });
      } else if (type === "mushroom") {
        const h = 32;
        mushrooms.push({
          x, y: groundY - h,
          width: 32, height: h,
          emoji: "🍄"
        });
      } else if (type === "platform") {
        const platWidth = randomRange(80, 140);
        const platHeight = 16;
        const baseY = randomRange(groundY * 0.35, groundY * 0.6);
        platforms.push({
          x, y: baseY, baseY,
          width: platWidth, height: platHeight,
          amp: randomRange(20, 40),
          omega: randomRange(1.0, 2.0),
          phase: Math.random() * Math.PI * 2,
          isMoving: true,
          isAirWall: false
        });
      } else if (type === "air") {
        const airEmojis = ["🦇", "💣", "🌶️", "🌀"];
        const emoji = airEmojis[Math.floor(Math.random() * airEmojis.length)];
        const h = 32;
        const y = randomRange(80, groundY - 130);
        
        if (emoji === "🦇") {
          const baseY = y;
          const amp = randomRange(50, 100);
          const omega = randomRange(2.0, 4.0);
          birds.push({
            x, baseY, y: baseY, width: 40, height: h, emoji,
            phase: Math.random() * Math.PI * 2, amp, omega,
            isBat: true, isVortex: false
          });
        } else if (emoji === "🌀") {
          birds.push({
            x, y, width: 40, height: h, emoji,
            isBat: false, isVortex: true,
            angle: 0, rotationSpeed: -10.0 // ぐるぐる高速回転しながら移動
          });
        } else {
          birds.push({
            x, y, width: 40, height: h, emoji,
            isBat: false, isVortex: false
          });
        }
      } else if (type === "bee") {
        const baseY = randomRange(80, groundY - 140);
        const amp = randomRange(40, 70); // サインカーブを大きめに
        const omega = randomRange(2, 4);
        bees.push({
          x, baseY, y: baseY,
          width: 40, height: 32,
          emoji: "🐝",
          phase: Math.random() * Math.PI * 2,
          amp, omega
        });
      } else if (type === "ghost") {
        const baseY = randomRange(80, groundY - 130);
        ghosts.push({
          x, baseY, y: baseY,
          width: 40, height: 32,
          emoji: "👻",
          phase: Math.random() * Math.PI * 2,
          moveState: 1,
          moveTimer: randomRange(0.3, 0.8)
        });
      } else if (type === "hole") {
        const holeWidth = randomRange(80, 140);
        holes.push({ x, width: holeWidth });
      } else if (type === "star") {
        items.push({
          type: "star", x,
          y: randomRange(groundY * 0.25, groundY - 160),
          width: 30, height: 30, emoji: "⭐"
        });
      }
    }

    // ==========================
    // 入力（タップ・スワイプ）
    // ==========================
    function handleTouchStart(e) {
      e.preventDefault();

      if (!audioCtx) {
        initAudio();
      }
      resumeAudio();
      unlockAudio();

      if (gameOver) {
        if (gameOverDisplayTimer <= 0) {
          resetGame();
        }
        return;
      }
      
      if (showInstructions) {
        return;
      }

      isTouching = true;
      const t = e.touches[0];
      touchStartY = t.clientY;
    }

    function handleTouchEnd(e) {
      e.preventDefault();
      isTouching = false;
      touchStartY = null;
    }

    function handleTouchMove(e) {
      e.preventDefault();
      if (showInstructions) {
        return;
      }
      if (e.touches.length === 0) return;
      const t = e.touches[0];
      if (touchStartY === null) touchStartY = t.clientY;
      const dy = t.clientY - touchStartY;

      if (dy > 40 && !player.onGround && !gameOver) {
        isTouching = false;
        isCurrentlyThrusting = false;
        jumpUsesLeft = 0;
        if (player.vy < 900) player.vy = 900;
      }
    }

    function setupInput() {
      canvas.addEventListener("touchstart", handleTouchStart, { passive: false });
      canvas.addEventListener("touchend", handleTouchEnd, { passive: false });
      canvas.addEventListener("touchmove", handleTouchMove, { passive: false });

      document.addEventListener("touchmove", function (e) {
        e.preventDefault();
      }, { passive: false });

      // PC用
      canvas.addEventListener("mousedown", (e) => {
        e.preventDefault();
        if (!audioCtx) {
          initAudio();
        }
        resumeAudio();
        unlockAudio();

        if (gameOver) {
          if (gameOverDisplayTimer <= 0) {
            resetGame();
          }
          return;
        }
        
        if (showInstructions) {
          return;
        }
        
        isTouching = true;
      });
      canvas.addEventListener("mouseup", (e) => {
        e.preventDefault();
        isTouching = false;
      });
      canvas.addEventListener("mouseleave", () => {
        isTouching = false;
      });
    }

    // ==========================
    // ゲーム更新
    // ==========================
    function update(dt) {
      // スタート説明
      if (showInstructions) {
        instructionTimer -= dt;
        if (instructionTimer <= 0) {
          showInstructions = false;
        }
        return;
      }

      // ゲームオーバー中
      if (gameOver) {
        if (gameOverDisplayTimer > 0) {
          gameOverDisplayTimer -= dt;
          if (gameOverDisplayTimer < 0) gameOverDisplayTimer = 0;
        }
        return;
      }
      
      const groundY = getGroundY();

      // タイマー類
      if (invincibleTimer > 0) {
        invincibleTimer -= dt;
        if (invincibleTimer < 0) invincibleTimer = 0;
      }
      if (lostMessageTimer > 0) {
        lostMessageTimer -= dt;
        if (lostMessageTimer < 0) lostMessageTimer = 0;
      }
      if (isRespawnPause) {
        respawnPauseTimer -= dt;
        if (respawnPauseTimer < 0) respawnPauseTimer = 0;
      }
      
      if (isShaking) {
        shakeTimer -= dt;
        if (shakeTimer <= 0) {
          isShaking = false;
          shakeTimer = 0;
          shakeOffsetX = 0;
        } else {
          shakeOffsetX = Math.random() * 10 - 5;
        }
      }

      updateModeTimers(dt);

      const scrollSpeed = getCurrentScrollSpeed();
      const scroll = scrollSpeed * dt;

      // タップ判定
      if (!isTouching && prevIsTouching) {
        if (isCurrentlyThrusting) {
          jumpUsesLeft = Math.max(0, jumpUsesLeft - 1);
          isCurrentlyThrusting = false;
        }
      }

      if (isTouching && !gameOver && !isRespawnPause && !isShaking) {
        if (!isCurrentlyThrusting && jumpUsesLeft > 0) {
          isCurrentlyThrusting = true;
        }
      }

      if (!isShaking) {
        if (isCurrentlyThrusting) {
          player.vy = -300;
        } else {
          player.vy += GRAVITY * dt;
        }
      }

      const prevY = player.y;
      player.y += player.vy * dt;

      if (player.y < TOP_LIMIT) {
        player.y = TOP_LIMIT;
        if (player.vy < 0) player.vy = 0;
        if (isCurrentlyThrusting) {
          isCurrentlyThrusting = false;
          jumpUsesLeft = Math.max(0, jumpUsesLeft - 1);
        }
      }

      let playerBottom = player.y + player.height;
      let playerTop = player.y;

      const solids = platforms.concat(walls);
      let onPlatform = false;

      for (const solid of solids) {
        const overlapX =
          player.x + player.width > solid.x &&
          player.x < solid.x + solid.width;
        if (!overlapX) continue;

        if (
          player.vy >= 0 &&
          playerBottom >= solid.y &&
          playerBottom <= solid.y + solid.height
        ) {
          player.y = solid.y - player.height;
          player.vy = 0;
          playerBottom = player.y + player.height;
          playerTop = player.y;
          onPlatform = true;
          break;
        }

        if (
          player.vy < 0 &&
          playerTop <= solid.y + solid.height &&
          prevY >= solid.y + solid.height
        ) {
          player.y = solid.y + solid.height;
          player.vy = 0;
          playerTop = player.y;
          playerBottom = player.y + player.height;
          break;
        }
      }

      // 地面・穴
      let onGroundNow = false;
      if (!onPlatform && player.vy >= 0 && playerBottom >= groundY) {
        if (!isPlayerOverHole(player)) {
          player.y = groundY - player.height;
          player.vy = 0;
          playerBottom = player.y + player.height;
          playerTop = player.y;
          onGroundNow = true;
        }
      }

      player.onGround = onGroundNow || onPlatform;

      // 画面下に落ちた時
      if (player.y > canvas.height) {
        const centerX = player.x + player.width / 2;
        let removedHole = false;
        for (let i = 0; i < holes.length; i++) {
          const hole = holes[i];
          if (centerX > hole.x && centerX < hole.x + hole.width) {
            const holeCenter = hole.x + hole.width / 2;
            lastDeathAvoidCenterX = holeCenter;
            holes.splice(i, 1);
            removedHole = true;
            break;
          }
        }
        if (!removedHole) {
          lastDeathAvoidCenterX = centerX;
        }

        if (invincibleTimer <= 0) {
          // 穴など：ライフ減少＋リスポーン
          damagePlayer({ respawnFromTop: true });
        } else {
          // 無敵中に落ちた（敵からのノックバックなど）
          if (!pendingRespawn) {
            const safeX = findSafeRespawnX();
            respawnSafeX = safeX;
            playerBaseX = safeX;

            isChickMode = false;
            chickTimer = 0;
            isBikeMode = false;
            bikeTimer = 0;
            isStarMode = false;
            starTimer = 0;
            player.emoji = "🏃‍♂️";

            isRespawnPause = true;
            respawnPauseTimer = 2.2;
            pendingRespawn = true;
            respawnDelayTimer = 2.0;
          }
        }
      }

      // ジャンプ回数リセット
      if (player.onGround && player.vy === 0) {
        jumpUsesLeft = 2;
        if (!isTouching) {
          isCurrentlyThrusting = false;
        }
      }

      // 背景オブジェクトの移動
      function moveAndFilter(list) {
        return list
          .map(obj => {
            obj.x -= scroll;
            return obj;
          })
          .filter(obj => obj.x + (obj.width || 0) > -50);
      }

      walls = moveAndFilter(walls);
      platforms = moveAndFilter(platforms);
      items = moveAndFilter(items);
      turtles = moveAndFilter(turtles);
      mushrooms = moveAndFilter(mushrooms);
      
      birds = moveAndFilter(birds);
      for (const b of birds) {
        if (b.isBat) {
          b.phase += b.omega * dt;
          b.y = b.baseY + b.amp * Math.sin(b.phase);
        }
        if (b.isVortex) {
          b.angle += b.rotationSpeed * dt;
        }
      }

      holes = holes
        .map(hole => {
          hole.x -= scroll;
          return hole;
        })
        .filter(hole => hole.x + hole.width > -50);

      for (const plat of platforms) {
        if (plat.isMoving) {
          plat.phase += plat.omega * dt;
          plat.y = plat.baseY + plat.amp * Math.sin(plat.phase);
        }
      }

      for (const t of turtles) {
        t.phase += t.omega * dt;
        t.y = t.baseY - Math.abs(Math.sin(t.phase)) * t.amp;
      }

      bees = moveAndFilter(bees);
      for (const bee of bees) {
        bee.phase += bee.omega * dt;
        bee.y = bee.baseY + bee.amp * Math.sin(bee.phase); // サインカーブ
      }

      ghosts = ghosts.filter(g => {
        if (g.moveState === 1) {
          g.x -= scroll;
        }
        g.moveTimer -= dt;
        if (g.moveTimer <= 0) {
          g.moveState = g.moveState === 1 ? 0 : 1;
          g.moveTimer = randomRange(0.3, 0.8);
        }
        g.phase += 1.5 * dt;
        g.y = g.baseY + 10 * Math.sin(g.phase);
        return g.x + g.width > -50;
      });

      // 壁横衝突
      let playerRect = {
        x: player.x,
        y: player.y,
        width: player.width,
        height: player.height
      };

      let pushedByWall = false;
      for (const wall of walls) {
        const wallRect = {
          x: wall.x,
          y: wall.y,
          width: wall.width,
          height: wall.height
        };
        if (rectsOverlap(playerRect, wallRect)) {
          player.x = wall.x - player.width;
          playerRect.x = player.x;
          pushedByWall = true;
        }
      }
      for (const plat of platforms) {
        if (plat.isAirWall) {
          const wallRect = {
            x: plat.x,
            y: plat.y,
            width: plat.width,
            height: plat.height
          };
          if (rectsOverlap(playerRect, wallRect)) {
            player.x = plat.x - player.width;
            playerRect.x = player.x;
            pushedByWall = true;
          }
        }
      }

      // 壁に押し出されて画面外（連続ロストしないようフラグ確認）
      if (
        player.x + player.width < 0 &&
        invincibleTimer <= 0 &&
        !isRespawnPause &&
        !pendingRespawn
      ) {
        lastDeathAvoidCenterX = player.x + player.width / 2;
        damagePlayer();  // 壁ロスト
        playerRect.x = player.x;
        playerRect.y = player.y;
      }

      if (!pushedByWall && player.x < playerBaseX && !isRespawnPause && !isShaking) {
        const returnSpeed = 300;
        player.x += returnSpeed * dt;
        if (player.x > playerBaseX) player.x = playerBaseX;
        playerRect.x = player.x;
      }

      // 敵との当たり判定
      function handleEnemyHit(list, index, centerX, enemy) {
        lastDeathAvoidCenterX = centerX;

        if (isStarMode) {
          const e = enemy || list[index];
          if (e) {
            score += 30;
            playStarHitSound();
            floatTexts.push({
              x: e.x + e.width / 2,
              y: e.y,
              text: "+30",
              life: 0.8
            });
          }
          list.splice(index, 1);
          return;
        }
        
        if (enemy && enemy.emoji === "🌀") {
          if (invincibleTimer > 0) return;
          player.vy = GRAVITY * 0.8;
          player.onGround = false;
          jumpUsesLeft = 0;
          isCurrentlyThrusting = false;
          list.splice(index, 1);
          return;
        }
        
        if (enemy && enemy.emoji === "🌶️") {
          if (invincibleTimer > 0) return;
          isShaking = true;
          shakeTimer = SHAKE_DURATION;
          invincibleTimer = SHAKE_DURATION + 0.2;
          list.splice(index, 1);
          playHitSound();
          return;
        }

        if (isBikeMode) {
          isBikeMode = false;
          bikeTimer = 0;
          if (!isChickMode) player.emoji = "🏃‍♂️";
          return;
        }

        if (invincibleTimer <= 0) {
          list.splice(index, 1);
          damagePlayer();
        }
      }

      for (let i = 0; i < turtles.length && !gameOver; i++) {
        if (rectsOverlap(playerRect, turtles[i])) {
          const c = turtles[i].x + turtles[i].width / 2;
          handleEnemyHit(turtles, i, c, turtles[i]);
          break;
        }
      }
      for (let i = 0; i < mushrooms.length && !gameOver; i++) {
        if (rectsOverlap(playerRect, mushrooms[i])) {
          const c = mushrooms[i].x + mushrooms[i].width / 2;
          handleEnemyHit(mushrooms, i, c, mushrooms[i]);
          break;
        }
      }
      for (let i = 0; i < birds.length && !gameOver; i++) {
        if (rectsOverlap(playerRect, birds[i])) {
          const c = birds[i].x + birds[i].width / 2;
          handleEnemyHit(birds, i, c, birds[i]);
          break;
        }
      }
      for (let i = 0; i < bees.length && !gameOver; i++) {
        if (rectsOverlap(playerRect, bees[i])) {
          const c = bees[i].x + bees[i].width / 2;
          handleEnemyHit(bees, i, c, bees[i]);
          break;
        }
      }
      for (let i = 0; i < ghosts.length && !gameOver; i++) {
        if (rectsOverlap(playerRect, ghosts[i])) {
          const c = ghosts[i].x + ghosts[i].width / 2;
          handleEnemyHit(ghosts, i, c, ghosts[i]);
          break;
        }
      }

      // アイテム
      if (!gameOver) {
        items = items.filter(item => {
          if (rectsOverlap(playerRect, item)) {
            let text = "";
            if (item.type === "score") {
              score += 10;
              playScoreItemSound();
              text = "+10";
            } else if (item.type === "chick") {
              activateChickMode();
              text = "🐥";
            } else if (item.type === "bike") {
              const wasBike = isBikeMode;
              if (wasBike) {
                score += 20;
                playBikeBonusSound();
                text = "+20";
              } else {
                text = "🚴";
              }
              activateBikeMode();
            } else if (item.type === "star") {
              activateStarMode();
              text = "⭐";
            }
            floatTexts.push({
              x: item.x + item.width / 2,
              y: item.y,
              text,
              life: 0.8
            });
            return false;
          }
          return true;
        });
      }

      // スコア（生存時間）
      if (!gameOver && !isRespawnPause && !isShaking) {
        score += dt * 5;
      }

      // プレイヤー回転
      // ⭐無敵中は必ず反時計回りに高速回転
      if (isStarMode) {
        const starRollSpeed = 12.0;
        player.angle += -starRollSpeed * dt; // 反時計回り（Canvasは負が逆方向）
      } else {
        const inNormalMode = !isBikeMode && !isChickMode;
        let rollDir = 0;
        const baseSpeed = 4.0;
        if (isBikeMode || inNormalMode) {
          rollDir = -1;
        } else {
          rollDir = 1;
        }
        player.angle += rollDir * baseSpeed * dt;
      }

      // フローティングテキスト
      floatTexts = floatTexts.filter(ft => {
        ft.y -= 40 * dt;
        ft.life -= dt;
        return ft.life > 0;
      });

      // オブジェクト生成（⭐中は3倍ペースで敵＆アイテム大量）
      if (!isRespawnPause && !isShaking) {
        spawnTimer += dt * (isStarMode ? 3 : 1);
        if (spawnTimer >= nextSpawnTime) {
          spawnObject();
          spawnTimer = 0;
          nextSpawnTime = randomRange(0.8, 1.6);
        }
      }

      // リスポーンの「2秒待ち」→ 新しい自分を上から落とす
      if (pendingRespawn) {
        respawnDelayTimer -= dt;
        if (respawnDelayTimer <= 0) {
          respawnDelayTimer = 0;
          pendingRespawn = false;

          const safeX = respawnSafeX != null ? respawnSafeX : findSafeRespawnX();
          player.x = safeX;
          playerBaseX = safeX;

          player.y = -player.height - 10;
          player.vy = 300;
          player.onGround = false;
          player.angle = 0;
        }
      }

      // 一時停止解除
      if (isRespawnPause && respawnPauseTimer <= 0 && player.onGround && !pendingRespawn) {
        isRespawnPause = false;
      }

      prevIsTouching = isTouching;
    }

    // ==========================
    // 描画
    // ==========================
    function draw() {
      const groundY = getGroundY();

      // 背景
      ctx.fillStyle = "#87ceeb";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 地面（穴抜き）
      ctx.fillStyle = "#3c7c1b";
      const sortedHoles = [...holes].sort((a, b) => a.x - b.x);
      let currentX = 0;
      for (const hole of sortedHoles) {
        const segWidth = hole.x - currentX;
        if (segWidth > 0) {
          ctx.fillRect(currentX, groundY, segWidth, canvas.height - groundY);
        }
        currentX = hole.x + hole.width;
      }
      if (currentX < canvas.width) {
        ctx.fillRect(currentX, groundY, canvas.width - currentX, canvas.height - groundY);
      } 

      // 壁
      ctx.fillStyle = "#8b4513";
      for (const wall of walls) {
        ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
      }

      // 空中床
      const airWallColor = "#9acd32";
      const platformColor = "#cccccc";
      for (const plat of platforms) {
        ctx.fillStyle = plat.isAirWall ? airWallColor : platformColor;
        ctx.fillRect(plat.x, plat.y, plat.width, plat.height);
      }

      // プレイヤー
      const cx = player.x + player.width / 2 + (isShaking ? shakeOffsetX : 0);
      const cy = player.y + player.height / 2;
      ctx.save();
      ctx.translate(cx, cy);

      const inNormalMode = !isBikeMode && !isChickMode;
      if (isBikeMode || inNormalMode || isStarMode) {
        ctx.scale(-1, 1);
      }

      ctx.rotate(player.angle);

      // ⭐無敵中は赤いオーラ
      if (isStarMode) {
        ctx.beginPath();
        ctx.fillStyle = "rgba(255, 80, 80, 0.9)";
        ctx.arc(0, 0, 26, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.font = "32px system-ui";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#000000";
      ctx.fillText(player.emoji, 0, 0);
      ctx.restore();

      // 敵・アイテム
      ctx.font = "28px system-ui";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (const t of turtles) {
        ctx.fillText(t.emoji, t.x + t.width / 2, t.y + t.height / 2);
      }
      for (const m of mushrooms) {
        ctx.fillText(m.emoji, m.x + m.width / 2, m.y + m.height / 2);
      }
      for (const b of birds) {
        if (b.isVortex) {
          const bcx = b.x + b.width / 2;
          const bcy = b.y + b.height / 2;
          ctx.save();
          ctx.translate(bcx, bcy);
          ctx.rotate(b.angle);
          ctx.fillText(b.emoji, 0, 0);
          ctx.restore();
        } else {
          ctx.fillText(b.emoji, b.x + b.width / 2, b.y + b.height / 2);
        }
      }
      for (const bee of bees) {
        ctx.fillText(bee.emoji, bee.x + bee.width / 2, bee.y + bee.height / 2);
      }
      for (const g of ghosts) {
        ctx.fillText(g.emoji, g.x + g.width / 2, g.y + g.height / 2);
      }
      for (const item of items) {
        ctx.fillText(item.emoji, item.x + item.width / 2, item.y + item.height / 2);
      }

      // フローティングテキスト
      for (const ft of floatTexts) {
        const alpha = Math.max(0, ft.life / 0.8);
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = "#ffff00";
        ctx.font = "18px system-ui";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(ft.text, ft.x, ft.y);
        ctx.restore();
      }

      // ライフ
      ctx.fillStyle = "#ff0000";
      ctx.font = "24px system-ui";
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText("❤️".repeat(lives), 10, 10);

      // スコア
      ctx.fillStyle = "#000000";
      ctx.font = "20px system-ui";
      ctx.textAlign = "right";
      ctx.textBaseline = "top";
      ctx.fillText("Score: " + Math.floor(score), canvas.width - 16, 10);

      // スタート時説明
      if (showInstructions) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "18px system-ui";

        const lines = instructionText.split('\n');
        const lineHeight = 24;
        const startY = canvas.height / 2 - (lines.length - 1) * lineHeight / 2;

        for (let i = 0; i < lines.length; i++) {
          ctx.fillText(lines[i], canvas.width / 2, startY + i * lineHeight);
        }
      }

      // LOST 表示
      if (lostMessageTimer > 0 && !gameOver) {
        ctx.save();
        ctx.fillStyle = "rgba(0,0,0,0.4)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#ff4444";
        ctx.font = "32px system-ui";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("ぶっぶー", canvas.width / 2, canvas.height / 2);
        ctx.restore();
      }

      // Game Over
      if (gameOver) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.font = "36px system-ui";
        ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2 - 40);

        ctx.font = "24px system-ui";
        ctx.fillText("Score: " + Math.floor(score), canvas.width / 2, canvas.height / 2);

        // ハイスコア表示
        ctx.font = "20px system-ui";
        ctx.fillText("High Score: " + Math.floor(highScore), canvas.width / 2, canvas.height / 2 + 30);

        if (gameOverDisplayTimer <= 0) {
          ctx.font = "18px system-ui";
          ctx.fillText("画面をタップしてリスタート", canvas.width / 2, canvas.height / 2 + 70);
        }
      }
    }

    // ==========================
    // メインループ
    // ==========================
    function gameLoop(timestamp) {
      if (!lastTime) lastTime = timestamp;
      let dt = (timestamp - lastTime) / 1000;
      if (dt > 1/30) {
        dt = 1/30;
      }
      lastTime = timestamp;

      update(dt);
      draw();

      requestAnimationFrame(gameLoop);
    }

    // ==========================
    // 初期化
    // ==========================
    function init() {
      resizeCanvas();
      resetGame();
      setupInput();
      requestAnimationFrame(gameLoop);
    }

    window.addEventListener("resize", () => {
      resizeCanvas();
      resetGame();
    });

    init();

    // ==========================
    // Service Worker 登録
    // ==========================
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("./service-worker.js")
          .catch(err => {
            console.log("ServiceWorker registration failed:", err);
          });
      });
    }
  </script>
</body>
</html>
