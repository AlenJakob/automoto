import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import supabase from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

export default function Dashboard() {
	const router = useRouter();
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const checkUser = async () => {
			const { data, error } = await supabase.auth.getUser();

			if (error) {
				console.error("Błąd pobierania użytkownika:", error);
			}

			if (!data?.user) {
				router.push("/login");
			} else {
				setUser(data.user);
			}

			setLoading(false);
		};

		checkUser();
	}, [router]);

	const handleLogout = async () => {
		await supabase.auth.signOut();
		router.push("/login");
	};

	if (loading) {
		return <p>Ładowanie...</p>;
	}

	return (
		<div>
			<h1>Dashboard</h1>
			{user ? <p>Zalogowany jako: {user.email}</p> : <p>Nie zalogowany</p>}
			<button onClick={handleLogout}>Wyloguj</button>
		</div>
	);
}
