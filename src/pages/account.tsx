import React, { useEffect } from "react";

import { Button, Input, VStack, Textarea, Switch, Box } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import supabase from "@/lib/supabase/supabase";
import { toaster } from "@/components/ui/toaster";
import { Field } from "@/components/ui/field";

import Select from "react-select";

import AuthWrapper from "@/components/common/AuthWrapper";

const schema = z.object({
	title: z.string().min(1, "Tytuł jest wymagany"),
	description: z.string().min(1, "Opis jest wymagany"),
	price: z
		.string()
		.min(1, "Cena jest wymagana")
		.transform((val) => {
			const parsed = Number(val);
			if (isNaN(parsed)) {
				throw new Error("Cena musi być liczbą");
			}
			return parsed;
		}),
	negotiation: z.boolean(),
	production_year: z
		.number()
		.min(1980, "Rok produkcji musi być większy niż 1980"),
});

// const currentproduction_year = new Date().getFullproduction_year();

// const production_years = [];
// for (let production_year = 1980; production_year <= currentproduction_year; production_year++) {
// 	production_years.push(production_year);
// }

const production_years = Array.from(
	{ length: 46 },
	(_, i) => 1980 + i
).reverse();

console.log(production_years);

type FormValues = {
	title: string;
	description: string;
	price: number;
	negotiation: boolean;
	production_year: number;
};

const Account = () => {
	const {
		control,
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		watch,
		setValue,
	} = useForm({
		defaultValues: {
			title: "test",
			description: "lorem opisu",
			price: 4900,
			negotiation: true,
			production_year: 0,
		},
		resolver: zodResolver(schema),
	});

	const watcher = watch();

	useEffect(() => {
		console.log("Log:watcher", watcher);
	}, [watcher]);

	const onSubmit = async (data: FormValues) => {
		toaster.create({
			description: "Oferta została dodana!",
			type: "success",
		});
		try {
			await supabase.from("offers").insert([
				{
					title: data.title,
					description: data.description,
					price: Number(data.price),
					negotiation: data.negotiation,
					production_year: data.production_year,
				},
			]);
			toaster.create({
				description: "Oferta została dodana!",
				type: "success",
			});
		} catch (error) {
			toaster.create({
				description: "Oferta nie została dodana!",
				type: "error",
			});
			console.error("Error adding offer", error);
		}
	};

	return (
		<AuthWrapper title="Dodaj ofertę">
			<form onSubmit={handleSubmit(onSubmit)}>
				<VStack display="flex" gap={4}>
					<Controller
						control={control}
						name="title"
						render={({ field }) => (
							<Field
								{...field}
								label="Tytuł"
								invalid={!!errors.title}
								errorText={errors.title?.message}
							>
								<Input type="text" placeholder="Wpisz tytuł" />
							</Field>
						)}
					/>
					<Controller
						control={control}
						name="description"
						render={({ field }) => (
							<Field
								{...field}
								label="Opis"
								invalid={!!errors.description}
								errorText={errors.description?.message}
							>
								<Textarea placeholder="Uzupełnij opis" />
							</Field>
						)}
					/>

					<Box display="flex" flexDir="column" w="full" gap={4}>
						<Controller
							control={control}
							name="price"
							render={({ field }) => (
								<Field
									{...field}
									label="Cena"
									invalid={!!errors.price}
									errorText={errors.price?.message}
								>
									<Input
										placeholder="Podaj Cenę"
										inputMode="numeric"
										pattern="[0-9]*"
									/>
								</Field>
							)}
						/>

						<Controller
							control={control}
							name="negotiation"
							render={({ field }) => (
								<Field {...field}>
									<Switch.Root>
										<Switch.HiddenInput />
										<Switch.Control>
											<Switch.Thumb />
										</Switch.Control>
										<Switch.Label>Do negocjacji</Switch.Label>
									</Switch.Root>
								</Field>
							)}
						/>

						<Field
							label="Rok produkcji"
							invalid={!!errors.production_year}
							errorText={errors.production_year?.message}
							w="full"
						>
							<Controller
								control={control}
								name="production_year"
								render={({ field }) => (
									<Select
										{...field}
										closeMenuOnSelect={true}
										styles={{
											container: (base) => ({
												...base,
												width: "100%",
											}),
										}}
										options={production_years.map((production_year) => ({
											label: production_year.toString(),
											value: production_year,
										}))}
										value={
											field.value
												? { label: field.value.toString(), value: field.value }
												: null
										}
										onChange={(selectedOption) => {
											field.onChange(
												selectedOption ? selectedOption.value : null
											);
										}}
									/>
								)}
							/>
						</Field>
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
