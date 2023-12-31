const express = require('express');
const googleIt = require('google-it');

const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Modified API endpoint with path parameter
app.get('/search/:query', async (req, res) => {
  const query = req.params.query;

  if (!query) {
    return res.status(400).json({ error: 'Missing query parameter.' });
  }

  try {
    const results = await googleIt({ query, requestOptions: { headers: { 'User-Agent': 'YourCustomUserAgent' } } });
    res.json({ success: true, results });
  } catch (error) {
    console.error('Google Search Error:', error);
    res.status(500).json({ success: false, error: 'An error occurred while searching Google.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
