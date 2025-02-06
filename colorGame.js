const homePage = document.querySelector('[data-testid= "home-display"]');
const playGame = document.querySelector('[data-testid= "play-game"]');
const scoreDisplay = document.querySelector('[data-testid = "score"');
const target = document.querySelector('[data-testid = "colorBox"]');
const statusDisplay = document.querySelector('[data-testid = "gameStatus"]');
const resetButton = document.querySelector('[data-testid = "newGameButton"]');
const body = document.querySelector('body')
const lifeDisplay = document.querySelector('[data-testid = "life"]')
const options = document.querySelectorAll('[data-testid = "colorOption"]')

let colorCollection = [];
let attempt = 3
let score = 0

//Home page slides off at the click of playgame button
playGame.addEventListener('click', ()=> {
    homePage.classList.add('slide-off')
    reset()
})




let numAlpha = ['0', '1','2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']

// funtion that creates a color 
 let color = ''
const makeCol = ()=>{
    for (let i = 1; i <= 6; i++){
        let randomNum = Math.floor(Math.random()*numAlpha.length)
        color += numAlpha[randomNum]
    }  
    return '#' + `${color}`
}



// Score and number of attempts before game starts
scoreDisplay.innerHTML = score
lifeDisplay.innerHTML = attempt




// Function that displays target color and options
const displayCol = ()=> {
    // clear the previuos colors
    colorCollection = []
    while (colorCollection.length < 6) {
        color = ''
         const useCol = makeCol()
        colorCollection.push(useCol)
    }
    
    // Randomly select target color
    const targetCol = colorCollection[Math.floor(Math.random()*colorCollection.length)]
    target.style.backgroundColor = targetCol
    
    options.forEach((option, ind) => option.style.backgroundColor = colorCollection[ind])
}



/* What happens when a player loses? 
1. 5 points is deducted
2. update status with appropriate message
*/

const loseGame = ()=> {
    if (score >= 5) {
        score -= 5
        scoreDisplay.innerHTML = score
    }else{
        score = 0
        scoreDisplay.value = score
        gameOver()
    }
    attempt--
    lifeDisplay.innerHTML = attempt
    statusDisplay.innerHTML = `<p class="text-light"><span class="text-danger">Incorrect guess! </span>try again</p>`
    statusDisplay.classList.add('status-failed')
    setTimeout(() => {
        statusDisplay.innerHTML = ''
    }, 5000);
}

/* What happens when a player wins? 
1. 10 points is added to score
2. update status with appropriate message
*/

const winGame = ()=> {
    // If life is not full, increase it by one otherwise,
    //
    if (attempt < 3) {
        attempt++
        lifeDisplay.innerHTML = attempt
    }
    score += 10
    scoreDisplay.innerHTML = score
    statusDisplay.innerHTML = `<p class="text-light"><span class="text-success">Awesome! </span>you guessed correctly</p>`
    statusDisplay.classList.add('status-success')
    setTimeout(() => {
        statusDisplay.innerHTML = ''
    }, 4000);
}

// Game functionalities after clicking any of the options
options.forEach((option)=>{
    option.addEventListener('click', (event)=> {
        if (event.target.style.backgroundColor === target.style.backgroundColor){
            winGame()
            displayCol()
        }else if(attempt === 1 && event.target.style.backgroundColor !== target.style.backgroundColor){
            loseGame()
            gameOver()
        }else{
            loseGame()
            displayCol()
        }
    })
})


let div = document.createElement('div')

const gameOver = ()=> {
    options.forEach((option)=> option.disabled)
    let modal = `<div class="bg-info-subtle w-75 h-100 d-flex flex-column justify-content-center align-items-center gap-4 py-5">
    
    <div class="fw-bold fs-1 ">Game Over</div>
    <div class="mt-2 mb-5" >
        <button class="fw-semibold rounded btn btn-primary py-2 px-3" data-testid="newGameButton" onclick="playAgain()">Play again</button>
        <button class="fw-semibold rounded btn btn-success ms-2 py-2 px-3" onclick="endGame()">End game</button>
    </div>
    
    </div>`
    div.style.width = '100%'
    div.style.minWidth = '350px'
    div.style.position = 'absolute'
    div.style.height = '100%'
    div.style.top = '0px'
    div.style.display = 'flex'
    div.style.flexDirection = 'column'
    div.style.justifyContent = 'center'
    div.style.alignItems = 'center'
    div.innerHTML = modal
    body.appendChild(div)
}

// Function to reset gane

const reset = ()=> {
    score = 0
    attempt = 3
    lifeDisplay.innerHTML = attempt
    scoreDisplay.innerHTML = score
    statusDisplay.innerHTML = ''
    displayCol()
}

const playAgain = ()=> {
    div.style.display = 'none'
    reset()
}

const endGame = ()=> {
    div.style.display = 'none'
    homePage.classList.remove('slide-off')
}