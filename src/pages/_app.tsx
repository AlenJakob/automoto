import { Provider } from "@/components/ui/provider";
import type { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Provider>
			<Component {...pageProps} />
		</Provider>
	);
}
