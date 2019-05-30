const SIZE = 256,
    sampleNum = 14;
let inputCanvas, outputContainer, statusMsg, transferBtn, detailedBtn, undetailedBtn, sampleIndex = 0,
    modelReady = false,
    isTransfering = false;
const inputImgs = [],
    outputImgs = [];
const mobile = false;

var PixFace = pix2pix('./model/PixFace.pict', modelLoaded);

function setup() {
    // Create canvas
    inputCanvas = createCanvas(SIZE, SIZE);
    inputCanvas.class('border-box pencil').parent('canvasContainer');


    // Selcect output div container
    outputContainer = select('#output');
    statusMsg = select('#status');
    transferBtn = select('#transferBtn').hide();
    detailedBtn = select('#detailedButton').show();
    undetailedBtn = select('#undetailedButton').hide();

    // Display initial input image
    loadImage('./images/input.png', inputImg => image(inputImg, 0, 0));

    // Display initial output image
    let out = createImg('./images/input.png');
    outputContainer.html('');
    out.class('border-box').parent('output');

    // Load other sample input/output images


    // Set stroke to black
    stroke(0);
    pixelDensity(1);

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        mobile = true;
    }
    //usePencil();
    document.getElementById("lotxt").innerHTML = "";
}

// Draw on the canvas when mouse is pressed
function draw() {
    if (mouseIsPressed) {
        strokeWeight(8)
        if (!mobile) {
            line(mouseX, mouseY, pmouseX, pmouseY);
        } else {
            line(mouseX, mouseY, mouseX, mouseY);
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
    undetailedBtn.show();
    detailedBtn.hide();
}

//function mouseReleased() {
//    if (modelReady && !isTransfering) {
//        transfer()
//    }
//}

function loadIm() {
    if (!isTransfering) {
        document.getElementById("lotxt").innerHTML = "GENERATING..";
        //let out = createImg('./images/output.png');
        //outputContainer.html('');
        //out.class('border-box').parent('output');
        setTimeout('transfer();', 800);
        //transfer();

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



    // Select canvas DOM element
    let canvasElement = document.getElementById('defaultCanvas0');
    // Apply pix2pix transformation
    PixFace.transfer(canvasElement, result => {
        // Clear output container
        outputContainer.html('');
        // Create an image based result
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



    //outputContainer.html('');
    //outputImgs[sampleIndex].show().parent('output');



    //if (sampleIndex > sampleNum) sampleIndex = 0;
}

function usePencil() {

    inputCanvas.addClass('pencil');
}