import React from 'react';
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { personalSchema } from 'model/formSchema';
import { PersonalInfo } from 'model/information';
import { Typography, Box, Button } from '@mui/material';
import MyInput from 'dh-marvel/components/utils/input';
import { useCheckout } from 'context';
import { CheckoutInput } from 'dh-marvel/features/checkout/checkout.types';

interface PersonalFormProps {
    handleNext: () => void;
}

const PersonalForm = ({handleNext}: PersonalFormProps) => {

    const { checkoutData, setCheckoutData } = useCheckout();
    
    type DataForm = yup.InferType<typeof personalSchema>;

    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm<DataForm>({
        resolver: yupResolver(personalSchema),
        mode: "onChange",
        defaultValues: {
            name: "",
            lastName: "",
            email: ""
        },
    });

    const onSubmit = (data: DataForm) => {
        const customer = checkoutData;
        customer.customer.name = data.name;
        customer.customer.lastname = data.lastName;
        customer.customer.email = data.email;
        setCheckoutData(customer)
        handleNext();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <MyInput
                name="name"
                label="Nombre"
                type="text"
                control={control}
                defaultValue=""
                required
            />

            <Typography variant="caption" color="error">
                {errors.name?.message}
            </Typography>

            <MyInput
                name="lastName"
                label="Apellido"
                type="text"
                control={control}
                defaultValue=""
                required
            />

            <Typography variant="caption" color="error">
                {errors.lastName?.message}
            </Typography>

            <MyInput
                name="email"
                label="Correo"
                type="email"
                control={control}
                defaultValue=""
                required
            />

            <Typography variant="caption" color="error">
                {errors.email?.message}
            </Typography>

            <Box sx={{ mt: 2 }}>
                <Button fullWidth type="submit" variant="contained" color="primary">
                    Enviar
                </Button>
            </Box>
        </form>
    )
}

export default PersonalForm