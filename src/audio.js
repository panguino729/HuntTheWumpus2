let audioElement = document.getElementById("audioSource");
let audioCtx;
let analyserNode;
let sourceNode;
let gainNode;
let data;

function AudioSetup(){
    audioCtx = new AudioContext();
    analyserNode = audioCtx.createAnalyser();
    analyserNode.fftSize = 2048;
    sourceNode = audioCtx.createMediaElementSource(audioElement);


    sourceNode.connect(analyser);
    //this connects our music back to the default output, such as your //speakers 
    sourceNode.connect(audioCtx.destination);

    data = new Uint8Array(analyserNode.frequencyBinCount);


    audioCtx.resume();

}

function AudioFunction(){
    requestAnimationFrame(AudioFunction);
    analyserNode.getByteFrequencyData(data); //passing our Uint data array
    draw(data);
}

function AudioDraw(){
    data = [...data];
    ctx.clearRect(0,0,canvas.width,canvas.height);
    let space = canvas.width / data.length;
    data.forEach((value,i)=>{
        ctx.beginPath();
        ctx.moveTo(space*i,canvas.height); //x,y
        ctx.lineTo(space*i,canvas.height-value); //x,y
        ctx.stroke();
    })
}

export {AudioSetup, AudioFunction, AudioDraw};