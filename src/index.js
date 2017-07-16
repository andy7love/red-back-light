/**
 * Particles emmiters for each parameter:
 * - Delay
 * - Eq
 * - Distortion
 * .
 * Emitted particles will leave trails.
 * Emitted Particles will be attracted to the most important value.
 * Emitted particles death color will be the most important value.
 * .
 * X axis will be mapped to Z axis. (more right, more far)
 * .
 * More X/Z, less important, less effect.
 * More Y, change other effect parameter.
 * .
 * Brightness/Contrast
 * Hue/Saturation
 * Effected by: Multi-band spectrum peek analyser.
 */

var AudioContext = (window.AudioContext || window.webkitAudioContext);
var audioCtx = new AudioContext();
var analyser = audioCtx.createAnalyser();

var audio = document.createElement('audio');
audio.src = 'audio/nothing-i-can-do.mp3';
audio.type = 'audio/mpeg';
audio.play();
var source = audioCtx.createMediaElementSource(audio);

// Create a stereo panner
var panNode = audioCtx.createStereoPanner();
panNode.pan.value = 0;

// delay
var delayNode = audioCtx.createDelay(0.1);
delayNode.delayTime.value = 0.1;
var delayGainNode = audioCtx.createGain();
delayGainNode.gain.value = 0.7;


// distortion.
var distortion = audioCtx.createWaveShaper();
distortion.curve = makeDistortionCurve(10);
distortion.oversample = '4x';
function makeDistortionCurve(amount) { // function to make curve shape for distortion/wave shaper node to use
	var k = typeof amount === 'number' ? amount : 50,
		n_samples = 44100,
		curve = new Float32Array(n_samples),
		deg = Math.PI / 180,
		i = 0,
		x;
	for (; i < n_samples; ++i) {
		x = i * 2 / n_samples - 1;
		curve[i] = (3 + k) * x * 20 * deg / (Math.PI + k * Math.abs(x));
	}
	return curve;
}

// Create a compressor node
var compressor = audioCtx.createDynamicsCompressor();
compressor.threshold.value = -6;
compressor.knee.value = 40;
compressor.ratio.value = 12;
compressor.attack.value = 0;
compressor.release.value = 0.25;

// eq.
var biquadFilter = audioCtx.createBiquadFilter();
biquadFilter.type = 'peaking';

// connections
var master = audioCtx.createChannelMerger(2);
source.connect(panNode);
panNode.connect(biquadFilter);
biquadFilter.connect(distortion);
distortion.connect(analyser);
analyser.connect(master);

// --
analyser.connect(delayNode);
delayNode.connect(delayGainNode);
delayGainNode.connect(master);

compressor.connect(master);
master.connect(audioCtx.destination);
// -------

// mouse event.
window.onmousemove = (e) => {
	let x = e.x / e.view.innerWidth;
	let y = e.y / e.view.innerHeight;

	biquadFilter.frequency.value = x * 5000;
	biquadFilter.gain.value = y * 20;
	delayGainNode.gain.value = 1 - y;
}

analyser.fftSize = 2048;
var bufferLength = analyser.frequencyBinCount;
var dataArray = new Uint8Array(bufferLength);
analyser.getByteTimeDomainData(dataArray);

// Get a canvas defined with ID "oscilloscope"
var canvas = document.getElementById('app');
var canvasCtx = canvas.getContext('2d');

// draw an oscilloscope of the current audio source
function draw() {
	analyser.getByteTimeDomainData(dataArray);

	canvasCtx.fillStyle = 'rgb(0,0,0)';
	canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

	canvasCtx.lineWidth = 2;
	canvasCtx.strokeStyle = 'rgb(255, 255, 255)';

	canvasCtx.beginPath();

	var sliceWidth = canvas.width * 1.0 / bufferLength;
	var x = 0;

	for (var i = 0; i < bufferLength; i++) {

		var v = dataArray[i] / 128.0;
		var y = v * canvas.height / 2;

		if (i === 0) {
			canvasCtx.moveTo(x, y);
		} else {
			canvasCtx.lineTo(x, y);
		}

		x += sliceWidth;
	}

	canvasCtx.lineTo(canvas.width, canvas.height / 2);
	canvasCtx.stroke();
	requestAnimationFrame(draw);
}

draw();
