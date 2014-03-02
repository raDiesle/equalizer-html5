// create the audio context (chrome only for now)
var context = new webkitAudioContext();
var audioBuffer;
var sourceNode;

// load the sound
setupAudioNodes();
//loadSoundAndPlay("wagner-short.ogg");

function setupAudioNodes() {
    // create a buffer source node
    sourceNode = context.createBufferSource();
    // and connect to destination
    sourceNode.connect(context.destination);
}

// load the specified sound
function loadSoundAndPlay(url) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    // When loaded decode the data
    request.onload = function() {

        // decode the data
        context.decodeAudioData(request.response, function(buffer) {
            // when the audio is decoded play the sound
            playSound(buffer);
            gotStream(buffer);
        }, onError);
    }
    request.send();
}


function playSound(buffer) {
    sourceNode.buffer = buffer;
    sourceNode.noteOn(0);
}

// log if an error occurs
function onError(e) {
    console.log(e);
}