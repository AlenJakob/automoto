import useGetOffers from "@/hooks/useGetOffers";
import { Button, Card, VStack } from "@chakra-ui/react";
import Image from "next/image";

export default function Home() {
	const { offers, error } = useGetOffers();

	console.log("Log:offers", offers);

	return (
		<div>
			{error && <p>Wystąpił błąd podczas pobierania ofert...</p>}
			<VStack display={{ base: "flex", md: "grid" }} gap={4} padding={4}>
				{offers.map((offer) => {
					return (
						<Card.Root key={offer.title}>
							<Card.Body gap="2">
								<figure>
									<Image
										width={200}
										height={150}
										src={`https://ireland.apollo.olxcdn.com/v1/files/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmbiI6ImV5cTRicHlydmhkYzItT1RPTU9UT1BMIiwidyI6W3siZm4iOiJ3ZzRnbnFwNnkxZi1PVE9NT1RPUEwiLCJzIjoiMTYiLCJhIjoiMCIsInAiOiIxMCwtMTAifV19.l82eFppVOpKG23nhwbtcX8EayDDks1QqQR75pdjG2hs/image;s=1440x0;q=80`}
										alt={offer.title}
										style={{
											width: "200px",
											height: "150px",
											objectFit: "cover",
										}}
										unoptimized
									/>
								</figure>
								<Card.Title>{offer.title}</Card.Title>
								<Card.Description>{offer.description}</Card.Description>
								<p>dodano {offer.created_at}</p>
								<p>Cena {offer.price} PLN</p>
								<p>Id oferty {offer.offer_id} </p>
								{offer.negotiation && (
									<b style={{ color: "green" }}>Do negocjacji </b>
								)}

								<Card.Footer>
									<Button>Zobacz ofertę</Button>
								</Card.Footer>
							</Card.Body>
						</Card.Root>
					);
				})}
			</VStack>
		</div>
	);
}
