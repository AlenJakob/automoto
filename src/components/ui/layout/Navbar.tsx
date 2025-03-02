import { useAuthStore } from "@/store/authStore";
import {
	Box,
	Flex,
	Button,
	Spacer,
	Text,
	Stack,
	Separator,
} from "@chakra-ui/react";
import NextLink from "next/link";

const Navbar = () => {
	const userEmail = useAuthStore((state) => state.user?.email);
	const logout = useAuthStore((state) => state.logout);
	const isLoggedIn = !!userEmail;

	return (
		<Box bg="gray.400" p={4} color="white">
			<Flex maxW="1200px" mx="auto" align="center">
				<NextLink href="/">AtuMoto</NextLink>
				<Spacer />
				<Box marginRight="10px">
					{isLoggedIn && <Text>Zalogowany jako: {userEmail}</Text>}
				</Box>

				{isLoggedIn && <Button onClick={logout}>Wyloguj</Button>}

				{!isLoggedIn && (
					<Stack alignItems="center" direction="row" gap={4}>
						<NextLink href="/login">Zaloguj się</NextLink>
						<Separator orientation="vertical" height="4" />
						<NextLink href="/register">Zarejestruj się</NextLink>
					</Stack>
				)}
			</Flex>
		</Box>
	);
};

export default Navbar;
