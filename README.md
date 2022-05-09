# WebRTC
This is a personal project to develop a WebRTC APP in which I hope to learn couple things.

Most of the theory used in this project comes from this book (https://learning.oreilly.com/library/view/real-time-communication-with/9781449371869) and my experience as VoIP engineer. 

Learnings from Sun 8th May 
- Many methods got deprecated from the demo on the book
- Can add a framework to make it look better from start, I choosed bootstrap since I like it and it is easy to use.

Learnings from Mon 9th May
- MediaDevice.getUserMedia only asks for contrains, it is on developer to add the data flow if success and how to handle the error if there is any
- Used for the first time Promises ".then()" in JS
- Found it on this doc: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia and https://webrtc.org/getting-started/media-devices

Example: 
navigator.mediaDevices.getUserMedia(constraints)
.then(function(stream) {
  /* use the stream */
})
.catch(function(err) {
  /* handle the error */
});
- MAC cameras are aceptable... but nothing else
- played with contraints which we would call requeriments and configurations of Video only this time.
- MediaStream has methods to return lists of Audio and Video Streamings, this would be useful to build a multiinput arrangement.