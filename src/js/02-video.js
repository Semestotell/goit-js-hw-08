import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

const vimeoPlayer = new Vimeo('vimeo-player');

const STORAGE_KEY = 'videoplayer-current-time';

vimeoPlayer.setVolume(0);

const currentTime = Number(localStorage.getItem(STORAGE_KEY));

if (currentTime) {
    window.addEventListener('load', function (event) {
        vimeoPlayer.setCurrentTime(currentTime).then(function (time) {
        console.log(`Start time: ${timeString(time)}`);
        }).catch(function (error) {
            switch (error.name) {
                case 'RangeError':
                    console.log('RangeError');
            break;
            default:
            console.log('Other Error');
        }
        });
    });
}

vimeoPlayer.on('timeupdate', throttle(function (data) {
    localStorage.setItem(STORAGE_KEY, data.seconds);
    console.log(data.seconds);}, 1000)
);

vimeoPlayer.getVideoTitle().then(function (title) {
    console.log('title:', title);
    console.log(`Start time: ${timeString(currentTime)}`);
});

function timeString(time) {
    const date = new Date(0);
    date.setSeconds(time);
    return date.toTimeString();
}