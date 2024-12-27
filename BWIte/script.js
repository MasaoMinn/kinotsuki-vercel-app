const leftGrid = document.getElementById('left-grid');
const rightGrid = document.getElementById('right-grid');
const startBtn = document.getElementById('btn');
const restartBtn = document.getElementById('btn');
const returnBtn = document.getElementById('return');
let leftGridColors = [];
let rightGridColors = [];

startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', restartGame);
returnBtn.addEventListener('click', returnToMain);

function returnToMain() {
    window.location.href = "../index.html";
}
function startGame() {
    leftGridColors = generateRandomGrid();
    rightGridColors = Array(64).fill('white');
    renderGrids();
    restartBtn.disabled = false;
    timerStart();
}

function restartGame() {
    startGame();
}

function generateRandomGrid() {
    const colors = ['white', 'black'];
    // 生成初始网格
    let initialGrid = Array(64).fill('white');
    
    // 随机进行若干次翻转操作
    const numFlips = Math.floor(Math.random() * 10) + 6; // 随机进行6-15次翻转
    for (let i = 0; i < numFlips; i++) {
        const index = Math.floor(Math.random() * 64);
        toggleCellColor(initialGrid, index,false);
    }
    
    return initialGrid;
}

function renderGrids() {
    leftGrid.innerHTML = '';
    rightGrid.innerHTML = '';
    leftGridColors.forEach((color, index) => {
        const cell = document.createElement('div');
        cell.style.backgroundColor = color;
        leftGrid.appendChild(cell);
    });
    rightGridColors.forEach((color, index) => {
        const cell = document.createElement('div');
        cell.style.backgroundColor = color;
        cell.addEventListener('click', () => toggleCellColor(rightGridColors, index,true));
        rightGrid.appendChild(cell);
    });
}

function toggleCellColor(Grid,index,ingame) {
    const row = Math.floor(index / 8);
    const col = index % 8;
    for (let i = row - 1; i <= row + 1; i++) {
        for (let j = col - 1; j <= col + 1; j++) {
            if (i >= 0 && i < 8 && j >= 0 && j < 8 &&(row+col-i-j<2)&&(row+col-i-j>-2)&&(row+col-i-j!=0||i==row)) {
                const cellIndex = i * 8 + j;
                Grid[cellIndex] = Grid[cellIndex] === 'white'? 'black' : 'white';
            }
        }
    }
    renderGrids();
    setTimeout(() => {
        checkWin();
    }, 3000);
}

let timerInterval;
let startTime;

function startGame() {
    leftGridColors = generateRandomGrid();
    rightGridColors = Array(64).fill('white');
    renderGrids();
    restartBtn.disabled = false;
    timerStart();
}

function timerStart() {
    // 移除之前的计时器
    clearInterval(timerInterval);
    const timerElement = document.getElementById('timer');
    if (timerElement) {
        timerElement.remove();
    }

    // 创建新的计时器元素
    let timer = document.createElement('div');
    timer.id = 'timer';
    timer.className = 'timer'; // 添加类名以便样式化
    document.body.appendChild(timer);

    // 记录开始时间
    startTime = new Date().getTime();

    // 启动计时器
    timerInterval = setInterval(() => {
        const currentTime = new Date().getTime();
        const elapsedMilliseconds = currentTime - startTime;
        const formattedTime = formatTime(elapsedMilliseconds);
        timer.innerHTML = formattedTime;
    }, 10); // 每10毫秒更新一次
}

function formatTime(milliseconds) {
    const minutes = Math.floor(milliseconds / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
    const millisecondsPart = milliseconds % 1000;
    return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}.${millisecondsPart}`;
}
function checkWin() {
    if (leftGridColors.toString() === rightGridColors.toString()) {
        alert('游戏胜利！ 用时' + formatTime(new Date().getTime() - startTime) + '秒。');
        
        // 停止计时器
        clearInterval(timerInterval);
        const timerElement = document.getElementById('timer');
        if (timerElement) {
            timerElement.remove();
        }

        startGame();
    }
}
