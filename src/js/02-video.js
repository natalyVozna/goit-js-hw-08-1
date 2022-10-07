import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo(iframe);
const onPlay = function (data) {
  localStorage.setItem('videoplayer-current-time', data.seconds);
};

player.on('timeupdate', throttle(onPlay, 1000), { autoplay: true });
player.setCurrentTime(localStorage.getItem('videoplayer-current-time'));
