import axios from 'axios';

export default async function handler(req : any, res : any) {
  try {
    // Get Spotify access token
    const tokenResponse = await axios.post(
      'https://accounts.spotify.com/api/token',
      'grant_type=client_credentials',
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${btoa(
            `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
          )}`,
        },
      }
    );

    const token = tokenResponse.data.access_token;
    if (req.query.ids) {
      // If a URI is provided, fetch data for that specific URI
      const ids = req.query.ids;

      const response = await axios.get(
        `https://api.spotify.com/v1/albums?ids=${ids}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      res.status(200).json(response.data);
    } else {
      // Otherwise, perform a search
      const query = req.query.q; // The search query
      const limit = req.query.l || 10; // The number of results to return

      const response = await axios.get(
        `https://api.spotify.com/v1/search?q=${query}&type=album&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      res.status(200).json(response.data);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from Spotify' });
  }
}
