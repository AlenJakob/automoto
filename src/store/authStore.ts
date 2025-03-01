import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User, Session } from "@supabase/supabase-js";
import supabase from "@/lib/supabase/supabase";

interface AuthState {
	user: User | null;
	session: Session | null;
	isLoading: boolean;
	error: string | null;
	fetchUser: () => Promise<void>;
	logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => {
			const fetchUser = async () => {
				set({ isLoading: true });
				const { data, error } = await supabase.auth.getUser();
				if (error) {
					set({ error: error.message, isLoading: false, user: null });
				} else {
					set({ user: data?.user || null, isLoading: false });
				}
			};

			supabase.auth.onAuthStateChange((event, session) => {
				console.log("🔄 Supabase auth state changed:", event, session);
				set({ user: session?.user || null, session });
			});

			return {
				user: null,
				session: null,
				isLoading: false,
				error: null,
				fetchUser,
				logout: async () => {
					await supabase.auth.signOut();
					set({ user: null, session: null });
				},
			};
		},
		{ name: "auth-store" }
	)
);
