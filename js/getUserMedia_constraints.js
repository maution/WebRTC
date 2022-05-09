// Define local variables associated with video resolution selection
// buttons in the HTML page
var vgaButton = document.querySelector("button#vga");
var qvgaButton = document.querySelector("button#qvga");
var hdButton = document.querySelector("button#hd");
var disableVideo = document.querySelector("button#disableVideo");
var resolutionAlertRequested = document.getElementById("dimensionsRequested");
var resolutionAlertCurrent = document.getElementById("dimensionsCurrent");

// Video element in the HTML5 page
var video = document.querySelector("video");
console.log(video.id)

// The local MediaStream to play with
var stream;

// Callback to be called in case of success...
function successCallback(gotStream, constraints) {
  // Make the stream available to the console for introspection
  window.stream = gotStream;

  // Attach the returned stream to the <video> element
  // in the HTML page
  video.srcObject = stream;
  console.log("Here is the stream ID:",stream.id);
  // Start playing video
  video.play();
}

// Callback to be called in case of failure...
function errorCallback(error){
  console.log("navigator.getUserMedia error: ", error);
}

// Constraints object for low resolution video
var qvgaConstraints  = {
  video: {
    mandatory: {
      maxWidth: 320,
      maxHeight: 240
    }
  }
};

// Constraints object for standard resolution video
var vgaConstraints  = {
  video: {
    mandatory: {
      maxWidth: 640,
      maxHeight: 480
    }
  }
};

// Constraints object for high resolution video
var hdConstraints  = {
  video: {
    ideal: {
      minWidth: 1080,
      minHeight: 720
    }
  }
};

// Associate actions with buttons:
qvgaButton.onclick = function(){getMedia(qvgaConstraints)};
vgaButton.onclick = function(){getMedia(vgaConstraints)};
hdButton.onclick = function(){getMedia(hdConstraints)};
disableVideo.onclick = function(){stream.removeTrack(stream.getVideoTracks()[0]);
  resolutionAlertRequested.innerHTML="";
  resolutionAlertCurrent.innerHTML="";
};
//Change text in Resolution alert text Box
function changeTextInResolution(constraints, stream){
    resolutionAlertRequested.innerHTML="";
    resolutionAlertCurrent.innerHTML="";
    resolutionAlertRequested.appendChild(document.createTextNode(JSON.stringify(constraints, null, 1)));
    resolutionAlertCurrent.appendChild(document.createTextNode(JSON.stringify(stream.getVideoTracks()[0].getSettings())));

};

// Simple wrapper for getUserMedia() with constraints object as
// an input parameter
function getMedia(constraints){
  if (!!stream) {
    video.srcObject = null;
    if(stream.getVideoTracks()[0])
    stream.removeTrack(stream.getVideoTracks()[0]);
  }
  navigator.mediaDevices.getUserMedia(constraints).then(stream => {
    console.log('Got MediaStream:', stream);
    successCallback(stream);
    changeTextInResolution(constraints, stream);
  })
  .catch(error => {
    console.error('Error accessing media devices.', error);
    errorCallback(stream);
  });
}