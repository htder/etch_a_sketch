const initialGridSize = 10;

const resetButton = document.querySelector('.reset');
const gridContainer = document.querySelector('.grid-container');
const topInfo = document.querySelector('.info');
const slider = document.querySelector('.slider');
const sliderDisplayValue = document.querySelector('.slider-value');
const root = document.getElementsByTagName('html')[0];
const show = document.querySelector('.show');

function createCells(container, columns, rows, widthOfCell) {
  const total = columns * Math.ceil(rows);
  for (let i = 0; i < total; i += 1) {
    const gridCell = document.createElement('div');
    gridCell.classList = 'cell colorCell0';
    gridCell.style.width = widthOfCell;
    gridCell.style.height = widthOfCell;
    container.appendChild(gridCell);
  }
}

function setMaxSlider() {
  const windowWidth = document.documentElement.getBoundingClientRect().width;
  if (windowWidth < 400) {
    slider.setAttribute('max', 25);
  } else if (windowWidth < 850) {
    slider.setAttribute('max', 50);
  } else {
    slider.setAttribute('max', 75);
  }
}

function getPadding(windowWidth) {
  if (windowWidth > 1300) {
    return 90;
  }
  return 20;
}

function setGridContainerDimensions() {
  const rootFontSize = window
    .getComputedStyle(root)
    .getPropertyValue('font-size')
    .split('px');
  const windowHeight = document.documentElement.getBoundingClientRect().height;
  const windowWidth = document.documentElement.getBoundingClientRect().width;
  const headerHeight = topInfo.offsetHeight;
  const padding = getPadding(windowWidth);
  if (padding > 20) {
    gridContainer.style.width = `${1300}px`;
    gridContainer.style.height = gridContainer.style.width;
  } else {
    gridContainer.style.height = `${
      windowHeight - headerHeight - 1 * rootFontSize[0] - padding
    }px`;
    gridContainer.style.width = `${
      windowWidth - 1 * rootFontSize[0] - padding
    }px`;
  }
}

function createGrid(gridSize) {
  setMaxSlider();
  setGridContainerDimensions();

  const gridHeight = gridContainer.offsetHeight;
  const gridWidth = gridContainer.offsetWidth;
  const widthOfCell = gridWidth / gridSize;
  const columns = gridSize;
  const rows = gridHeight / widthOfCell;

  createCells(gridContainer, columns, rows, widthOfCell);

  gridContainer.style.gridTemplateRows = `repeat(${rows}, ${widthOfCell}px`;
  gridContainer.style.gridTemplateColumns = `repeat(${columns}, ${widthOfCell}px`;
  cellsActiveListener();
}

function removeGrid() {
  while (gridContainer.firstChild) {
    gridContainer.removeChild(gridContainer.lastChild);
  }
}

function clearGrid() {
  const cells = Array.from(document.querySelectorAll('.cell'));
  cells.forEach((cell) => {
    const color = cell.classList[1];
    cell.classList.remove(color);
  });
}

let previousCell;
function cellOn() {
  const currentStyleValue = +/\d+/.exec(this.classList[1]);
  if (currentStyleValue === 4) return;
  this.classList.remove(`colorCell${currentStyleValue}`);
  this.classList.add(`colorCell${currentStyleValue + 1}`);
  previousCell = this;
}

function touchDown(event) {
  event.preventDefault();
  const currentStyleValue = +/\d+/.exec(this.classList[1]);
  if (currentStyleValue === 4) return;
  this.classList.remove(`colorCell${currentStyleValue}`);
  this.classList.add(`colorCell${currentStyleValue + 1}`);
  previousCell = this;
}

function touchMove(event) {
  event.preventDefault();
  const target = document.elementFromPoint(
    event.changedTouches[0].clientX,
    event.changedTouches[0].clientY
  );
  if (target.classList.contains('cell') && target !== previousCell) {
    const currentStyleValue = +/\d+/.exec(target.classList[1]);
    if (currentStyleValue === 4) return;
    target.classList.remove(`colorCell${currentStyleValue}`);
    target.classList.add(`colorCell${currentStyleValue + 1}`);
    previousCell = target;
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

createGrid(initialGridSize);

slider.addEventListener('mouseup', () => {
  removeGrid();
  createGrid(slider.value);
});

slider.addEventListener('touchend', () => {
  removeGrid();
  createGrid(slider.value);
});

slider.addEventListener('input', () => {
  sliderDisplayValue.textContent = `Grid Width: ${slider.value}`;
});

resetButton.addEventListener('click', () => {
  clearGrid();
});
