import { Box, Text } from "@chakra-ui/react";
import React, { ReactNode } from "react";

const AuthWrapper = ({
	children,
	title,
}: {
	children: ReactNode;
	title?: string;
}) => {
	return (
		<Box
			w="100%"
			maxW="500px"
			mx="auto"
			mt={10}
			p={5}
			borderWidth={1}
			borderRadius="lg"
		>
			{title && (
				<Text fontSize="xl" fontWeight="bold" textAlign="center" mb={4}>
					{title}
				</Text>
			)}
			{children}
		</Box>
	);
};

export default AuthWrapper;
