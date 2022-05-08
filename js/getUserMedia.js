// Look after different browser vendors' ways of calling the getUserMedia()
// API method:
// Opera --> getUserMedia
// Chrome --> webkitGetUserMedia
// Firefox --> mozGetUserMedia

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia
                            || navigator.mediaDevices.getUserMedia;

// Use constraints to ask for a video-only MediaStream:
var constraints = {audio: false, video: true};

var video = document.querySelector("#VideoPreview");

// Callback to be called in case of success...
function successCallback(stream) {

  // Note: make the returned stream available to console for inspection
  window.stream = stream;

  if (window.URL) {
    // URL.createObjectURL() is deprecated, used MediaStream to a blob URL
    video.srcObject = stream;
  } 
  // We're all set. Let's just play the video out!
  video.play();
}

// Callback to be called in case of failures...
function errorCallback(error){
  console.log("navigator.getUserMedia error: ", error);
}

// Main action: just call getUserMedia() on the navigator object
navigator.getUserMedia(constraints, successCallback, errorCallback);