import { Box } from "@chakra-ui/react/box";
import React, { ReactNode } from "react";

const AuthWrapper = ({ children }: { children: ReactNode }) => {
	return (
		<Box
			w="100%"
			maxW="400px"
			mx="auto"
			mt={10}
			p={5}
			borderWidth={1}
			borderRadius="lg"
		>
			{children}
		</Box>
	);
};

export default AuthWrapper;
