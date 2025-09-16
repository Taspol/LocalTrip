import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Missing email or password' });
  }

  // Connect to backend API (port 4001)
  try {
    const backendRes = await fetch('http://localhost:4001/api/v1/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await backendRes.json();
    if (!backendRes.ok) {
      return res.status(backendRes.status).json(data);
    }
    // Forward token/user info
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: 'Login failed', details: String(err) });
  }
}
