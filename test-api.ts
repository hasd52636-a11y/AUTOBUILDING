import https from 'https';

const API_KEY = "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";

const prompt = "Hi";

const payload = {
  model: "qwen/qwen3.5-397b-a17b",
  messages: [{ role: "user", content: prompt }],
  max_tokens: 50
};

const data = JSON.stringify(payload);

const options = {
  hostname: 'integrate.api.nvidia.com',
  path: '/v1/chat/completions',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`
  }
};

console.log('Starting request...');

const req = https.request(options, (res) => {
  console.log('Status:', res.statusCode);
  
  let body = '';
  res.on('data', (chunk) => {
    console.log('Chunk received');
    body += chunk;
  });
  res.on('end', () => {
    console.log('Response:', body);
  });
});

req.on('error', (e) => {
  console.error('Error:', e.message);
});

req.write(data);
req.end();

console.log('Request sent');
