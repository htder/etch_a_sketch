const initialGridSize = 16;

const resetButton = document.querySelector('.reset');
const gridContainer = document.querySelector('.grid-container');
const slider = document.querySelector('.slider');
const sliderDisplayValue = document.querySelector('.slider-value');

function createGrid(gridSize) {
  const screenWidth = window.screen.availWidth;
  const gridCellDimension = `${screenWidth / gridSize}px`;
  for (let i = 0; i < gridSize * gridSize; i += 1) {
    const gridCell = document.createElement('div');
    gridCell.style.width = gridCellDimension;
    gridCell.style.height = gridCellDimension;
    gridCell.style.border = '1px solid black';
    gridContainer.appendChild(gridCell);
  }
  gridContainer.style.gridTemplateRows = `repeat(${gridSize}, ${gridCellDimension}`;
  gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, ${gridCellDimension}`;
}

createGrid(initialGridSize);
