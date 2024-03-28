import React from 'react';
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { addressSchema } from 'model/formSchema';
import { AddressInfo } from 'model/information';
import { Typography, FormControl, InputLabel, Select, MenuItem, Box, Button } from '@mui/material';
import MyInput from 'dh-marvel/components/utils/input';
import { useCheckout } from 'context';

interface AddressFormProps {
    handleNext: () => void;
}

const AddressForm = ({ handleNext }: AddressFormProps) => {

    const { checkoutData, setCheckoutData } = useCheckout();

    type DataForm = yup.InferType<typeof addressSchema>;

    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm<DataForm>({
        resolver: yupResolver(addressSchema),
        mode: "onChange",
        defaultValues: {
            address: "",
            apt: "",
            city: "",
            provincia: "",
            zip: ""
        },
    });

    const onSubmit = (data: DataForm) => {
        const newData = checkoutData;
        newData.customer.address.address1 = data.address;
        if (data.apt) {
            newData.customer.address.address2 = data.apt;
        }
        newData.customer.address.city = data.city;
        newData.customer.address.state = data.provincia;
        newData.customer.address.zipCode = data.zip;
        setCheckoutData(newData)
        handleNext();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <MyInput
                name="address"
                label="Dirección"
                type="text"
                control={control}
                defaultValue=""
                required
            />

            <Typography variant="caption" color="error">
                {errors.address?.message}
            </Typography>

            <MyInput
                name="apt"
                label="Departamento"
                type="text"
                control={control}
                defaultValue=""
                required={false}
            />

            <Typography variant="caption" color="error">
                {errors.apt?.message}
            </Typography>

            <MyInput
                name="city"
                label="Ciudad"
                type="text"
                control={control}
                defaultValue=""
                required
            />

            <Typography variant="caption" color="error">
                {errors.city?.message}
            </Typography>

            <MyInput
                name="provincia"
                label="Provincia"
                type="text"
                control={control}
                defaultValue=""
                required
            />

            <Typography variant="caption" color="error">
                {errors.provincia?.message}
            </Typography>

            <MyInput
                name="zip"
                label="C{odigo Postal"
                type="text"
                control={control}
                defaultValue=""
                required
            />

            <Typography variant="caption" color="error">
                {errors.zip?.message}
            </Typography>

            <Box sx={{ mt: 2 }}>
                <Button fullWidth type="submit" variant="contained" color="primary">
                    Siguiente
                </Button>
            </Box>
        </form>
    )
}

export default AddressForm