function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getSimilarColor(baseColor) {
    const hexToRgb = (hex) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    };

    const rgb = hexToRgb(baseColor);
    const varient = Math.floor(Math.random() * 10)+40;
    const varient1=Math.floor(Math.random()*varient);
    const varient2=Math.floor(Math.random()*(varient-varient1));
    const varient3=varient-varient1-varient2;
    const r = Math.max(0, Math.min(255, rgb.r + varient1));
    const g = Math.max(0, Math.min(255, rgb.g + varient2));
    const b = Math.max(0, Math.min(255, rgb.b + varient3));

    return `rgb(${r}, ${g}, ${b})`;
}

function createGrid(rows, cols, baseColor, differentColor, differentCellIndex) {
    const grid = document.getElementById('grid');
    grid.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    grid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

    for (let i = 0; i < rows * cols; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.style.backgroundColor = baseColor;

        if (i === differentCellIndex) {
            cell.style.backgroundColor = differentColor;
        }

        cell.addEventListener('click', () => {
            if (i === differentCellIndex) {
                alert('游戏胜利！');
            } else {
                alert('游戏失败！正确的位置是第 ' + (differentCellIndex % cols + 1) + ' 列，第 ' + Math.floor(differentCellIndex / cols + 1) + ' 行。');
            }
            startGame();
        });
        grid.appendChild(cell);
    }
}

function startGame() {
    document.getElementById('grid').innerHTML = '';
    const rows = Math.floor(Math.random() * 4) + 7;
    const cols = Math.floor(Math.random() * 14) + 9;
    const baseColor = getRandomColor();
    const differentColor = getSimilarColor(baseColor);
    const differentCellIndex = Math.floor(Math.random() * (rows * cols));
    createGrid(rows, cols, baseColor, differentColor, differentCellIndex);
}
const startBtn = document.getElementById('btn');
const returnBtn = document.getElementById('return');

startBtn.addEventListener('click', startGame);
returnBtn.addEventListener('click', () => {
    window.location.href = '../index.html';
});