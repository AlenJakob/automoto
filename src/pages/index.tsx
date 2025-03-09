import OfferCard from "@/components/offers/OfferCard";
import useGetOffers from "@/hooks/useGetOffers";
import { Box, VStack } from "@chakra-ui/react";

export default function Home() {
	const { offers, error } = useGetOffers();

	console.log("Log:offers", offers);

	return (
		<Box m={4}>
			{error && <p>Wystąpił błąd podczas pobierania ofert...</p>}
			<VStack display={{ base: "flex", md: "grid" }} gap={4} padding={4}>
				{offers.map((offer) => {
					return <OfferCard key={offer.offer_id} offer={offer} />;
				})}
			</VStack>
		</Box>
	);
}
