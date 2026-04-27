module.exports = async (req, res) => {
  try {
    const url = req.url.slice(1);
    if (!url.startsWith('http')) {
      return res.status(200).send('Vercel Node is Active!');
    }
    const response = await fetch(url, {
      headers: { ...req.headers, host: new URL(url).hostname },
      method: req.method,
      body: (req.method !== 'GET' && req.method !== 'HEAD') ? req.body : undefined
    });
    const data = await response.arrayBuffer();
    
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });
    
    res.status(response.status).send(Buffer.from(data));
  } catch (error) {
    res.status(500).send('Connection Error');
  }
};

