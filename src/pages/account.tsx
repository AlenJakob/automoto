import React from "react";

import { Button, Input, VStack, Textarea, Switch, Box } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import supabase from "@/lib/supabase/supabase";
import { toaster } from "@/components/ui/toaster";
import { Field } from "@/components/ui/field";
import AuthWrapper from "@/components/common/AuthWrapper";

const Account = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({
		defaultValues: {
			title: "test",
			description: "lorem opisu",
			price: 4900,
			negotiation: true,
		},
	});

	const onSubmit = async (data) => {
		const { error } = await supabase.from("offers").insert([
			{
				title: data.title,
				description: data.description,
				price: Number(data.price),
				negotiation: data.negotiation,
			},
		]);

		if (!error) {
			toaster.create({
				description: "Oferta została dodana!",
				type: "success",
			});
		} else {
			console.log(error);
		}
	};

	return (
		<AuthWrapper title="Dodaj ofertę">
			<form onSubmit={handleSubmit(onSubmit)}>
				<VStack display="flex" gap={4}>
					<Field
						label="Tytuł"
						invalid={!!errors.title}
						errorText={errors.title?.message}
					>
						<Input
							type="text"
							placeholder="Wpisz tytuł"
							{...register("title", { required: "Tytuł jest wymagany" })}
						/>
					</Field>

					<Field
						label="Opis"
						invalid={!!errors.description}
						errorText={errors.description?.message}
					>
						<Textarea
							placeholder="Uzupełnij opis"
							{...register("description", {
								required: "Opis jest wymagany",
							})}
						/>
					</Field>

					<Box display="flex" flexDir="column" w="full" gap={4}>
						<Field
							label="Cena"
							invalid={!!errors.price}
							errorText={errors.price?.message}
						>
							<Input
								placeholder="Podaj Cenę"
								{...register("price", {
									required: "Cena jest wymagane",
								})}
								inputMode="numeric"
								pattern="[0-9]*"
							/>
						</Field>
						<Switch.Root {...register("negotiation")}>
							<Switch.HiddenInput />
							<Switch.Control>
								<Switch.Thumb />
							</Switch.Control>
							<Switch.Label>Do negocjacji</Switch.Label>
						</Switch.Root>
					</Box>

					<Button
						colorScheme="blue"
						type="submit"
						loading={isSubmitting}
						w="full"
					>
						Zapisz
					</Button>
				</VStack>
			</form>
		</AuthWrapper>
	);
};

export default Account;
