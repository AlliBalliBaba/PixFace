const SIZE = 256,
    sampleNum = 17;
var previous = -1;
let inputCanvas, outputContainer, statusMsg, transferBtn, detailedBtn, undetailedBtn, sampleIndex = 0,
    modelReady = false,
    isTransfering = false;
var mobile = false;

var lastx = 0;
var lasty = 0;

var PixFace;


function setup() {
    // Create thecanvas
    inputCanvas = createCanvas(SIZE, SIZE);
    inputCanvas.class('inputCanv').parent('canvasContainer');


    // define containers
    outputContainer = select('#output');
    statusMsg = select('#status');
    transferBtn = select('#transferBtn').hide();
    detailedBtn = select('#detailedButton').show();
    undetailedBtn = select('#undetailedButton').hide();

    // Display initial images
    loadImage('./images/input.png', inputImg => image(inputImg, 0, 0));

    let out = createImg('./images/input.png');
    outputContainer.html('');
    out.class('outputCanv').parent('output');


    // black stoke
    stroke(0);
    pixelDensity(1);

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        mobile = true;
        document.getElementById("detailedButton").innerHTML = "load detailed mobile model (longer generation time)";
        document.getElementById("undetailedButton").innerHTML = "load cheap mobile model (shorter generation time)";
        document.getElementById("detailedButton").onclick = loadCheap2;
        document.getElementById("undetailedButton").onclick = loadVeryCheap;
        PixFace = pix2pix('./model/PixFaceLightLight.pict', modelLoaded);
    } else {
        mobile = false;
        PixFace = pix2pix('./model/PixFace.pict', modelLoaded)
    }

    document.getElementById("lotxt").innerHTML = "";
}

// Draw on the canvas when mouse is pressed
function draw() {
    if (mouseIsPressed) {
        if (!mobile) {
            strokeWeight(8);
            line(mouseX, mouseY, pmouseX, pmouseY);
        }
    }
}

function loadDetailed() {
    transferBtn.hide();
    statusMsg.html('loading...');
    PixFace = pix2pix('./model/PixFaceHeavy.pict', modelLoaded);
    undetailedBtn.show();
    detailedBtn.hide();
}

function loadCheap() {
    transferBtn.hide();
    statusMsg.html('loading...');
    PixFace = pix2pix('./model/PixFace.pict', modelLoaded);
    undetailedBtn.hide();
    detailedBtn.show();
}

function loadCheap2() {
    transferBtn.hide();
    statusMsg.html('loading...');
    PixFace = pix2pix('./model/PixFace.pict', modelLoaded);
    undetailedBtn.show();
    detailedBtn.hide();
}

function loadVeryCheap() {
    transferBtn.hide();
    statusMsg.html('loading...');
    PixFace = pix2pix('./model/PixFaceLightLight.pict', modelLoaded);
    undetailedBtn.hide();
    detailedBtn.show();
}


function loadIm() {
    if (!isTransfering) {
        document.getElementById("lotxt").innerHTML = "GENERATING..";

        setTimeout('transfer();', 600);
        isTransfering = true;
        transferBtn.hide();
        statusMsg.html('loading....');
    }
}


function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


function transfer() {
    isTransfering = true;

    let canvasElement = document.getElementById('defaultCanvas0');
    // pix2pix transformation
    PixFace.transfer(canvasElement, result => {
        // Clear container
        outputContainer.html('');
        // Create output image 
        createImg(result.src).class('outputCanv').parent('output');
        statusMsg.html('--ready--');
        isTransfering = false;
        transferBtn.show();
        document.getElementById("lotxt").innerHTML = "";
    });

}

// A function to be called when the models have loaded
function modelLoaded() {
    if (!statusMsg) statusMsg = select('#status');
    statusMsg.html('--ready--');
    transferBtn.show();
    modelReady = true;
}

// Clear the canvas
function clearCanvas() {
    background(255);
}

function getRandomOutput() {
    num = getRndInteger(1, sampleNum + 1);
    if (num == previous) {
        num++;
        if (num > sampleNum) {
            num = 0;
        }
    }
    thisDirectory = './images/input' + num + '.png';
    loadImage(thisDirectory, inputImg => image(inputImg, 0, 0));
    previous = num;
}


function touchStarted() {
    strokeWeight(8);
    lastx = mouseX;
    lasty = mouseY;
}

function touchMoved() {
    if (mobile) {
        strokeWeight(8);
        line(mouseX, mouseY, lastx, lasty);
        lastx = mouseX;
        lasty = mouseY;
    }
}



//}