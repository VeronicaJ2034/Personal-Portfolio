// JavaScript code for the drag-and-drop matching game

// Global variables
let draggedImg = null;
let startTime = null;
let timerInterval = null;
let attempts = 0;
let correctMatches = 0;
let highScore = 0;
let successMessage = null;

// Correct mapping of images to labels
const correctMap = {
  "Playa.jpg": "Playa",
  "Gato.jpg": "Gato",
  "Puerta.jpg": "Puerta",
  "Familia.jpg": "Familia",
  "Casa.jpg": "Casa",
  "Lapiz.jpg": "Lapiz",
  "Zapatos.jpg": "Zapatos",
  "Nieve.jpg": "Nieve"
};

//order of labels in the grid
const labelOrder = [
  "Gato", "Casa", "Playa", "Nieve",
  "Zapatos", "Lapiz", "Familia", "Puerta"
];

// Initialize the displays
const timerDisplay = document.createElement('p');
const scoreDisplay = document.createElement('p');
const highScoreDisplay = document.createElement('p');
timerDisplay.style.fontWeight = 'bold';
scoreDisplay.style.fontWeight = 'bold';
highScoreDisplay.style.fontWeight = 'bold';

// Set initial styles for the stats display
document.querySelector('#game-stats').append(timerDisplay, scoreDisplay, highScoreDisplay);

// Start the timer
function startTimer() {
  startTime = Date.now();
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    const seconds = Math.floor((Date.now() - startTime) / 1000);
    timerDisplay.textContent = `Time: ${seconds}s`;
  }, 1000);
}

// Allow drag
document.querySelectorAll('.photo-option').forEach(img => {
  img.addEventListener('dragstart', (e) => {
    draggedImg = e.target;
  });
});

// Allow drop logic
function allowDrop(e) {
  e.preventDefault();
}

// Handle drop logic
function drop(e) {
  e.preventDefault();
  const target = e.target.closest('.grid-cell');

  // Only allow drop if the target grid cell is empty and image is not locked
  if (draggedImg && target && target.children.length === 0 && !draggedImg.classList.contains('locked')) {
    target.appendChild(draggedImg);
    draggedImg.classList.add('locked');  // Lock the image in place
    draggedImg.setAttribute('draggable', 'false');  // Make it non-draggable
    attempts++;

    const imgName = draggedImg.getAttribute('src').split('/').pop();
    const labelIndex = Array.from(document.querySelectorAll('.grid-cell')).indexOf(target);
    const labelText = labelOrder[labelIndex];

    if (correctMap[imgName] === labelText) {
      correctMatches++;
    }

    updateScore();
    checkForSuccess(); // Check for success after each drop

    console.log(`Dropped: ${imgName} on ${labelText}`);
  }
}

// Check if all images are correctly placed
function checkForSuccess() {
  const allFilled = Array.from(document.querySelectorAll('.grid-cell')).every(cell => cell.children.length > 0);
  
  if (allFilled && correctMatches === 8) {
    clearInterval(timerInterval);
    if (correctMatches > highScore) {
      highScore = correctMatches;
    }
    highScoreDisplay.textContent = `High Score: ${highScore}/8`;
    displaySuccessMessage();
  }
}

// Display success message
function displaySuccessMessage() {
  // Only display success message if it's not already there
  if (!successMessage) {
    successMessage = document.createElement('p');
    successMessage.textContent = "Congratulations! You've matched all the pieces correctly!";
    successMessage.style.fontSize = '20px';
    successMessage.style.fontWeight = 'bold';
    successMessage.style.color = 'green';
    document.querySelector('#game-stats').appendChild(successMessage);
  }
}

// Update score display
function updateScore() {
  const accuracy = attempts > 0 ? Math.round((correctMatches / attempts) * 100) : 0;
  scoreDisplay.textContent = `Score: ${correctMatches}/8 | Accuracy: ${accuracy}%`;
}

// Reset and shuffle
document.getElementById('reset-btn').addEventListener('click', () => {
  // Remove success message when reset is clicked
  if (successMessage) {
    successMessage.remove();
    successMessage = null;
  }

  const images = [];

  // Get images from grid
  document.querySelectorAll('.grid-cell').forEach(cell => {
    const img = cell.querySelector('img');
    if (img) {
      images.push(img);
      cell.innerHTML = '';
      img.setAttribute('draggable', 'true');  // Reset draggable to true for all images
      img.classList.remove('locked');  // Unlock image
    }
  });

  // Get images from pool
  document.querySelectorAll('#photo-pool img').forEach(img => images.push(img));

  // Shuffle images
  for (let i = images.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [images[i], images[j]] = [images[j], images[i]];
  }

  // Reinsert images back into the pool
  const photoPool = document.getElementById('photo-pool');
  photoPool.innerHTML = '';
  images.forEach(img => {
    photoPool.appendChild(img);
    // Reset draggable attribute and pointer-events for each image
    img.setAttribute('draggable', 'true');
    img.style.pointerEvents = 'auto';
    img.style.cursor = 'grab';  // Reset cursor to indicate draggable
  });

  // Reset grid cells
  const gridCells = document.querySelectorAll('.grid-cell');
  gridCells.forEach(cell => {
    cell.innerHTML = '';  // Clear each grid cell
  });

  // Reset stats
  correctMatches = 0;
  attempts = 0;
  updateScore();
  startTimer();
});

// Start game on load
window.addEventListener('load', () => {
  updateScore();
  highScoreDisplay.textContent = `High Score: ${highScore}/8`;
  startTimer();
});