// pages/api/spotifySearch.js
import axios from 'axios';

export default async function handler(req, res) {
  try {
    const tokenResponse = await axios.post('https://accounts.spotify.com/api/token', 'grant_type=client_credentials', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${btoa(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`)}`
      },
    });

    const token = tokenResponse.data.access_token;
    const query = req.query.q; // The search query

    const response = await axios.get(`https://api.spotify.com/v1/search?q=${query}&type=album`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    res.status(200).json(response.data);

  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from Spotify' });
  }
}
