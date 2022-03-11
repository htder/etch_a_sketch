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
    gridCell.classList.add('cell');
    gridCell.style.width = gridCellDimension;
    gridCell.style.height = gridCellDimension;
    gridCell.style.border = '1px solid black';
    gridContainer.appendChild(gridCell);
  }
  gridContainer.style.gridTemplateRows = `repeat(${gridSize}, ${gridCellDimension}`;
  gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, ${gridCellDimension}`;
  cellsActiveListener();
}

createGrid(initialGridSize);

function cellOn() {
  this.style.backgroundColor = 'black';
}

function touchDown() {
  event.preventDefault();
  this.style.backgroundColor = 'black';
}

function touchMove() {
  event.preventDefault();
  const target = document.elementFromPoint(
    event.changedTouches[0].clientX,
    event.changedTouches[0].clientY
  );
  target.style.backgroundColor = 'black';
}

function cellsActiveListener() {
  const cells = Array.from(document.querySelectorAll('.cell'));
  cells.forEach((cell) => {
    cell.addEventListener('mouseenter', cellOn);
    cell.addEventListener('touchstart', touchDown);
    cell.addEventListener('touchmove', touchMove);
  });
}

resetButton.addEventListener('click', () => {
  const cells = Array.from(document.querySelectorAll('.cell'));
  cells.forEach((cell) => {
    cell.removeEventListener('mouseenter', cellOn);
  });
});
