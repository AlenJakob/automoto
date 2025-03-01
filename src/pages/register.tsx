import { useState } from "react";
import { useRouter } from "next/router";
import supabase from "@/lib/supabase/supabase";

export default function Register() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const handleRegister = async () => {
		setError("");
		setSuccess("");

		const { data, error } = await supabase.auth.signUp({
			email,
			password,
		});

		console.log(data, "data");

		if (error) {
			setError(error.message);
		} else {
			setSuccess("Rejestracja udana! Sprawdź e-mail i potwierdź konto.");
			setTimeout(() => router.push("/login"), 3000);
		}
	};

	return (
		<div>
			<h1>Rejestracja</h1>
			<input
				type="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				placeholder="Email"
			/>
			<input
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				placeholder="Hasło"
			/>
			<button onClick={handleRegister}>Zarejestruj</button>
			{error && <p style={{ color: "red" }}>{error}</p>}
			{success && <p style={{ color: "green" }}>{success}</p>}
		</div>
	);
}
