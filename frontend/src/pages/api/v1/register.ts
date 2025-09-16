import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password, name } = req.body || {};
  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Missing name, email or password' });
  }

  try {
    const backendRes = await fetch('http://localhost:4001/api/v1/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name })
    });
    const data = await backendRes.json();
    if (!backendRes.ok) {
      return res.status(backendRes.status).json(data);
    }
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: 'Registration failed', details: String(err) });
  }
}
