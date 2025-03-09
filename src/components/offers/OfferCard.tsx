import {
	Card,
	Button,
	Box,
	Text,
	HStack,
	Badge,
	IconButton,
	Link,
} from "@chakra-ui/react";
import Image from "next/image";
import { useState } from "react";

import { HiHeart, HiOutlineHeart } from "react-icons/hi";

export type Offer = {
	title: string;
	description: string;
	created_at: string;
	price: number;
	offer_id: string;
	negotiation: boolean;
};

export type OfferCard = {
	offer: Offer;
};

const OfferCard = ({ offer }: OfferCard) => {
	const offerDate = new Date(offer.created_at).toLocaleString();
	const [isFavorited, setIsFavorited] = useState(false);

	const handleFavoriteToggle = () => {
		setIsFavorited(!isFavorited);
	};

	return (
		<Card.Root key={offer.title}>
			<Card.Body gap="2" flexDirection="row">
				<Box display="flex" flexDirection="row" gap="2">
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
					<Box ml="4">
						<Card.Title>{offer.title}</Card.Title>
						<Card.Description>{offer.description}</Card.Description>

						<HStack mt="4">
							<Badge colorPalette="blue">144, 000 km - mock</Badge>
							<Badge colorPalette="blue">Automatyczna - mock</Badge>
							<Badge colorPalette="blue">Benzyna - mock</Badge>
							<Badge colorPalette="blue">2014 - mock</Badge>
						</HStack>

						<Box display="flex" flexDirection="column" mt="4" gap={1}>
							<Text textStyle="sm">Poznań - mock</Text>
							<Text textStyle="sm">dodano: {offerDate}</Text>
						</Box>
					</Box>
					{/* <p>Id oferty {offer.offer_id} </p> */}
				</Box>
				<Box flex="1" justifyItems="flex-end">
					<>
						{offer.price && (
							<Text textStyle="xl">
								<b>{offer.price}</b> PLN
							</Text>
						)}

						{offer.negotiation && (
							<Text color="green.600" textStyle="xs" fontWeight="bold">
								Do negocjacji
							</Text>
						)}
					</>
					{!offer.price && <Text>Cena do uzgodnienia</Text>}
				</Box>
			</Card.Body>

			<Card.Footer justifyContent="flex-end">
				<IconButton variant="outline" onClick={handleFavoriteToggle}>
					{isFavorited ? <HiHeart /> : <HiOutlineHeart />}
				</IconButton>
				<Link href={`/offer/${offer.offer_id}`}>
					<Button>Zobacz ofertę</Button>
				</Link>
			</Card.Footer>
		</Card.Root>
	);
};

export default OfferCard;
