const box = document.querySelectorAll(".box")
const gameInfo = document.querySelector(".game-info")
const button = document.querySelector(".btn")

let currentPlayer;
let gameGrid;

const WinningPosition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function initGame(){
    currentPlayer="X"
    gameGrid = ["","","","","","","","",""]
    button.classList.remove("active")
    gameInfo.innerText =`Current Plater - ${currentPlayer}`
    box.forEach((box)=>{
        box.innerText=""
        box.classList.remove("win")
    })
}
initGame()

function swapTurn(){
    if(currentPlayer === 'X'){
        currentPlayer = 'O'
    }
    else{
        currentPlayer='X'
    }
    gameInfo.innerText = `Current Player - ${currentPlayer}`
}

function checkWin(){
   let ans=""
   WinningPosition.forEach((postion)=>{
    if((gameGrid[postion[0]]!== "" || gameGrid[postion[1]]!=="" || gameGrid[postion[2]]!== "") && (gameGrid[postion[0]]===gameGrid[postion[1]]) &&(gameGrid[postion[1]]===gameGrid[postion[2]])){
        if(gameGrid[postion[0]]==="X"){
            ans="X"
        }
        else{
            ans ="O"
        }
        box.forEach((box)=>{
            box.style.pointerEvents ="none"
        })
        
        box[postion[0]].classList.add("win")
        box[postion[1]].classList.add("win")
        box[postion[2]].classList.add("win")
    }
   })
   if(ans!==""){
    gameInfo.innerText = `Winner player - ${ans}`
    button.classList.add("active")
    
   }
   let count=0
   gameGrid.forEach((box)=>{
    if(box!==""){
        count++;
    }
   })

   if(count===9){
    gameInfo.innerText = "Game Tie"
   }

}

function handleClick(index){
    if(gameGrid[index]===""){
        box[index].innerText=currentPlayer
        gameGrid[index]=currentPlayer
        swapTurn()

        checkWin()
    }
}

box.forEach((box,index) =>{
    box.addEventListener("click",()=>{
        handleClick(index)
    })
})

button.addEventListener("click",initGame)