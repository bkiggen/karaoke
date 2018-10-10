import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/styles.scss';
import $ from 'jquery';
// import { User } from './backEnd.js';

$(document).ready(function() {
  $(".searchForm").submit(function() {
    event.preventDefault();

    let userInput = $("input[type='text']").val();
    $(".songList").html("");
    // let userInput = 'get back';
    $.ajax({
      url: `http://api.musixmatch.com/ws/1.1/track.search?q_track=${userInput}&page_size=20&s_track_rating=desc&apikey=d38be6bfc7fe97802dbb8ce0ddde404d`,
      type: 'GET',
      data: {
        format: 'jsonp',
      },
      dataType: "jsonp",
      success: function(response) {

        console.log(response.message.body);
        for(let i=0; i<response.message.body.track_list.length; i++){
          $(".songList").append(`<li><input type="radio" class='song-title' name="song-name" value="${response.message.body.track_list[i].track.track_id}"> ${response.message.body.track_list[i].track.track_name} - ${response.message.body.track_list[i].track.artist_name}</input></li>`)
        }
        $("#songButton").html("<button type='submit' name='button'>Show Lyrics</button>");
        // $(".results").text(`${response.message.body.track_list[0].track.lyrics_id}`);
      },
      error: function() {
        $('#errors').text("There was an error processing your request. Please try again.");
      }
    })

    $("#songForm").submit(function() {
      event.preventDefault();
      let trackId = $('input[name="song-name"]:checked').val();

      $.ajax({
        url: `http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${trackId}&apikey=d38be6bfc7fe97802dbb8ce0ddde404d`,
        type: 'GET',
        data: {
          format: 'jsonp',
        },
        dataType: "jsonp",
        success: function(response) {
          // console.log(response);
          console.log(response.message.body.lyrics.lyrics_body);
          $(".lyrics").html(`<PRE>${response.message.body.lyrics.lyrics_body}</PRE>`);
          // $(".results").text(`${response.message.body.track_list[0].track.lyrics_id}`);
        },
        error: function() {
          $('#errors').text("There was an error processing your request. Please try again.");
        }
      })
    });
  });
});

// http://api.musixmatch.com/ws/1.1/track.lyrics.get?apikey=d38be6bfc7fe97802dbb8ce0ddde404d&track_id=15953433
