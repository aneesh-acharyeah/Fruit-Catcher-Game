const basket = document.getElementById("basket");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const fruitContainer = document.getElementById("fruit-container");

let score = 0;
let timeLeft = 30;
let gameInterval, fruitInterval;

// Function to generate random fruits
function generateFruit() {
  const fruit = document.createElement("div");
  const fruitType = Math.random();
  if (fruitType < 0.33) {
    fruit.classList.add("fruit", "apple");
  } else if (fruitType < 0.66) {
    fruit.classList.add("fruit", "banana");
  } else {
    fruit.classList.add("fruit", "orange");
  }

  const randomX = Math.random() * (fruitContainer.offsetWidth - 40); // Keep the fruit within the container width
  fruit.style.left = `${randomX}px`;

  // Add click event to catch the fruit
  fruit.addEventListener("click", () => {
    score += 10;
    scoreDisplay.textContent = score;
    fruitContainer.removeChild(fruit); // Remove the fruit if caught
  });

  fruitContainer.appendChild(fruit);
}

// Function to update the basket's position based on mouse movement
function moveBasket(e) {
  const mouseX = e.clientX;
  const containerX = fruitContainer.getBoundingClientRect().left;
  const basketWidth = basket.offsetWidth;
  
  if (mouseX > containerX && mouseX < containerX + fruitContainer.offsetWidth) {
    basket.style.left = `${mouseX - containerX - basketWidth / 2}px`;
  }
}

// Function to handle the timer countdown
function startTimer() {
  gameInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(gameInterval);
      clearInterval(fruitInterval);
      alert(`Game Over! Your final score is ${score}`);
    }
  }, 1000);
}

// Start the game
function startGame() {
  document.addEventListener("mousemove", moveBasket);
  startTimer();
  fruitInterval = setInterval(generateFruit, 1000); // Generate a fruit every 1 second
}

startGame();
