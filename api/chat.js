export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;

  // Simple reply logic (demo)
  const reply = `You said: "${message}"`;

  res.status(200).json({ reply });
}
