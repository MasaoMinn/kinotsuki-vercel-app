// Combo system variables
let comboCount = 0;
let comboTexts = [
    "", // 0 combo
    "Good!", // 5 combo
    "Nice!", // 10 combo
    "Great!", // 16 combo
    "Excellent!", // 25 combo
    "Amazing!", // 35 combo
    "Exemplary!", // 49 combo
    "Incredible!", // 64 combo
    "Fantastic!", // 81 combo
    "Outstanding!", // 100 combo
    "Legendary!", // 121 combo
    "You Are Killing It!", // 144 combo
    "OH MY GOD! GODLIKE!" // 200+ combo
];

function updateComboDisplay() {
    const comboCountElement = document.getElementById('combo-count');
    const comboTextElement = document.getElementById('combo-text');
    
    // Update combo count
    comboCountElement.textContent = comboCount;
    
    // Determine combo level and text based on thresholds
    let level = 0;
    let text = "";
    
    if (comboCount >= 200) {
        level = 10;
        text = comboTexts[11]; // "OH MY GOD! GODLIKE!"
    } else if (comboCount >= 144) {
        level = 9;
        text = comboTexts[10]; // "You Are Killing It!"
    } else if (comboCount >= 121) {
        level = 8;
        text = comboTexts[9]; // "Legendary!"
    } else if (comboCount >= 100) {
        level = 7;
        text = comboTexts[8]; // "Outstanding!"
    } else if (comboCount >= 81) {
        level = 6;
        text = comboTexts[7]; // "Fantastic!"
    } else if (comboCount >= 64) {
        level = 5;
        text = comboTexts[6]; // "Incredible!"
    } else if (comboCount >= 49) {
        level = 4;
        text = comboTexts[5]; // "Exemplary!"
    } else if (comboCount >= 35) {
        level = 3;
        text = comboTexts[4]; // "Amazing!"
    } else if (comboCount >= 25) {
        level = 2;
        text = comboTexts[3]; // "Excellent!"
    } else if (comboCount >= 16) {
        level = 1;
        text = comboTexts[2]; // "Great!"
    } else if (comboCount >= 10) {
        level = 1;
        text = comboTexts[1]; // "Nice!"
    } else if (comboCount >= 5) {
        level = 1;
        text = comboTexts[0]; // "Good!"
    }
    
    // Remove all existing level classes
    comboCountElement.className = 'combo-count';
    comboTextElement.className = 'combo-text';
    
    // Add appropriate level classes
    if (level > 0) {
        comboCountElement.classList.add(`combo-level-${level}`);
        comboTextElement.classList.add(`combo-text-level-${level}`);
        comboTextElement.textContent = text;
    } else {
        comboTextElement.textContent = '';
    }
    
    // Add animation for combo increase
    if (comboCount > 0) {
        comboCountElement.classList.add('combo-animation');
        setTimeout(() => {
            comboCountElement.classList.remove('combo-animation');
        }, 500);
    }
}

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
                // Correct cell clicked - increment combo
                comboCount++;
                updateComboDisplay();
            } else {
                // Wrong cell clicked - reset combo and show failure message
                comboCount = 0;
                updateComboDisplay();
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
    
    // Initialize combo display
    updateComboDisplay();
}
const startBtn = document.getElementById('btn');
const returnBtn = document.getElementById('return');

startBtn.addEventListener('click', startGame);
returnBtn.addEventListener('click', () => {
    window.location.href = '../';
});

// Initialize combo display when page loads
document.addEventListener('DOMContentLoaded', () => {
    updateComboDisplay();
});