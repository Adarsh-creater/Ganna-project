console.log("welcome to Ganna");
// initialize the variables
let songIndex =0;
let audioElement = new Audio('song/1.mp3')
let masterPlay = document.getElementById('masterPlay');
let myPrograsBar = document.getElementById('myProgressBar');
let timeInfo = document.getElementById('timeInfo'); 
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItem = Array.from(document.getElementsByClassName('songitem'));
let songs = [
    {songName:"background-hip-hop-beat", filePath:"song/1.mp3 ",coverPath:"covers/1.jpg"},
    {songName:"departure-cinematic-trailer-intro", filePath:"song/2.mp3 ",coverPath:"covers/2.jpg"},
    {songName:"dramatic-background-music", filePath:"song/3.mp3 ",coverPath:"covers/3.jpg"},
    {songName:"dramatic-background-orchestral", filePath:"song/4.mp3 ",coverPath:"covers/4.jpg"},
    {songName:"epic-background-music-1", filePath:"song/5.mp3 ",coverPath:"covers/5.jpg"},
    {songName:"epic-background-music-2", filePath:"song/6.mp3 ",coverPath:"covers/6.jpg"},
    {songName:"firmament-beautiful-inspiring", filePath:"song/7.mp3 ",coverPath:"covers/7.jpg"},
    {songName:"funny-tango-dramatic-music", filePath:"song/8.mp3 ",coverPath:"covers/8.jpg"},
    
]
// Function to format time in minutes and seconds
const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
};

// Function to update song durations
const updateSongDurations = () => {
    songItem.forEach((element, i) => {
        const audio = new Audio(songs[i].filePath);
        audio.addEventListener('loadedmetadata', () => {
            const duration = formatTime(audio.duration);
            element.getElementsByClassName("dur")[0].innerText = duration;
        });
    });
};

songItem.forEach((element,i)=>{
    
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songname")[0].innerText = songs[i].songName;
    
});

// Call updateSongDurations to set the durations
updateSongDurations();

//handle play/pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        
        masterPlay.classList.remove('fa-circle-play');
        
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
        
       document.getElementById(`${songIndex}`).classList.remove('fa-circle-play');
       document.getElementById(`${songIndex}`).classList.add('fa-circle-pause');

    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
        
        document.getElementById(`${songIndex}`).classList.remove('fa-circle-pause');
        document.getElementById(`${songIndex}`).classList.add('fa-circle-play');
    }
});

//listen to events
audioElement.addEventListener('timeupdate',()=>{
    
    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    
    myPrograsBar.value = progress;
    // Update time info
    timeInfo.innerText = `-${formatTime(audioElement.currentTime)} / ${formatTime(audioElement.duration)}`;
});

myPrograsBar.addEventListener('change',()=>{
    audioElement.currentTime = myPrograsBar.value * audioElement.duration/100;
});

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause'); 
        element.classList.add('fa-circle-play');
    });
};

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
  element.addEventListener('click', (e)=>{
    const targetId = parseInt(e.target.id);
        
    if (songIndex === targetId && !audioElement.paused) {
        audioElement.pause();
        e.target.classList.remove('fa-circle-pause');
        e.target.classList.add('fa-circle-play');
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    } else {
        makeAllPlays();
        songIndex = targetId;
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `song/${songIndex + 1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    }

  });
});

const playNextSong = () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = `song/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    makeAllPlays();
    document.getElementById(`${songIndex}`).classList.remove('fa-circle-play');
    document.getElementById(`${songIndex}`).classList.add('fa-circle-pause');
}
document.getElementById('next').addEventListener('click', playNextSong);

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex = songs.length-1;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `song/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
     audioElement.currentTime = 0;
     audioElement.play();
     gif.style.opacity = 1;
     masterPlay.classList.remove('fa-circle-play');
     masterPlay.classList.add('fa-circle-pause');
     makeAllPlays();
    document.getElementById(`${songIndex}`).classList.remove('fa-circle-play');
    document.getElementById(`${songIndex}`).classList.add('fa-circle-pause');

});
// Play the next song when the current song ends
audioElement.addEventListener('ended', playNextSong);

