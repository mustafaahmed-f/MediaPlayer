const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const currentLength=document.getElementById('currentLength');
const totalLength=document.getElementById('totalLength');
const cover = document.getElementById('cover');
const currTime = document.querySelector('#currTime');
const durTime = document.querySelector('#durTime');
const audios = document.querySelector('#audios');
const audioNumbers = ['001', '018', '019' , '025' , '027' , '030' , '033' , '055' , '067'];
const audioNames = ['الفاتحة','الكهف','مريم','الفرقان','النمل','الروم','الأحزاب','الرحمن','الملك']
let currentIndex = 0;


//==========================================================================================

// ================== Event listeners ================================

playBtn.addEventListener('click',playANDpause)
audio.addEventListener('timeupdate',progressBarPercentage)
audios.addEventListener('change',changeAudio)
nextBtn.addEventListener('click',nextAudio)
prevBtn.addEventListener('click',prevAudio)
progressContainer.addEventListener('click',changeAudioLength)
audio.addEventListener('timeupdate',updateTiming)
audio.addEventListener('ended',nextAudio)
document.addEventListener('keyup',(e)=>{
    //key: "ArrowRight"
   if(e.key=="ArrowRight") {nextAudio()}
   else if (e.key=="ArrowLeft") {prevAudio()}
})


// ================== functions ======================================

function playANDpause(){
    let checkPlaying = musicContainer.classList.contains('play');
    if (!checkPlaying){playAudio()}
    else {pauseAudio()}
}

function changeAudioName(){
    $(title).text(audioNames[currentIndex])
}

function playAudio(){
    musicContainer.classList.add('play');
    audio.play();
    changeAudioName();
}

function pauseAudio(){
    musicContainer.classList.remove('play');
    audio.pause();
}

function nextAudio(){
    let checkPlaying = musicContainer.classList.contains('play');
    if(checkPlaying){
        currentIndex++;
        if(currentIndex>(audioNumbers.length-1)){currentIndex=0}
        audio.src=`Audio/${audioNumbers[currentIndex]}.mp3`
        audio.play();
    }
    changeAudioName();
}

function prevAudio(){
    let checkPlaying = musicContainer.classList.contains('play');
    if(checkPlaying){
        currentIndex--;
        if(currentIndex<0){currentIndex=audioNumbers.length-1}
        audio.src=`Audio/${audioNumbers[currentIndex]}.mp3`
        audio.play();
    }
    changeAudioName();
}

function progressBarPercentage(e){
    let currentTime = e.target.currentTime;
    let duration = e.target.duration;
    $(progress).width(`${(currentTime/duration)*100}%`) 
}

function changeAudio(e){
    let checkPlaying = musicContainer.classList.contains('play');
    audio.src=`Audio/${e.target.value}.mp3`
    if(checkPlaying){audio.play();}
    currentIndex = audioNumbers.indexOf(e.target.value)
    changeAudioName();
}

function changeAudioLength(e){
    audio.currentTime=(e.offsetX/this.offsetWidth)*audio.duration;
}

function updateTiming(){
    let totalHours = Math.floor(audio.duration / 3600).toString()
    let totalMinutes = Math.floor((audio.duration % 3600)/60)
    let totalSeconds = Math.floor(audio.duration % 60)
    let currentHours = Math.floor(audio.currentTime / 3600).toString()
    let currentMinutes = Math.floor((audio.currentTime % 3600)/60).toString()
    let currentSeconds = Math.floor(audio.currentTime % 60).toString()


    if(currentHours<9){currentHours='0'+`${currentHours}`}
    if(currentMinutes<9){currentMinutes='0'+`${currentMinutes}`}
    if(currentSeconds<9){currentSeconds='0'+`${currentSeconds}`} 
    if(totalHours<9){totalHours='0'+`${totalHours}`}
    if(totalMinutes<9){totalMinutes='0'+`${totalMinutes}`}
    if(totalSeconds<9){totalSeconds='0'+`${totalSeconds}`} 


    $(totalLength).text(totalHours+':'+totalMinutes+':'+totalSeconds)
    $(currentLength).text(currentHours+':'+currentMinutes+':'+currentSeconds)

}



