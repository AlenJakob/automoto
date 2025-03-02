
import supabase from "@/lib/supabase/supabase";
import { PostgrestError, PostgrestSingleResponse } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

type Offer = {
	title: string;
	description: string;
	image: string;
	user_id: string;
	created_at: string;
	price: number;
	offer_id: string;
	negotiation: boolean;

}

const useGetOffers = () => {
	const [offers, setOffers] = useState<Offer[]>([]);
	const [error, setError] = useState<PostgrestError | null | string>(null);

	useEffect(() => {
		const getAllOffers = async () => {

			const { data, error }: PostgrestSingleResponse<Offer[]> = await supabase
				.from('offers')
				.select('*')

			setOffers(data ?? []);
			setError(error?.message ?? null);
		}


		getAllOffers()
	}, []);

	return { offers, error }
}

export default useGetOffers
