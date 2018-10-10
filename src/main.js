import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/styles.scss';
import $ from 'jquery';
// import { User } from './backEnd.js';

$(document).ready(function() {
  $(".searchForm").submit(function() {
    event.preventDefault();

    // let userInput = $("input[type='text']").val();
    let userInput = 'Beatles';
    $.ajax({
      // url: 'http://api.musixmatch.com/ws/1.1/track.search?q=${userInput}&apikey=d38be6bfc7fe97802dbb8ce0ddde404d',
      url: `http://api.musixmatch.com/ws/1.1/track.search?q=Yellow Submarine&apikey=d38be6bfc7fe97802dbb8ce0ddde404d`,
      type: 'GET',
      data: {
        format: 'jsonp',
      },
      dataType: "jsonp",
      success: function(response) {
        // console.log(response.message.body.track_list);

        for(let i=0; i<response.message.body.track_list.length; i++){
          $(".songList").append(`<input type="radio" class='song-title' name="${response.message.body.track_list[i].track.track_name}" value="${response.message.body.track_list[i].track.lyrics_id}">${response.message.body.track_list[i].track.track_name} - ${response.message.body.track_list[i].track.artist_name}</input>`)
        }
        // $(".results").text(`${response.message.body.track_list[0].track.lyrics_id}`);
      },
      error: function() {
        $('#errors').text("There was an error processing your request. Please try again.");
      }
    })
  });
});

// http://api.musixmatch.com/ws/1.1/track.lyrics.get?apikey=d38be6bfc7fe97802dbb8ce0ddde404d&track_id=15953433
