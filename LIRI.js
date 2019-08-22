require("dotenv").config();

let liriQuery = process.argv[2];
let num1 = process.argv.slice(3).join(" ");;
var axios = require("axios");
var moment = require("moment");

// var num2 = process.argv[4];

switch (liriQuery) {
    case "spotify":
        spotify();
        break;
    case "movie":
        movie();
        break;
    case "bands":
        bands();
        break;
    case "divide":
        console.log(parseInt(num1) / parseInt(num2))
        break;
    case "remainder":
        console.log(parseInt(num1) % parseInt(num2))
        break;
    case "exp":
        console.log(Math.sqrt(parseInt(num1)))
        break;

}

function spotify() {

    var Spotify = require('node-spotify-api');

    var spotify = new Spotify({
        id: "9ca97e1d28434c57ae8188f43d3388ea",
        secret: "4beec46599724168b221261ed3d30311"
    });

    spotify.search({
        type: 'track',
        query: num1,
        limit: 20 
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        } else {
            for (i = 0; i < data.tracks.items.length; i++) {
                var musicSearch = data.tracks.items[i];
                console.log(`===============Song ${(i)+1}===============`);
                console.log(`|Artist:  ${musicSearch.artists[0].name}`)
                console.log(`|Song Name: ${musicSearch.name}`)
                console.log(`|Album Name: ${musicSearch.album.name}`)
                console.log(`|Preview song: ${musicSearch.preview_url}`);
                console.log(`========================================`);
            }

        }

    });

}


function movie() {
    // value = value.replace(/\s+/g, ''); //replace spaces with no spaces
    axios.get("http://www.omdbapi.com/?apikey=edb3aeb6&t=" + num1 + "&plot=short")
        .then(function (response) {
            var movieSearch = response.data;
            console.log(`===============Movie Info===============`);
            console.log(`|Movie Title: ${movieSearch.Title}`);
            console.log(`|Movie Actors: ${movieSearch.Actors}`);
            console.log(`|Release Date: ${movieSearch.Released}`);
            console.log(`|Rotten Tomato Rating: ${movieSearch.Ratings[1].Value}`);
            console.log(`|Plot: ${movieSearch.Plot}`);
            console.log(`========================================`);
        })
        .catch(function (error) {
            console.log(`Error occurred.`);
        });
}


function bands() {
    // value = value.replace(/\s+/g, ''); //replace spaces with no spaces
    axios.get("https://rest.bandsintown.com/artists/" + num1 + "/events?app_id=codingbootcamp")
        .then(function (concerts) {
            for (var i = 0; i < concerts.data.length; i++) {
                var concertSearch = concerts.data[i]
                console.log(`===============EVENT ${(i)+1}===============`);
                console.log(`Artist Lineup: ${concertSearch.lineup}`);
                console.log(`Name of the Venue: ${concertSearch.venue.name}`);
                console.log(`Venue Location: ${concertSearch.venue.city}`);
                console.log(`Date of the Event: ${moment(concertSearch.datetime).format('LL')}`);
                console.log(`========================================`);
            }
        })
        .catch(function (error) {
            console.log(`Error occurred.`);
        });
}

// console.log(res))