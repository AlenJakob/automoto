import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import supabase from "@/lib/supabase/supabase";

export const useAuthUser = () => {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const fetchUser = async () => {
			const { data, error } = await supabase.auth.getUser();
			if (!error && data?.user) {
				setUser(data.user);
			}
		};

		fetchUser();
	}, []);

	return user;
};
