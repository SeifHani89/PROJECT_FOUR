// another solution

// let startbutton =  document.querySelector(".start");
// startbutton.addEventListener("click", function() {
//     let startForm = document.querySelector("form")
//     startForm.style.display = "block"
//     startForm.onsubmit = function() {
//         window.localStorage.setItem("name", startForm.children[0].value)
//     }
// })
// let nameSpan = document.querySelector(".name span")
// nameSpan.innerHTML = window.localStorage.getItem("name")

// if(nameSpan.innerHTML !== "") {
//     document.querySelector(".start-game").style.display = "none"
// }

document.querySelector(".start-game .start").onclick = function() {
    let yourName =  prompt("What's Your Name");
    window.localStorage.setItem("name", yourName)
    if (yourName === null || yourName === "") {
        document.querySelector(".name span").innerHTML = "Unknown"
    } else {
        document.querySelector(".name span").innerHTML = window.localStorage.getItem("name");
    }
    document.querySelector(".start-game").remove()
}

// ==========================================

// choosing avatar
let myAvatar = document.querySelector(".avatar")
let avatarBox = document.querySelector(".choose-avatar")
myAvatar.addEventListener("click", function(){
    avatarBox.style.display = "block"
    const avatrImgs = document.querySelectorAll(".choose-avatar img")
    const avatrImgsArr = Array.from(avatrImgs)
    avatrImgsArr.forEach((img) => {
        img.onclick = function() {
            myAvatar.children[0].remove()
            myAvatar.append(img)
            avatarBox.remove();
            myAvatar.style.pointerEvents = "none"
        }
    })
})

// ==========================================

let cardFront = document.querySelectorAll(".front");
cardFront.forEach(function(card) {
    card.innerHTML = '?'
})

// ==========================================

let duration = 1000;

let blocks = document.querySelectorAll(".game-space .box");

let blocksArr = Array.from(blocks);

let blocksArrKeys = [...Array(blocksArr.length).keys()]

function shuffle(array) {
    let currentIndex = array.length;

// While there remain elements to shuffle...
while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    
    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
    array[randomIndex], array[currentIndex]];
}
}
shuffle(blocksArrKeys);

blocks.forEach((block, index) => {
    block.style.order = blocksArrKeys[index];

    // flip block when clicked
    block.addEventListener("click", function() {
        flippBlocks(block);
    })
})
// function for flipping blocks
function flippBlocks(targetBlock) {
    // add class for flipping
    targetBlock.classList.add("flipped")
    // collecting every two flipped blocks
    let allFlippedBlocks = blocksArr.filter(block => block.classList.contains("flipped"))
    if (allFlippedBlocks.length === 2) {
        // stop clicking
        stopClicking();
        // matching blocks
        checkMatchBlocks(allFlippedBlocks[0], allFlippedBlocks[1])
    }
}
// stop Clicking function
function stopClicking() { 
    let blocksContainer = document.querySelector(".game-space");
    blocksContainer.classList.add("no-clicking")
    setTimeout(() => {
        blocksContainer.classList.remove("no-clicking")
    }, duration);
}

// ==========================================

// Game Logic [Match Block Function]
function checkMatchBlocks(firstBlock, secondBlock) {
    // determining number of tries
    const numOfTries = document.querySelector(".tries span")
    if(firstBlock.innerHTML !== secondBlock.innerHTML)  {
        numOfTries.innerHTML = parseInt(numOfTries.innerHTML) - 1
        
        // failing message 
        setTimeout(() => {
            if (numOfTries.innerHTML === "0") {
                let myMsg = document.querySelector("div");
                myMsg.classList.add("msg", "failing")

                myMsg.innerHTML = `<div class="icon"><i class="fa-solid fa-xmark"></i></div><span>Sorry! Your Tries Is Finished</span><button onclick="location.reload()">Play Again</button>`;
                document.body.append(myMsg)
            }
        }, 500);
        
        setTimeout(() => {
            firstBlock.classList.remove("flipped")
            secondBlock.classList.remove("flipped")
        }, duration);

    }else {
        firstBlock.classList.remove("flipped")
        secondBlock.classList.remove("flipped")

        firstBlock.classList.add("matched")
        secondBlock.classList.add("matched")

        // playing success audio
        document.getElementById("success").play();

        setTimeout(() => {
            if (blocksArr.every(block => block.classList.contains("matched"))) {
            let myMsg = document.createElement("div");
            myMsg.classList.add("msg", "fail")
            myMsg.innerHTML = `<div class="icon"><i class="fa-solid fa-check"></i></div><span>Congrats! You Won</span><button onclick="location.reload()">Play Again</button>`;
            }
        }, 500);
    }
}


blocksArr.forEach((block) => {
    if (block.classList.contains("matched" === true)){
        document.querySelector(".end-game").style.display = "block"
    }
})