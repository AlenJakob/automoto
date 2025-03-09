import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Button } from "@chakra-ui/react";
import supabase from "@/lib/supabase/supabase";
import { Offer } from "@/components/offers/OfferCard";

const OfferPage = () => {
	const [offer, setOffer] = useState<Offer | null>(null);
	const [loading, setLoading] = useState(true);
	const router = useRouter();
	const { id } = router.query;

	useEffect(() => {
		console.log("Log:id", id);
		if (id) {
			const fetchOfferDetails = async () => {
				const { data, error } = await supabase
					.from("offers")
					.select("*")
					.eq("offer_id", id)
					.single();

				if (error) {
					console.error("Error fetching offer:", error);
				} else {
					setOffer(data);
				}
				setLoading(false);
			};

			fetchOfferDetails();
		}
	}, [id]);

	if (loading) return <div>Loading...</div>;

	if (!offer) return <div>Offer not found.</div>;

	return (
		<div>
			<h1>Oferta {offer.offer_id}</h1>
			<p>{offer.description}</p>

			{/* Przycisk Powrotu */}
			<Button colorScheme="blue" onClick={() => router.push("/")}>
				Powrót do listy ofert
			</Button>
		</div>
	);
};

export default OfferPage;
