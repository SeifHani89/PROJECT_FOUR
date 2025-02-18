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
    if (yourName === null || yourName === "") {
        document.querySelector(".name span").innerHTML = "Unknown"
    } else {
        document.querySelector(".name span").innerHTML =  yourName;
    }
    document.querySelector(".start-game").remove()
}

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
        numOfTries.innerHTML = parseInt(numOfTries.innerHTML) + 1

        setTimeout(() => {
            firstBlock.classList.remove("flipped")
            secondBlock.classList.remove("flipped")
            
            // playing fail audio
            document.getElementById("fail").play();
        }, duration);

    }else {
        firstBlock.classList.remove("flipped")
        secondBlock.classList.remove("flipped")

        firstBlock.classList.add("matched")
        secondBlock.classList.add("matched")

        // playing success audio
        document.getElementById("success").play();
        
    }
}

blocksArr.forEach((block) => {
    if (block.classList.contains("matched" === true)){
        document.querySelector(".end-game").style.display = "block"
    }
})