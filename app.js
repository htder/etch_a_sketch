const initialGridSize = 10;

const resetButton = document.querySelector('.reset');
const gridContainer = document.querySelector('.grid-container');
const topInfo = document.querySelector('.info');
const slider = document.querySelector('.slider');
const sliderDisplayValue = document.querySelector('.slider-value');
const root = document.getElementsByTagName('html')[0];

function createGrid(gridSize) {
  const rootFontSize = window
    .getComputedStyle(root)
    .getPropertyValue('font-size')
    .split('px');

  const windowHeight = window.screen.availHeight;
  const windowWidth = window.screen.availWidth;
  const headerHeight = topInfo.offsetHeight;
  gridContainer.style.height = `${
    windowHeight - headerHeight - 1 * rootFontSize[0]
  }px`;
  const gridHeight = gridContainer.offsetHeight;
  gridContainer.style.width = `${windowWidth - 1 * rootFontSize[0]}px`;
  const gridWidth = gridContainer.offsetWidth;

  const widthOfCell = gridWidth / gridSize;
  const columns = gridSize;
  const rows = gridHeight / widthOfCell;

  console.log('Total Height: ' + windowHeight);
  console.log('Header Height: ' + headerHeight);
  console.log('Grid Height: ' + gridHeight);
  console.log('Grid Width: ' + gridWidth);
  console.log(rows + ' x ' + columns);

  for (let i = 0; i < columns * Math.ceil(rows); i += 1) {
    const gridCell = document.createElement('div');
    gridCell.classList.add('cell');
    gridCell.style.width = widthOfCell;
    gridCell.style.height = widthOfCell;
    gridCell.style.backgroundColor = 'blue';
    gridContainer.appendChild(gridCell);
  }
  gridContainer.style.gridTemplateRows = `repeat(${rows}, ${widthOfCell}px`;
  gridContainer.style.gridTemplateColumns = `repeat(${columns}, ${widthOfCell}px`;
  cellsActiveListener();
}

createGrid(initialGridSize);

function removeGrid() {
  while (gridContainer.firstChild) {
    gridContainer.removeChild(gridContainer.lastChild);
  }
}

function cellOn() {
  this.style.backgroundColor = 'black';
}

function touchDown(event) {
  event.preventDefault();
  this.style.backgroundColor = 'black';
}

function touchMove(event) {
  event.preventDefault();
  const target = document.elementFromPoint(
    event.changedTouches[0].clientX,
    event.changedTouches[0].clientY
  );
  if (target.classList.contains('cell')) {
    target.style.backgroundColor = 'black';
  }
}

function removeCellEventListener(cells) {
  cells.forEach((cell) => {
    cell.removeEventListener('mouseenter', cellOn);
    cell.removeEventListener('touchstart', touchDown);
    cell.removeEventListener('touchmove', touchMove);
  });
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
  removeCellEventListener(cells);
  removeGrid();
  createGrid(initialGridSize);
});
