import { useAuthStore } from "@/store/authStore";

export default function Dashboard() {
	const user = useAuthStore((state) => state.user);

	return (
		<div>
			<h1>Dashboard</h1>
			{JSON.stringify(user, null, 2)}
		</div>
	);
}
