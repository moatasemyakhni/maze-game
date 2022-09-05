window.addEventListener("load", () => {
    var TIMER_BOUND = 60 // how much time to give for timer
    var WINNING_POINTS = 5
    var LOSING_POINTS = 10
    var countDown = TIMER_BOUND //starting point
    var score = 0
    var is_winning = false
    var is_cheating = false
    var game = document.getElementById("game")
    var start = document.getElementById("start")
    var end = document.getElementById("end")
    var stat = document.getElementById("status")
    var boundaries = document.getElementsByClassName("boundary")
    var scoreBoard = document.getElementsByClassName("example")[0]
    var timerBoard = document.getElementsByTagName("p")[0]
    var timer
    var timerOn = true
    var h1 = document.getElementsByTagName("h1")[0]
    var user = prompt("userName: ")
    if(localStorage.getItem(user)) {
        score = parseInt(localStorage.getItem(user))
    }else {
        localStorage.setItem(user, score.toString())
    }
    

    h1.innerHTML = "Welcome " + user.toUpperCase()
    scoreBoard.innerText = "Score = " + score
    
    // once we enter the game box, leaving will be considered cheating
    game.addEventListener("mouseleave", () => {
        is_cheating = true
    })
    
    //click start will reset the score
    start.addEventListener("click", () => {
        score = 0
        scoreBoard.innerText = "Score = " + score
    })
    
    // hovering on start is considered as another try
    start.addEventListener("mouseover", () => {
        is_winning = true
        is_cheating = false
        boundariesColor("#eeeeee")
        stat.innerText = "Begin by moving your mouse over the \"S\"."
        if(timerOn) {
            timer = setInterval(decrementTime, 1000)
            timerOn = false //to avoid calling timer multiple times
        }
    })
    
    for(var i = 0; i < boundaries.length; i++) { 
        boundaries[i].addEventListener('mouseover', () => {
            // to avoid multiple losses in one game
            if(is_winning) { 
                boundariesColor("red")
                is_winning = false
                score -= LOSING_POINTS
                localStorage.setItem(user, score.toString())
                stat.innerText = "You Lost!"
                scoreBoard.innerText = "Score = " + score
                countDown = TIMER_BOUND
                clearInterval(timer)
                timerOn = true
            }
        })  
    }

    end.addEventListener("mouseover", () => {
        if(is_winning) {
            if(is_cheating) {
                boundariesColor("lightblue")
                stat.innerText = "No Cheating :)"
            }else {
                score += WINNING_POINTS
                localStorage.setItem(user, score.toString())
                stat.innerText = "You Won!"
                boundariesColor("lightgreen")
                scoreBoard.innerText = "Score = " + score
            }
        }
        countDown = TIMER_BOUND
        clearInterval(timer)
        timerOn = true
        //to avoid multiple winning in one game
        is_winning = false
    })
    
    
    scoreBoard.style.paddingLeft = "10px"
    function boundariesColor(color) {
        for(var i = 0; i < boundaries.length; i++) {
            boundaries[i].style.backgroundColor = color
        }
    }

    function decrementTime() {
        if(countDown <= TIMER_BOUND) {
            timerBoard.innerHTML = ("timer = " + countDown)
        }

        if(countDown > 0) {
            countDown--
        }else {
            clearInterval(timer)
            countDown = TIMER_BOUND
            timerOn = true
            score -= LOSING_POINTS
            localStorage.setItem(user, score.toString())
            is_winning = false
            stat.innerHTML = "Times out! You Lost"
            scoreBoard.innerText = "Score = " + score
        }
    }
    
})