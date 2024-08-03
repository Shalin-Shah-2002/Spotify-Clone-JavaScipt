console.log('lets write javascript lets goooooo!');
let currentsong = new Audio();

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = remainingSeconds.toString().padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
}

async function getSongs() {
    let a = await fetch('http://127.0.0.1:5500/songs/');
    let response = await a.text();
    console.log(response);
    let div = document.createElement('div');
    div.innerHTML = response;
    let as = div.getElementsByTagName('a');

    let arrSongs = [];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith('.preview')) {
            arrSongs.push(element.href.split('/songs/')[1])
        }

    }
    return arrSongs;

}

const playMuisc = (track) => {
    currentsong.src = '/songs/' + track.slice(0, -8);
    currentsong.play().catch(console.warn);
    document.querySelector('.songinfo').innerHTML = track
    document.querySelector('.songtime').innerHTML = '00:00 / 00:00 '
}



async function main() {
    // currentsong.src = songs[0]
    let songs = await getSongs();
    console.log(songs);


    let songUI = document.querySelector('.listitem').getElementsByTagName('ol')[0]

    for (const song of songs) {
        songUI.innerHTML = songUI.innerHTML + `       <li>
                            <img class="invert music" src="svg/music.svg" alt="">
                            <div class="info">

                                <div class="songname">${song.replaceAll('%20', ' ')}</div>
                                <div class="songartist">Shalin Shah</div>
                            </div>
                            <img  src="svg/play.svg" alt="">

                        </li>`
    }


    Array.from(document.querySelector('.listitem').getElementsByTagName('li')).forEach((e) => {
        e.addEventListener('click', element => {
            console.log(e.querySelector('.info').firstElementChild.innerHTML);
            playMuisc(e.querySelector('.info').firstElementChild.innerHTML)
        })
    })

    // let playbutton = document.querySelector('.buttons').getElementById('play')

    play.addEventListener('click', () => {
        if (currentsong.paused) {
            currentsong.play();
            play.src = "pause.svg"
        }
        else {
            currentsong.pause()
            play.src = "play.svg"

        }
    })

    currentsong.addEventListener('timeupdate', () => {
        console.log(currentsong.duration, currentsong.currentTime);
        document.querySelector('.songtime').innerHTML = `${formatTime(currentsong.currentTime)} / ${formatTime(currentsong.duration)}`
        document.querySelector('.circle').style.left = (currentsong.currentTime / currentsong.duration) * 100 + '%';


    })

    document.querySelector('.seekbar').addEventListener('click', e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector('.circle').style.left = percent + '%';
        currentsong.currentTime = (currentsong.duration * percent) / 100

    })
}

main() 