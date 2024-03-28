import React from 'react';
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { addressSchema } from 'model/formSchema';
import { AddressInfo } from 'model/information';
import { Typography, FormControl, InputLabel, Select, MenuItem, Box, Button } from '@mui/material';
import MyInput from 'dh-marvel/components/utils/input';

interface AddressFormProps {
    getFromAddress: (info: AddressInfo) => void,
    handleNext: () => void;
}

const AddressForm = ({ getFromAddress, handleNext }: AddressFormProps) => {

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
        getFromAddress(data);
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
                defaultValue = ""
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