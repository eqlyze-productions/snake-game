const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const tileSize = 20;
const speed = 150;

let snake = [{ x: 300, y: 300 }];
let food = {};
let direction = { x: 0, y: 0 };
let obstacles = [];

function createFood() {
  food = {
    x: Math.floor(Math.random() * (canvas.width / tileSize)) * tileSize,
    y: Math.floor(Math.random() * (canvas.height / tileSize)) * tileSize,
  };
}

function createObstacles() {
    for (let i = 0; i < 5; i++) {
      obstacles.push({
        x: Math.floor(Math.random() * (canvas.width / tileSize)) * tileSize,
        y: Math.floor(Math.random() * (canvas.height / tileSize)) * tileSize,
      });
    }
  }

function updateGame() {
  const newX = snake[0].x + direction.x * tileSize;
  const newY = snake[0].y + direction.y * tileSize;

  if (
    newX < 0 ||
    newX >= canvas.width ||
    newY < 0 ||
    newY >= canvas.height ||
    snake.some((segment) => segment.x === newX && segment.y === newY) ||
    obstacles.some((obstacle) => obstacle.x === newX && obstacle.y === newY)
  ) {
    // Game over
    snake = [{ x: 300, y: 300 }];
    direction = { x: 0, y: 0 };
  } else {
    // Move snake
    snake.unshift({ x: newX, y: newY });

    if (newX === food.x && newY === food.y) {
      // Eat food
      createFood();
    } else {
      // Remove tail
      snake.pop();
    }
  }

  setTimeout(updateGame, speed);
}

function drawGame() {
  ctx.fillStyle = "black";
  ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "lime";
  for (const [index, segment] of snake.entries()) {
    ctx.fillStyle = `hsl(${(index * 10) % 360}, 100%, 50%)`;
    ctx.beginPath();
    ctx.arc(segment.x + tileSize / 2, segment.y + tileSize / 2, tileSize / 2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.stroke();
}

ctx.fillStyle = "blue";
for (const obstacle of obstacles) {
  ctx.beginPath();
  ctx.arc(obstacle.x + tileSize / 2, obstacle.y + tileSize / 2, tileSize / 2, 0, 2 * Math.PI);
  ctx.fill();
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;
  ctx.stroke();
}

  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(food.x + tileSize / 2, food.y + tileSize / 2, tileSize / 2, 0, 2 * Math.PI);
  ctx.fill();
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;
  ctx.stroke();

  requestAnimationFrame(drawGame);
}

function changeDirection(event) {
  if (event.key === "ArrowUp" && direction.y === 0) {
    direction = { x: 0, y: -1 };
  } else if (event.key === "ArrowDown" && direction.y === 0) {
    direction = { x: 0, y: 1 };
  } else if (event.key === "ArrowLeft" && direction.x === 0) {
    direction = { x: -1, y: 0 };
  } else if (event.key === "ArrowRight" && direction.x === 0) {
    direction = { x: 1, y: 0 };
  }
}

document.addEventListener("keydown", changeDirection);
createFood();
createObstacles();
updateGame();
drawGame();