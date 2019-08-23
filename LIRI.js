require("dotenv").config();


let keys = require("./keys.js");
let Spotify = require('node-spotify-api');
let spotify = new Spotify(keys.spotify);
let axios = require("axios");
let moment = require("moment");
let fs = require("fs");


let liriQuery = process.argv[2];
let input = process.argv.slice(3).join(" ");





function searchQuery(term) {
    switch (term) {
        case "spotify-this-song":
            nameThatSong();
            break;
        case "movie-this":
            movie();
            break;
        case "concert-this":
            bands();
            break;
        case "do-what-it-says":
            doSomething();
            break;
        default:
            console.log(`Invalid Choice`)
    }
}

searchQuery(liriQuery)


function nameThatSong() {

    spotify.search({
        type: 'track',
        query: input,
        limit: 20
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        } else {
            for (let i = 0; i < data.tracks.items.length; i++) {
                let musicSearch = data.tracks.items[i];
                console.log(`===============Song ${(i)+1}===============`);
                console.log(`|Artist:  ${musicSearch.artists[0].name}`)
                console.log(`|Song Name: ${musicSearch.name}`)
                console.log(`|Album Name: ${musicSearch.album.name}`)
                console.log(`|Preview song: ${musicSearch.preview_url}`);
                console.log(`========================================`);

                fs.appendFileSync("log.txt", `===============Song ${(i)+1}===============\n`);
                fs.appendFileSync("log.txt", `|Artist:  ${musicSearch.artists[0].name}\n`);
                fs.appendFileSync("log.txt", `|Song Name: ${musicSearch.name}\n`);
                fs.appendFileSync("log.txt", `|Album Name: ${musicSearch.album.name}\n`);
                fs.appendFileSync("log.txt", `|Preview song: ${musicSearch.preview_url}\n`);
                fs.appendFileSync("log.txt", `========================================\n`);

            }

        }

    });

}


function movie() {
    axios.get("http://www.omdbapi.com/?apikey=edb3aeb6&t=" + input + "&plot=short")
        .then(function (response) {
            let movieSearch = response.data;
            console.log(`===============Movie Info===============`);
            console.log(`|Movie Title: ${movieSearch.Title}`);
            console.log(`|Release Year: ${movieSearch.Year}`);
            console.log(`|Rotten Tomato Rating: ${movieSearch.Ratings[1].Value}`);
            console.log(`|Countries Where Released: ${movieSearch.Country}`);
            console.log(`|Languages: ${movieSearch.Language}`);
            console.log(`|Plot: ${movieSearch.Plot}`);
            console.log(`|Movie Actors: ${movieSearch.Actors}`);
            console.log(`========================================`);

            fs.appendFileSync("log.txt", `===============Movie Info===============\n`);
            fs.appendFileSync("log.txt", `|Movie Title: ${movieSearch.Title}\n`);
            fs.appendFileSync("log.txt", `|Release Year: ${movieSearch.Year}`);
            fs.appendFileSync("log.txt", `|Rotten Tomato Rating: ${movieSearch.Ratings[1].Value}\n`);
            fs.appendFileSync("log.txt", `|Countries Where Released: ${movieSearch.Country}\n`);
            fs.appendFileSync("log.txt", `|Languages: ${movieSearch.Language}\n`);
            fs.appendFileSync("log.txt", `|Plot: ${movieSearch.Plot}\n`);
            fs.appendFileSync("log.txt", `|Movie Actors: ${movieSearch.Actors}\n`);
            fs.appendFileSync("log.txt", `========================================\n`);
        })
        .catch(function (error) {
            console.log(`Error occurred.`);
        });
}


function bands() {
    axios.get("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp")
        .then(function (concerts) {
            for (let i = 0; i < concerts.data.length; i++) {
                let concertSearch = concerts.data[i]
                console.log(`===============EVENT ${(i)+1}===============`);
                console.log(`|Artist Lineup: ${concertSearch.lineup}`);
                console.log(`|Name of the Venue: ${concertSearch.venue.name}`);
                console.log(`|Venue Location: ${concertSearch.venue.city}`);
                console.log(`|Date of the Event: ${moment(concertSearch.datetime).format('LL')}`);
                console.log(`========================================`);

                fs.appendFileSync("log.txt", `===============Concert ${i}===============\n`);
                fs.appendFileSync("log.txt", `|Artist Lineup: ${concertSearch.lineup}`);
                fs.appendFileSync("log.txt", `|Name of the Venue: ${concertSearch.venue.name}`);
                fs.appendFileSync("log.txt", `|Venue Location: ${concertSearch.venue.city}\n`);
                fs.appendFileSync("log.txt", `|Date of the Event: ${moment(concertSearch.datetime).format('LL')}\n`);
                console.log(`========================================`);
            }
        })
        .catch(function (error) {
            console.log(`Error occurred.`);
        });
}

function doSomething() {
    fs.readFile('random.txt', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        let dataArr = data.split(',');
        input = dataArr[1]

        searchQuery(dataArr[0])
    });
}