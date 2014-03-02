

var localstream="";
function stop(){
    localstream.stop();
    localstream="";
    stopAudio.disabled=true;
    startAudio.disabled=false;
}
function getAudio(){
    stopAudio.disabled=false;
    startAudio.disabled=true;
    getUserMedia({audio:true, video:false},gotStream, function() {});
}


function gotStream(stream){
    localstream=stream;
    animateBars(stream);
}


var canvas=document.getElementById("cnv");
var ctx=canvas.getContext("2d");
const CANVAS_HEIGHT = canvas.height;
const CANVAS_WIDTH = canvas.width;

var context = new webkitAudioContext();
var analyser = context.createAnalyser();




function animateBars(stream){
    var source = context.createMediaStreamSource(stream);
    source.connect(analyser);
    analyser.connect(context.destination);

    refCallback();
}


function refCallback(time){

    window.webkitRequestAnimationFrame(refCallback, canvas);

    var freqByteData = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(freqByteData); //analyser.getByteTimeDomainData(freqByteData);

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    ctx.lineCap = 'round';
    ctx.fillStyle="#ecb711";

    var SPACER_WIDTH = 10;
    var BAR_WIDTH = 2;
    var OFFSET = 100;
    var CUTOFF = 23;
    var numBars = Math.round(CANVAS_WIDTH / SPACER_WIDTH);

    for(var i=0;i<numBars;++i){
        var magnitude = freqByteData[i + OFFSET];
        ctx.fillRect(i * SPACER_WIDTH, CANVAS_HEIGHT, BAR_WIDTH, (-magnitude-2)*10);
    }

}