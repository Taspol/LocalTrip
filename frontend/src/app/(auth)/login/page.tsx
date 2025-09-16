"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	async function handleLogin(e: React.FormEvent) {
		e.preventDefault();
		setError("");
		setLoading(true);
		try {
			const res = await fetch("/api/v1/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			});
			const data = await res.json();
			if (!res.ok) {
				setError(data.error || "Login failed");
				setLoading(false);
				return;
			}
			router.push("/profile");
		} catch {
			setError("Network error");
		} finally {
			setLoading(false);
		}
	}

	return (
		<main className="flex min-h-screen items-center justify-center bg-[var(--color-primary-25)]">
			<Card className="w-full max-w-md p-8">
				<h1 className="mb-6 text-2xl font-bold text-center">Login</h1>
				<form onSubmit={handleLogin} className="space-y-4">
					<div>
						<label className="block mb-1 font-medium">Email</label>
						<input
							type="email"
							className="w-full rounded-lg border px-3 py-2"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>
					<div>
						<label className="block mb-1 font-medium">Password</label>
						<input
							type="password"
							className="w-full rounded-lg border px-3 py-2"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>
					{error && <div className="text-red-500 text-sm">{error}</div>}
					<Button
						type="submit"
						variant="primary"
						size="md"
						loading={loading}
						className="w-full"
					>
						Login
					</Button>
				</form>
			</Card>
		</main>
	);
}
