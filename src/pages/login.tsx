import { Box, Button, Input, VStack, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/router";
import supabase from "@/lib/supabase/supabase";
import { toaster } from "@/components/ui/toaster";
import { Field } from "@/components/ui/field";

type LoginForm = {
	email: string;
	password: string;
};

const errorLoginMessage = (message?: string) => {
	if (!message) {
		return;
	}
	if (message === "Invalid login credentials") {
		return "Nieprawidłowy e-mail lub hasło. Spróbuj ponownie.";
	}
	return "Coś poszło nie tak, spróbuj ponownie później.";
};

const Login = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginForm>();
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();

	const onSubmit = async ({ email, password }: LoginForm) => {
		setError(null);

		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			setError(error.message);
			return;
		}

		if (data?.user) {
			toaster.create({
				description: "Zalogowano pomyślnie!",
				type: "success",
			});

			router.push("/dashboard");
		}
	};

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
			<Text fontSize="xl" fontWeight="bold" textAlign="center" mb={4}>
				Logowanie
			</Text>
			<form onSubmit={handleSubmit(onSubmit)}>
				<VStack>
					<Field
						label="Email"
						invalid={!!errors.email}
						errorText={errors.email?.message}
					>
						<Input
							type="email"
							placeholder="Wpisz email"
							{...register("email", { required: "Email jest wymagany" })}
						/>
					</Field>

					<Field
						label="Hasło"
						invalid={!!errors.password}
						errorText={errors.password?.message}
					>
						<Input
							type="password"
							placeholder="Wpisz hasło"
							{...register("password", {
								required: "Hasło jest wymagane",
								minLength: {
									value: 6,
									message: "Hasło musi mieć min. 6 znaków",
								},
							})}
						/>
					</Field>

					{error && <Text color="red.500">{errorLoginMessage(error)}</Text>}

					<Button
						colorScheme="blue"
						type="submit"
						loading={isSubmitting}
						w="full"
					>
						Zaloguj się
					</Button>
				</VStack>
			</form>
		</Box>
	);
};

export default Login;
