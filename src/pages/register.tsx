import { Button, Input, VStack, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/router";
import supabase from "@/lib/supabase/supabase";
import { toaster } from "@/components/ui/toaster";
import { Field } from "@/components/ui/field";
import AuthWrapper from "@/components/common/AuthWrapper";

type LoginForm = {
	email: string;
	password: string;
};

const Register = () => {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginForm>();

	const [error, setError] = useState<string | null>(null);

	const onSubmit = async ({ email, password }: LoginForm) => {
		setError(null);

		const { data, error } = await supabase.auth.signUp({
			email,
			password,
		});

		if (error) {
			setError(error.message);
			return;
		}

		if (data?.user) {
			toaster.create({
				description: "Rejestracja powiodła się!",
				type: "success",
			});

			router.push("/dashboard");
		}
	};

	return (
		<AuthWrapper>
			<Text fontSize="xl" fontWeight="bold" textAlign="center" mb={4}>
				Rejestracja
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

					{error && <Text color="red.500">{error}</Text>}

					<Button
						colorScheme="blue"
						type="submit"
						loading={isSubmitting}
						w="full"
					>
						Zarejestruj
					</Button>
				</VStack>
			</form>
		</AuthWrapper>
	);
};

export default Register;
