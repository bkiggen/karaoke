import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/styles.scss';
import $ from 'jquery';
import MusixMatch from './MusixMatch.js';




$(document).ready(function() {
  $(".searchForm").submit(function() {
    event.preventDefault();
    let artistInput = $("input[name='artist']").val();
    let titleInput = $("input[name='title']").val();
    $(".songList").html("");

    let musicQuery = new MusixMatch();
    let searchType = `http://api.musixmatch.com/ws/1.1/track.search?q_track=${titleInput}&q_artist=${artistInput}&page_size=20&s_track_rating=desc&apikey=${process.env.API_KEY}`;
    let promise = musicQuery.musicQuery(searchType);

    promise.then(function(response){
      let body = JSON.parse(response);
      for(let i=0; i<body.message.body.track_list.length; i++){
        $(".songList").append(`<li><input type="radio" class='song-title' name="song-name" value="${body.message.body.track_list[i].track.track_id}"> ${body.message.body.track_list[i].track.track_name} - ${body.message.body.track_list[i].track.artist_name}</input></li>`)
      }
      $("#songButton").html("<button type='submit' name='button' class='btn btn-warning'>Show Lyrics</button>");
    });


    $("#songForm").submit(function() {
      event.preventDefault();
      $([document.documentElement, document.body]).animate({
          scrollTop: $(".lyrics").offset().top
      }, 2000);
      let trackId = $('input[name="song-name"]:checked').val();


      let musicQuery = new MusixMatch();
      let searchType = `http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${trackId}&apikey=${process.env.API_KEY}`;
      let promise2 = musicQuery.musicQuery(searchType);

      promise2.then(function(response){
        let body = JSON.parse(response);
        $(".lyrics").html(`<PRE class="marquee">${body.message.body.lyrics.lyrics_body}</PRE>`);
      });

    });
  });
});

// http://api.musixmatch.com/ws/1.1/track.lyrics.get?apikey=d38be6bfc7fe97802dbb8ce0ddde404d&track_id=15953433
