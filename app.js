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
  console.log('Total Height: ' + windowHeight);
  const headerHeight = topInfo.offsetHeight;
  console.log('Header Height: ' + headerHeight);
  gridContainer.style.height = `${
    windowHeight - headerHeight - 1 * rootFontSize[0]
  }px`;
  const gridHeight = gridContainer.offsetHeight;
  console.log('Grid Height: ' + gridHeight);
  gridContainer.style.width = `${windowWidth - 1 * rootFontSize[0]}px`;
  const gridWidth = gridContainer.offsetWidth;
  console.log('Grid Width: ' + gridWidth);

  // The width of a single cell -> width of container / number of cells
  const widthOfCell = gridWidth / gridSize;
  console.log(widthOfCell + 'px');

  const columns = gridSize;
  const rows = gridHeight / widthOfCell;
  // const rows = Math.ceil(gridHeight / widthOfCell);
  console.log(rows + ' x ' + columns);
  // const div = gridContainer.getBoundingClientRect();
  // const gridContainerWidth = div.width;
  // const gridContainerHeight = div.height;
  // gridContainer.style.height = `${gridContainerHeight}px`;
  // console.log('Width: ' + gridContainerWidth);

  // const gridCellDim = gridContainerWidth / gridSize;
  // const numberOfRows = gridContainerHeight / gridSize;
  // console.log(gridSize, numberOfRows);
  // console.log(gridCellDim);
  // console.log(gridSize * numberOfRows);

  console.log(columns * Math.ceil(rows));
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

  // console.log(gridContainerWidth, gridContainerHeight);
  // const screenWidth = window.screen.availWidth;
  // const screenHeight = window.screen.availHeight;
  // const gridCellDimension = `${screenWidth / gridSize}px`;
  // console.log('Height: ' + screenHeight);
  // console.log('Width: ' + screenWidth);
  // console.log(gridCellDimension);
  // for (let i = 0; i < gridSize * gridSize; i += 1) {
  //   const gridCell = document.createElement('div');
  //   gridCell.classList.add('cell');
  //   gridCell.style.width = gridCellDimension;
  //   gridCell.style.height = gridCellDimension;
  //   gridCell.style.border = '1px solid black';
  //   gridContainer.appendChild(gridCell);
  // }
  // gridContainer.style.gridTemplateRows = `repeat(${gridSize}, ${gridCellDimension}`;
  // gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, ${gridCellDimension}`;
  // cellsActiveListener();
}

function removeGrid() {
  while (gridContainer.firstChild) {
    gridContainer.removeChild(gridContainer.lastChild);
  }
}

createGrid(initialGridSize);

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
