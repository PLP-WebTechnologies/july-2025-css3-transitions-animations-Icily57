// ================================
// Leaderboard Logic
// ================================
let leaderboard = [
  { name: "Alice", score: 12 },
  { name: "Bob", score: 8 },
  { name: "Charlie", score: 5 }
];

// Render Leaderboard
function renderLeaderboard() {
  const lb = document.getElementById("leaderboard");
  lb.innerHTML = "";
  leaderboard
    .sort((a, b) => b.score - a.score)
    .forEach(player => {
      const li = document.createElement("li");
      li.textContent = `${player.name}: ${player.score} pts`;
      lb.appendChild(li);
    });
}
renderLeaderboard();

// Update Score Helper
function updateScore(playerName, points) {
  let player = leaderboard.find(p => p.name === playerName);
  if (player) {
    player.score += points;
  } else {
    leaderboard.push({ name: playerName, score: points });
  }
  renderLeaderboard();
}

// ================================
// Game 1: Guess the Number
// ================================
function startGuessGame() {
  const container = document.getElementById("guess-game");
  container.innerHTML = `
    <p>Guess a number between 1–10:</p>
    <input type="number" id="guessInput" min="1" max="10">
    <button onclick="checkGuess()">Submit</button>
    <p id="guessResult"></p>
  `;
  container.dataset.secret = Math.floor(Math.random() * 10) + 1;
}

function checkGuess() {
  const input = document.getElementById("guessInput").value;
  const secret = document.getElementById("guess-game").dataset.secret;
  const result = document.getElementById("guessResult");

  if (parseInt(input) === parseInt(secret)) {
    result.textContent = "🎉 Correct!";
    updateScore("You", 5);
    animateCard("guessCard");
  } else {
    result.textContent = "❌ Try again!";
  }
}

// ================================
// Game 2: Rock Paper Scissors
// ================================
function startRPSGame() {
  const container = document.getElementById("rps-game");
  container.innerHTML = `
    <p>Choose:</p>
    <button onclick="playRPS('rock')">Rock</button>
    <button onclick="playRPS('paper')">Paper</button>
    <button onclick="playRPS('scissors')">Scissors</button>
    <p id="rpsResult"></p>
  `;
}

function playRPS(choice) {
  const options = ["rock", "paper", "scissors"];
  const computer = options[Math.floor(Math.random() * 3)];
  const result = document.getElementById("rpsResult");

  if (choice === computer) {
    result.textContent = `🤝 It's a tie! Computer also chose ${computer}`;
  } else if (
    (choice === "rock" && computer === "scissors") ||
    (choice === "paper" && computer === "rock") ||
    (choice === "scissors" && computer === "paper")
  ) {
    result.textContent = `🎉 You win! Computer chose ${computer}`;
    updateScore("You", 3);
    animateCard("rpsCard");
  } else {
    result.textContent = `😢 You lose! Computer chose ${computer}`;
  }
}

// ================================
// Game 3: Quick Math
// ================================
function startMathGame() {
  const num1 = Math.floor(Math.random() * 10);
  const num2 = Math.floor(Math.random() * 10);
  const container = document.getElementById("math-game");

  container.innerHTML = `
    <p>Solve: ${num1} + ${num2} = ?</p>
    <input type="number" id="mathAnswer">
    <button onclick="checkMath(${num1 + num2})">Submit</button>
    <p id="mathResult"></p>
  `;
}

function checkMath(correctAnswer) {
  const input = parseInt(document.getElementById("mathAnswer").value);
  const result = document.getElementById("mathResult");

  if (input === correctAnswer) {
    result.textContent = "✅ Correct!";
    updateScore("You", 4);
    animateCard("mathCard");
  } else {
    result.textContent = "❌ Wrong, try again!";
  }
}

// ================================
// Game 4: Word Scramble
// ================================
function startWordScramble() {
  const words = ["javascript", "gamezone", "coding", "fun", "challenge"];
  const word = words[Math.floor(Math.random() * words.length)];
  const scrambled = word.split("").sort(() => 0.5 - Math.random()).join("");

  const container = document.getElementById("scramble-game");
  container.innerHTML = `
    <p>Unscramble this: <strong>${scrambled}</strong></p>
    <input type="text" id="scrambleAnswer">
    <button onclick="checkScramble('${word}')">Submit</button>
    <p id="scrambleResult"></p>
  `;
}

function checkScramble(correctWord) {
  const input = document.getElementById("scrambleAnswer").value.trim().toLowerCase();
  const result = document.getElementById("scrambleResult");

  if (input === correctWord) {
    result.textContent = "🎉 Correct!";
    updateScore("You", 6);
    animateCard("scrambleCard");
  } else {
    result.textContent = "❌ Wrong, try again!";
  }
}

// ================================
// Game 5: Click Speed
// ================================
function startClickSpeed() {
  const container = document.getElementById("click-game");
  let clicks = 0;
  container.innerHTML = `
    <p>Click as fast as you can in 5 seconds!</p>
    <button id="clickBtn">Click Me!</button>
    <p id="clickCount">Clicks: 0</p>
  `;

  const btn = document.getElementById("clickBtn");
  btn.onclick = () => {
    clicks++;
    document.getElementById("clickCount").textContent = "Clicks: " + clicks;
  };

  setTimeout(() => {
    alert(`⏰ Time's up! You clicked ${clicks} times.`);
    updateScore("You", clicks);
    animateCard("clickCard");
  }, 5000);
}

// ================================
// Game 6: Memory Match
// ================================
function startMemoryGame() {
  const symbols = ["🍎","🍎","🍌","🍌","🍒","🍒"];
  const shuffled = symbols.sort(() => 0.5 - Math.random());

  const container = document.getElementById("memory-game");
  container.innerHTML = shuffled
    .map((s, i) => `<button class="memoryCard" id="card-${i}" onclick="flipCard(${i}, '${s}')">❓</button>`)
    .join("");

  window.memory = { flipped: [], matched: [] };
}

function flipCard(index, symbol) {
  const btn = document.getElementById(`card-${index}`);
  btn.innerText = symbol;
  btn.disabled = true;

  memory.flipped.push({ index, symbol });

  if (memory.flipped.length === 2) {
    const [a, b] = memory.flipped;
    if (a.symbol === b.symbol) {
      memory.matched.push(a.index, b.index);
      updateScore("You", 10);
      animateCard("memoryCard");
    } else {
      setTimeout(() => {
        document.getElementById(`card-${a.index}`).innerText = "❓";
        document.getElementById(`card-${b.index}`).innerText = "❓";
        document.getElementById(`card-${a.index}`).disabled = false;
        document.getElementById(`card-${b.index}`).disabled = false;
      }, 800);
    }
    memory.flipped = [];
  }
}

// ================================
// Animation Helper
// ================================
function animateCard(cardId) {
  const card = document.getElementById(cardId);
  if (!card) return;
  card.classList.add("animate-pulse");
  setTimeout(() => card.classList.remove("animate-pulse"), 800);
}

// ================================
// Floating Particles
// ================================
let particles = [];
function createParticles(num = 30) {
  for (let i = 0; i < num; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");
    particle.style.left = Math.random() * 100 + "vw";
    const size = Math.random() * 10 + 5;
    particle.style.width = size + "px";
    particle.style.height = size + "px";
    particle.style.animationDuration = Math.random() * 10 + 5 + "s";
    particle.style.animationDelay = Math.random() * 5 + "s";
    document.body.appendChild(particle);
    particles.push(particle);
  }
}

document.addEventListener("mousemove", (e) => {
  const mouseX = e.clientX;
  const mouseY = e.clientY;
  particles.forEach((p) => {
    const rect = p.getBoundingClientRect();
    const px = rect.left + rect.width / 2;
    const py = rect.top + rect.height / 2;
    const dx = mouseX - px;
    const dy = mouseY - py;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < 100) {
      const angle = Math.atan2(dy, dx);
      p.style.transform = `translate(${Math.cos(angle) * -50}px, ${Math.sin(angle) * -50}px)`;
    } else {
      p.style.transform = "translate(0, 0)";
    }
  });
});

window.onload = () => { createParticles(100); };
