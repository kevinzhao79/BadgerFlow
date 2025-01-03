/* proxy-server.js */

import express from 'express';
import axios from 'axios';

const app = express();
const PORT = 3000;

app.use(express.json());

/* Bypass CORS policies for pre-flight and POST request for EMS Cloud data */
app.use((_, res, next) => {

  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type')

  next()

})

app.options('/api/browse-events', (_, res) => {

  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type')

  res.sendStatus(204)

})

/* Proxy request */
app.post('/api/browse-events', async (req, res) => {
  try {

    const response = await axios.post(
      'https://uwmadison.emscloudservice.com/web/AnonymousServersApi.aspx/BrowseEvents',
      req.body,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    )

    res.json(response.data)

  } 
  catch (error) {

    console.error('Error fetching data:', error.message);

    res.status(error.response?.status || 500).json({
      message: 'Error fetching data',
      details: error.message,
    })

  }
})

/* Start proxy server */
app.listen(PORT, () => console.log(`Proxy server started on http://localhost:${PORT}`));