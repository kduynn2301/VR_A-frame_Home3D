// proxy-server.js
const fetch = require('node-fetch');

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/lmstudio', async (req, res) => {
  try {
    const response = await fetch('http://localhost:1234/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer lm-studio'
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("❌ Lỗi proxy:", err);
    res.status(500).json({ error: "Proxy error", detail: err.message });
  }
});

app.listen(3000, () => console.log('✅ Proxy đang chạy tại http://localhost:3000'));
