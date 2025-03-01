"use client";
import { defaultSystem } from "@chakra-ui/react"
import { ChakraProvider } from "@chakra-ui/react";
import { ReactNode } from "react";

interface ProvidersProps {
	children: ReactNode;
}

export function Provider({ children }: ProvidersProps) {
	return <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>;
}
