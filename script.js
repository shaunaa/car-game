const score = document.querySelector(".score");
const gameBeginning = document.querySelector(".gameBeginning");
const gameZone = document.querySelector(".gameZone");
let player = {
    speed: 5,
    score:0
};
let keys = {
    ArrowUp: false
    , ArrowDown: false
    , ArrowRight: false
    , ArrowLeft: false
};
gameBeginning.addEventListener("click", start);
document.addEventListener("keydown", pressOn);
document.addEventListener("keyup", pressOff);

function moveRoadLines(){
    let lines = document.querySelectorAll('.line')
    lines.forEach(function(item){
        if(item.y>1500){
            item.y-=1500;
        }
        item.y+=player.speed;
        item.style.top=item.y+'px'
    })
}

function hasCrashed(a,b){
    let aRect = a.getBoundingClientRect();
    let bRect = b.getBoundingClientRect();

    return !(
        (aRect.bottom < bRect.top) || 
        (aRect.top > bRect.bottom) ||
        (aRect.right < bRect.left) ||
        (aRect.left > bRect.right)
    )
}

function moveEnemy(car){
    let ele = document.querySelectorAll('.enemy')
    ele.forEach(function(item){
        if(hasCrashed(car,item)){
                console.log('hit')
                endGame()
            }
        if(item.y>1500){
            item.y=-600;
            item.style.left=Math.floor(Math.random()*150)+'px';
            item.style.backgroundColor=randomColor();
        }
        item.y+=player.speed;
        item.style.top=item.y+'px'
    })
}

function playGame() {
    console.log("inplay");
    let car = document.querySelector(".car");
    moveRoadLines();
    moveEnemy(car);
    let road = gameZone.getBoundingClientRect();
    if (player.start) {
        if (keys.ArrowUp && player.y>road.top) {
            player.y -= player.speed;
        }
        if (keys.ArrowDown && player.y<road.bottom) {
            player.y += player.speed;
        }
        if (keys.ArrowLeft && player.x>0) {
            player.x -= player.speed;
        }
        if (keys.ArrowRight && player.x<(road.width-50)) {
            player.x += player.speed;
        }
        car.style.left = player.x + 'px';
        car.style.top = player.y + 'px';
        window.requestAnimationFrame(playGame);
        player.score++;
        score.innerHTML='Score: '+player.score
    }
}

function randomColor(){
    function colorize(){
        let hex = Math.floor(Math.random()*256).toString(16);
        return ('0'+String(hex)).substr(-2);
    }
    return '#'+colorize()+colorize()+colorize();
}

function pressOn(e) {
    e.preventDefault();
    keys[e.key] = true;
}

function pressOff(e) {
    e.preventDefault();
    keys[e.key] = false;
}

function endGame(){
    player.start=false;
    score.innerHTML='Game Over <br>Score: '+player.score;
    gameBeginning.classList.remove('hide');
}

function start() {
    gameBeginning.classList.add("hide");
    //gameZone.classList.remove("hide");
    gameZone.innerHTML='';
    player.start = true;
    player.score = 0;
    for(let x=0;x<10;x++){
        let div=document.createElement('div')
        div.classList.add('line')
        div.y=x*150
        div.style.top=(x*150)+'px'
        gameZone.appendChild(div)
    }
    window.requestAnimationFrame(playGame);
    let car = document.createElement("div");
    car.setAttribute("class", "car");
    gameZone.appendChild(car);
    player.x = car.offsetLeft;
    player.y = car.offsetTop;
    for(let x=0;x<3;x++){
        let enemy=document.createElement('div')
        enemy.classList.add('enemy')
        enemy.innerHTML='<br>'+(x+1)
        enemy.y=-((x+1)*600)*-1
        enemy.style.top=enemy.y+'px'
        enemy.style.left=Math.floor(Math.random()*150)+'px';
        enemy.style.backgroundColor=randomColor();
        gameZone.appendChild(enemy)
    }
}