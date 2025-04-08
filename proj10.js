let correctMap = {
  "Gato": "Gato.jpg",
  "Casa": "Casa.jpg",
  "Playa": "Playa.jpg",
  "Nieve": "Nieve.jpg",
  "Zapatos": "Zapatos.jpg",
  "Lapiz": "Lapiz.jpg",
  "Familia": "Familia.jpg",
  "Puerta": "Puerta.jpg"
};

let draggedImg = null;
let timer = 0;
let timerInterval = null;
let score = 0;
let attempts = 0;
let highScore = 0;
let correctMatches = 0;

const gridCells = document.querySelectorAll(".grid-cell");
const photoPool = document.getElementById("photo-pool");
const gameStats = document.getElementById("game-stats");

// Create and display stats elements
const timerDisplay = document.createElement("p");
const scoreDisplay = document.createElement("p");
const highScoreDisplay = document.createElement("p");
const successMessage = document.createElement("p");

timerDisplay.textContent = "Time: 0s";
scoreDisplay.textContent = "Score: 0/8";
highScoreDisplay.textContent = "High Score: 0";
successMessage.style.fontWeight = "bold";
successMessage.style.color = "green";

gameStats.appendChild(timerDisplay);
gameStats.appendChild(scoreDisplay);
gameStats.appendChild(highScoreDisplay);
gameStats.appendChild(successMessage);

document.getElementById("reset-btn").addEventListener("click", resetGame);

// Timer logic
function startTimer() {
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timer++;
    timerDisplay.textContent = `Time: ${timer}s`;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

// Drag-and-Drop Functions
document.querySelectorAll(".photo-option").forEach(img => {
  img.addEventListener("dragstart", e => {
    draggedImg = e.target;
  });
});

// Highlight effect
gridCells.forEach(cell => {
  cell.addEventListener("dragover", e => {
    e.preventDefault();
    if (!cell.hasChildNodes()) {
      cell.style.backgroundColor = "lightblue";
    }
  });

  cell.addEventListener("dragleave", () => {
    cell.style.backgroundColor = "#f0f0f0";
  });
});

function drop(e) {
  e.preventDefault();
  const cell = e.target.closest(".grid-cell");
  cell.style.backgroundColor = "#f0f0f0";

  if (!cell || cell.hasChildNodes() || !draggedImg) return;

  const labelIndex = Array.from(gridCells).indexOf(cell);
  const labelOrder = ["Gato", "Casa", "Playa", "Nieve", "Zapatos", "Lapiz", "Familia", "Puerta"];
  const expectedLabel = labelOrder[labelIndex];

  const actualImageName = draggedImg.src.split("/").pop();
  const correctImage = correctMap[expectedLabel];

  cell.appendChild(draggedImg);
  draggedImg.setAttribute("draggable", "false");
  draggedImg.classList.add("snapped");

  attempts++;

  if (actualImageName === correctImage) {
    correctMatches++;
  }

  scoreDisplay.textContent = `Score: ${correctMatches}/8`;

  if (correctMatches === 8 || attempts === 8) {
    stopTimer();
    updateHighScore();
    displaySuccessMessage();
  }
}

function displaySuccessMessage() {
  if (correctMatches === 8) {
    successMessage.textContent = "All matches correct!";
  } else {
    successMessage.textContent = "Game over! Not all matches were correct.";
  }
}

function updateHighScore() {
  if (correctMatches > highScore) {
    highScore = correctMatches;
    highScoreDisplay.textContent = `High Score: ${highScore}`;
  }
}

function resetGame() {
  clearInterval(timerInterval);
  timer = 0;
  correctMatches = 0;
  attempts = 0;
  draggedImg = null;
  timerDisplay.textContent = "Time: 0s";
  scoreDisplay.textContent = "Score: 0/8";
  successMessage.textContent = "";

  // Collect all images from grid and photo pool
  const allImages = [];

  // From grid cells
  gridCells.forEach(cell => {
    if (cell.firstChild) {
      allImages.push(cell.removeChild(cell.firstChild));
    }
    cell.style.backgroundColor = "#f0f0f0";
  });

  // From photo pool
  const poolImages = Array.from(photoPool.querySelectorAll("img"));
  poolImages.forEach(img => {
    if (img.parentElement === photoPool) {
      allImages.push(img);
    }
  });

  // Shuffle and re-add to photo pool
  const shuffled = allImages.sort(() => 0.5 - Math.random());
  shuffled.forEach(img => {
    img.setAttribute("draggable", "true");
    img.classList.remove("snapped");
    photoPool.appendChild(img);
  });

  startTimer();
}

// Start the timer on page load
window.onload = startTimer;
