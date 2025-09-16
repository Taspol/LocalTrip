"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function RegisterPage() {
	const router = useRouter();
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	async function handleRegister(e: React.FormEvent) {
		e.preventDefault();
		setError('');
		if (password !== confirmPassword) {
			setError('Passwords do not match');
			return;
		}
		setLoading(true);
		try {
			const res = await fetch('/api/v1/register', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name, email, password })
			});
			const data = await res.json();
			if (!res.ok) {
				setError(data.error || 'Registration failed');
				setLoading(false);
				return;
			}
			router.push('/login');
		} catch {
			setError('Network error');
		} finally {
			setLoading(false);
		}
	}

	return (
		<main className="flex min-h-screen items-center justify-center bg-[var(--color-primary-25)]">
			<Card className="w-full max-w-md p-8">
				<h1 className="mb-2 text-2xl font-bold text-center">Create Account</h1>
				<p className="mb-6 text-center text-sm text-[color:var(--color-foreground)/0.7]">Join and start planning your hikes.</p>
				<form onSubmit={handleRegister} className="space-y-4">
					<div>
						<label className="block mb-1 font-medium">Name</label>
						<input
							type="text"
							className="w-full rounded-lg border px-3 py-2"
							value={name}
							onChange={e => setName(e.target.value)}
							required
						/>
					</div>
					<div>
						<label className="block mb-1 font-medium">Email</label>
						<input
							type="email"
							className="w-full rounded-lg border px-3 py-2"
							value={email}
							onChange={e => setEmail(e.target.value)}
							required
						/>
					</div>
					<div>
						<label className="block mb-1 font-medium">Password</label>
						<input
							type="password"
							className="w-full rounded-lg border px-3 py-2"
							value={password}
							onChange={e => setPassword(e.target.value)}
							required
							minLength={6}
						/>
					</div>
					<div>
						<label className="block mb-1 font-medium">Confirm Password</label>
						<input
							type="password"
							className="w-full rounded-lg border px-3 py-2"
							value={confirmPassword}
							onChange={e => setConfirmPassword(e.target.value)}
							required
							minLength={6}
						/>
					</div>
					{error && <div className="text-red-500 text-sm">{error}</div>}
					<Button type="submit" variant="primary" size="md" loading={loading} className="w-full">Register</Button>
					<div className="text-sm text-center text-[color:var(--color-foreground)/0.6]">
						Already have an account? <Link href="/login" className="text-[var(--color-primary-600)] font-medium hover:underline">Login</Link>
					</div>
				</form>
			</Card>
		</main>
	);
}
