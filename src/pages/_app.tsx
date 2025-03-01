import AuthProvider from "@/components/auth/AuthProvider";
import Navbar from "@/components/ui/layout/Navbar";
import { Provider } from "@/components/ui/provider";
import type { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Provider>
			<AuthProvider>
				<Navbar />
				<Component {...pageProps} />
			</AuthProvider>
		</Provider>
	);
}
