"use client"; // Jeśli Next.js (Pages Router nie wymaga)

import { useAuthStore } from "@/store/authStore";
import { ReactNode, useEffect } from "react";

const AuthProvider = ({ children }: { children: ReactNode }) => {
	const fetchUser = useAuthStore((state) => state.fetchUser);

	useEffect(() => {
		fetchUser();
	}, [fetchUser]);

	return <>{children}</>;
};

export default AuthProvider;
