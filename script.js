// 获取当前时间
// 根据时间更新指针角度
function updateClockHands() {
    const now = new Date();
    const {hours,minutes,seconds}={hours:now.getHours(), minutes:now.getMinutes(), seconds:now.getSeconds()};
    window.document.getElementById("clock-text").innerHTML = now.toLocaleTimeString();// 更新数字时间显示
    // 时针每小时走一大格，一圈360度，共12大格，每大格30度
    // 时针每小时走30度，每分钟走30/60 = 0.5度
    const hourAngle = ((hours % 12) + minutes / 60 + seconds / 3600) * 30+90;

    // 分针每5分钟走一大格，一圈360度，共12大格，每大格30度
    // 分针每分钟走30/5 = 6度
    const minuteAngle = (minutes + seconds / 60) * 6+90;

    // 秒针每秒走一圈的1/60，一圈360度，每秒走6度
    const secondAngle = seconds * 6+90;

    const hourHand = document.querySelector('.hour-hand');
    const minuteHand = document.querySelector('.minute-hand');
    const secondHand = document.querySelector('.second-hand');

    // 设置指针的旋转角度
    hourHand.style.transform = `rotate(${hourAngle}deg)`;
    minuteHand.style.transform = `rotate(${minuteAngle}deg)`;
    secondHand.style.transform = `rotate(${secondAngle}deg)`;
}