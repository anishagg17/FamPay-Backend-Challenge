const express = require('express');
const axios = require('axios');
require('dotenv').config({ path: '.env' });

const Video = require('./models/Video');
const connectDB = require('./db');

connectDB();
const app = express();

const baseUrl = 'https://www.googleapis.com/youtube/v3/search';
if (!process.env.YouTubeAPIs) console.log('No keys found');
const keys = process.env.YouTubeAPIs && process.env.YouTubeAPIs.split(' ');

// Variables for paginating, switching keys
let counter = 0,
  page = 0;
const perPage = 2;

// Asynchronous function for fetching videos and storing it in database.
const populateInterval = setInterval(async () => {
  try {
    if (!keys) throw Error('No keys found');
    const idx = counter % keys.length;
    counter++;
    const currentKey = keys[idx];

    const {
      data: { items: videos },
    } = await axios.get(baseUrl, {
      params: {
        part: 'snippet',
        maxResults: 5,
        key: currentKey,
        q: 'bollywood',
      },
    });

    videos.forEach(
      async ({
        id: { videoId },
        snippet: { publishedAt, title, description, thumbnails },
      }) => {
        const preVideo = await Video.findOne({
          title: title,
        });

        if (!preVideo) {
          const newVideo = new Video({
            title: title,
            description: description,
            img: thumbnails.default.url,
            date: publishedAt,
          });

          const video = await newVideo.save();
        }
      }
    );
  } catch (err) {
    console.error(err);
  }
}, 10000);

// End-point to stop fetching videos from YouTube API.
app.get('/stop_populate', (req, res) => {
  clearInterval(populateInterval);
  res.status(200).send('stopped populating');
});

// End-point to get fetched videos from DataBase.
app.get('/', async (req, res) => {
  try {
    const videos = await Video.find()
      .limit(perPage)
      .skip(perPage * page)
      .sort({ date: -1 });
    page++;
    res.json(videos);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

let port = 5000 || process.env.PORT;
app.listen(port, () => console.log(`listening on ${port}`));
