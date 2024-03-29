score = 0;
cross = true;

audiogo=new Audio('start.mp3')
audioend=new Audio('end.mp3')
setTimeout(() => {
    audiogo.play()
}, 500);
document.onkeydown = function (e) {
    //onkeydown means when a button is pressed on keyboard
    console.log(e.key)
    //e.keyCode is deprecated and is not used anymore
    if (e.key == 'ArrowUp') {
        const dino = document.querySelector('.dino'); //query selector selects first element that has class dino
        dino.classList.add('animateDino');
        setTimeout(() => {
            dino.classList.remove('animateDino');
        }, 1000);
    }
    if (e.key == 'ArrowRight') {
        const dino = document.querySelector('.dino');
        const dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dx + 120 + "px";
    }
    if (e.key == 'ArrowLeft') {
        const dino = document.querySelector('.dino');
        const dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dx - 120 + "px";
    }
}
setInterval(() => {
    const dino = document.querySelector('.dino');
    const gameOver = document.querySelector('.gameOver');
    const obstacle = document.querySelector('.obstacle');
    //dx and dy will come in px if not parsed int
    const dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    const dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));
    const ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    const oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    const offsetX = Math.abs(dx - ox);
    const offsetY = Math.abs(dy - oy);

    if (offsetX < 80 && offsetY < 1) {
        gameOver.innerText = 'Game Over';
        obstacle.classList.remove('obstacleAni')
        score = 0;
        audioend.play();
        const dino=document.querySelector('.dino');
        dino.style.display = 'none';

    }
    else if (offsetX < 130 && cross) {
        score = score + 1;
        updateScore(score);
        cross = false;

        setTimeout(() => {
            cross = true
        }, 1000)
        setTimeout(() => {
            anidur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            anidur = anidur - 0.1;
            obstacle.style.animationDuration = anidur + 's';
            console.log(anidur);

        }, 500)
    }
}, 100);
function updateScore() {
    scoreCont.innerText = "Your Score: " + score;
}
