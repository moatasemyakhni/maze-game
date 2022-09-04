window.addEventListener("load", () => {
    var score = 0
    var is_winning = false
    var is_cheating = false
    var game = document.getElementById("game")
    var start = document.getElementById("start")
    var end = document.getElementById("end")
    var stat = document.getElementById("status")
    var boundaries = document.getElementsByClassName("boundary")
    var scoreBoard = document.getElementsByClassName("example")
    
    
    // once we enter the game box, leaving will be considered cheating
    game.addEventListener("mouseleave", () => {
        is_cheating = true
    })
    
    //I did not find the reset button so I considered clicking on the start will reset the score
    start.addEventListener("click", () => {
        score = 0
        scoreBoard[0].innerText = "Score = " + score
    })
    
    // hovering on start is considered as another try
    start.addEventListener("mouseover", () => {
        is_winning = true
        is_cheating = false
        boundariesColor("#eeeeee")
        stat.innerText = "Begin by moving your mouse over the \"S\"."
    })
    
    
    for(var i = 0; i < boundaries.length; i++) { 
        boundaries[i].addEventListener('mouseover', () => {
            // to avoid multiple losses in one game
            if(is_winning) { 
                boundariesColor("red")
                is_winning = false
                score -= 10
                stat.innerText = "You Lost!"
                scoreBoard[0].innerText = "Score = " + score
            }
        })  
    }
    
    end.addEventListener("mouseover", () => {
        if(is_winning) {
            if(is_cheating) {
                boundariesColor("lightblue")
                stat.innerText = "No Cheating :)"
            }else {
                score += 5
                stat.innerText = "You Won!"
                scoreBoard[0].innerText = "Score = " + score
                boundariesColor("lightgreen")
            }
        }
        //to avoid multiple winning in one game
        is_winning = false
    })
    
    
    scoreBoard[0].style.paddingLeft = "10px"
    function boundariesColor(color) {
        for(var i = 0; i < boundaries.length; i++) {
            boundaries[i].style.backgroundColor = color
        }
    }
    
})