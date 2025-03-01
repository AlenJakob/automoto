import { useState } from "react";
import { useRouter } from "next/router";
import supabase from "@/lib/supabase";

export default function LoginPage() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});
		console.log(data);
		if (error) {
			setError(error.message);
			return;
		}

		if (data?.user) {
			router.push("/dashboard"); // Ręczne przekierowanie
		}
	};

	return (
		<div>
			<h2>Logowanie</h2>
			{error && <p style={{ color: "red" }}>{error}</p>}
			<form onSubmit={handleLogin}>
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<input
					type="password"
					placeholder="Hasło"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<button type="submit">Zaloguj</button>
			</form>
		</div>
	);
}
