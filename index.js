var previous = -1;
let inputCanvas, outputContainer, statusMsg, transferBtn, detailedBtn, undetailedBtn, sampleIndex = 0,
    modelReady = false,
    isTransfering = false;
var mobile = false;
var lastx = 0;
var lasty = 0;
var PixFace;

const SIZE = 256,
    sampleNum = 17;

function setup() {
    // Create thecanvas
    inputCanvas = createCanvas(SIZE, SIZE);
    inputCanvas.class('inputCanv').parent('canvasContainer');


    // define containers
    outputContainer = select('#output');
    statusMsg = select('#status');
    transferBtn = select('#transferBtn').hide();
    detailedBtn = select('#detailedButton').hide();
    undetailedBtn = select('#undetailedButton').show();

    // Display initial placeholder image
    loadImage('./images/input.png', inputImg => image(inputImg, 0, 0));
    let out = createImg('./images/input.png');
    outputContainer.html('');
    out.class('outputCanv').parent('output');

    // stroke color to black
    stroke(0);
    pixelDensity(1);

    //change the displayed model, if the website is viewed on mobile
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        mobile = true;
        undetailedBtn.hide();
        detailedBtn.show();
        PixFace = pix2pix('./model/PixFaceLightLight.pict', onModelLoad);
    } else {
        mobile = false;
        PixFace = pix2pix('./model/PixFace.pict', onModelLoad);
    }

    document.getElementById("lotxt").innerHTML = "";
}

// Draw on the canvas when mouse is pressed
function draw() {
    if (mouseIsPressed) {
        if (!mobile) {
            strokeWeight(7);
            line(mouseX, mouseY, pmouseX, pmouseY);
        }
    }
}


//change between the 3 GAN models
function loadDetailed() {
    hideButton();
    PixFace = pix2pix('./model/PixFace.pict', onModelLoad);
    undetailedBtn.show();
    detailedBtn.hide();
}

function loadCheap() {
    hideButton();
    PixFace = pix2pix('./model/PixFaceLightLight.pict', onModelLoad);
    undetailedBtn.hide();
    detailedBtn.show();
}

function hideButton() {
    transferBtn.hide();
    statusMsg.html('loading..');
}


//prepare for the image transfer
function loadIm() {
    if (!isTransfering) {
        document.getElementById("lotxt").innerHTML = "GENERATING..";
        setTimeout('transfer();', 300);
        isTransfering = true;
        transferBtn.hide();
        statusMsg.html('loading..');
    }
}

//transfer the image to pix2pix
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

function onModelLoad() {
    if (!statusMsg) statusMsg = select('#status');
    statusMsg.html('--ready--');
    transferBtn.show();
    modelReady = true;
}

// Clear the canvas
function clearCanvas() {
    background(255);
}

//load a random sample image
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

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

//functions for drawing on mobile
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