const SIZE = 256,
    sampleNum = 14;
let inputCanvas, outputContainer, statusMsg, transferBtn, detailedBtn, undetailedBtn, sampleIndex = 0,
    modelReady = false,
    isTransfering = false;
var mobile = false;

var lastx;
var lasty;

var PixFace = pix2pix('./model/PixFace.pict', modelLoaded);


function setup() {
    // Create thecanvas
    inputCanvas = createCanvas(SIZE, SIZE);
    inputCanvas.class('border-box pencil').parent('canvasContainer');


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
    out.class('border-box').parent('output');


    // black stoke
    stroke(0);
    pixelDensity(1);

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        mobile = true;

    } else {
        mobile = false;
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
        createImg(result.src).class('border-box').parent('output');
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
    thisDirectory = './images/input' + num + '.png';
    loadImage(thisDirectory, inputImg => image(inputImg, 0, 0));
}


//function mobileReady() {

document.ontouchmove = function(e) { e.preventDefault(); }


function dot() {
    strokeWeight(8);
    line(mouseX, mouseY, mouseX, mouseY);
}

function line() {
    strokeWeight(8);
    line(mouseX, mouseY, pmouseX, pmouseY);
}

inputCanvas.ontouchstart = function(event) {
    event.preventDefault();
    dot();
}

inputCanvas.ontouchmove = function(event) {
        event.preventDefault();
        line();
    }
    //}