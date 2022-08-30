import $ from 'dom7';
import Framework7, { getDevice } from 'framework7/bundle';

// Import F7 Styles
import 'framework7/css/bundle';

// Import Icons and App Custom Styles
import '../css/icons.css';
import '../css/app.css';
// Import Cordova APIs
import cordovaApp from './cordova-app.js';

// Import Routes
import routes from './routes.js';
// Import Store
import store from './store.js';

// Import main app component
import App from '../app.f7';

var device = getDevice();
var app = new Framework7({
  name: 'Epic', // App name
  theme: 'auto', // Automatic theme detection
  el: '#app', // App root element
  component: App, // App main component
  id: 'io.splendor.epic', // App bundle ID
  // App store
  store: store,
  // App routes
  routes: routes,


  // Input settings
  input: {
    scrollIntoViewOnFocus: device.cordova && !device.electron,
    scrollIntoViewCentered: device.cordova && !device.electron,
  },
  // Cordova Statusbar settings
  statusbar: {
    iosOverlaysWebView: true,
    androidOverlaysWebView: false,
  },
  on: {
    init: function () {
      var f7 = this;
      if (f7.device.cordova) {
        // Init cordova APIs (see cordova-app.js)
        cordovaApp.init(f7);
      }
    },
  },
});

var player = {
  track: {
    src: './assets/What God Can Do in Daily Devotions – John Piper.mp3',
    title: '',
    volume: 0.8
  },
  media: null,
  status: {
    '0': 'MEDIA_NONE',
    '1': 'MEDIA_STARTING',
    '2': 'MEDIA_RUNNING',
    '3': 'MEDIA_PAUSED',
    '4': 'MEDIA_STOPPED',
  },
  err: {
    '1': 'MEDIA_ERR_ABORTED',
    '2': 'MEDIA_ERR_NETWORK',
    '3': 'MEDIA_ERR_DECODE',
    '4': 'MEDIA_ERR_NONE_SUPORTED',
  },
  init: function(){
    document.addEventListener('deviceready', player.ready, false);
  },
  ready: function(){
    player.addListeners();
    let src = player.track.src;
    player.media = new Media(src, player.ftw, player.wtf, player.statusChange);
  },
  ftw: function(){
    //Sucess creating the media object and playing, stopping, etc.
    console.log('Media object created and playing');
  },
  wtf: function(err){
    //Failure of playback of the media object
    console.warn('Media object failed to play', err);
  },
  statusChange: function(status){
    //Status change of the media object
    console.log('Media status is now ' + player.status[status]);
  },
  addListeners: function(){
    document.querySelector('#play-btn').addEventListener('click', player.play);
    document.querySelector('#pause-btn').addEventListener('click', player.pause);
    document.querySelector('#rew-btn').addEventListener('click', player.rewind);
    document.querySelector('#ff-btn').addEventListener('click', player.fastForward);
    document.addEventListener('pause', () => {
      player.media.release();
    });
  },
  play: function(){
    player.media.play();
  },
  pause: function(){
    player.media.pause();
  },
  rewind: function(){
    let pos = player.media.getCurrentPosition((pos) => {
      let dur = player.media.getDuration();
      console.log('Current position is ', pos);
      console.log('Duration is ', dur);
      pos =+ 10;
      if (pos < dur) {
        player.media.seekTo( pos * 1000);
      }
    });
  },
  fastForward: function(){
    let pos = player.media.getCurrentPosition((pos)=>{
      pos -= 10;
      if (pos > 0) {
        player.media.seekTo( pos * 1000 );
      } else {
        player.media.seekTo(0);
      }
    });
  }
}

player.init();