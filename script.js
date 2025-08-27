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

// Update Score Helper (reusable function)
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
  } else {
    result.textContent = "❌ Wrong, try again!";
  }
}

// JS-Triggered Animation Example
function animateCard(cardId) {
  const card = document.getElementById(cardId);
  if (!card) return;

  card.classList.add("shake"); // add class
  setTimeout(() => card.classList.remove("shake"), 600); // remove after animation
}

// ================================
// Floating Particles Generator
// ================================
let particles = [];

function createParticles(num = 30) {
  for (let i = 0; i < num; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");

    // random horizontal position
    particle.style.left = Math.random() * 100 + "vw";

    // random size
    const size = Math.random() * 10 + 5;
    particle.style.width = size + "px";
    particle.style.height = size + "px";

    // random animation duration & delay
    const duration = Math.random() * 10 + 5;
    particle.style.animationDuration = duration + "s";
    particle.style.animationDelay = Math.random() * 5 + "s";

    document.body.appendChild(particle);
    particles.push(particle);
  }
}

// ================================
// Interactivity: repel particles on mouse move
// ================================
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

    if (distance < 100) { // only affect close particles
      const angle = Math.atan2(dy, dx);
      const moveX = Math.cos(angle) * -50;
      const moveY = Math.sin(angle) * -50;

      p.style.transform = `translate(${moveX}px, ${moveY}px)`;
      p.style.transition = "transform 0.3s ease";
    } else {
      p.style.transform = "translate(0, 0)"; // reset
    }
  });
});

// Run when page loads
window.onload = () => {
  createParticles(30);
};
