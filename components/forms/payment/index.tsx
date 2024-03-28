import React, { ChangeEvent, useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { paymentSchema } from 'model/formSchema';
import { PaymentInfo } from 'model/information';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import Cards, { ReactCreditCardsProps } from 'react-credit-cards-2';
import MyInput from 'dh-marvel/components/utils/input';
import { Box, Button, Typography } from '@mui/material';
import { useCheckout } from 'context';

interface Props {
    confirmation: () => void;
}
const PaymentForm = ({confirmation}: Props) => {

    const { checkoutData, setCheckoutData } = useCheckout();

    type DataForm = yup.InferType<typeof paymentSchema>;

    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm<DataForm>({
        resolver: yupResolver(paymentSchema),
        mode: "onChange",
        defaultValues: {
            cardNumber: "",
            cardName: "",
            expDate: "",
            cvv: ""
        },
    });

    const onSubmit = (data: DataForm) => {
        const newData = checkoutData;
        newData.card.nameOnCard = data.cardName;
        newData.card.number = data.cardNumber;
        newData.card.expDate = data.expDate;
        newData.card.cvc = data.cvv;
        setCheckoutData(newData)
        confirmation();
    };

    const [dateValue, setDateValue] = useState("")

    const [state, setState] = useState<ReactCreditCardsProps>({
        number: '',
        expiry: '',
        cvc: '',
        name: '',
        focused: "",
    });

    const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = evt.target;

        setState((prev) => ({ ...prev, [name]: value }));
    }

    const handleInputFocus = (evt: ChangeEvent<HTMLInputElement>) => {
        setState((prev) => ({ ...prev, focus: evt.target.name }));
    }

    const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value.replace(/\D/g, ''); // Remueve todos los caracteres que no son dígitos
        const formattedValue = inputValue.replace(/(\d{2})(\d{2})/, '$1/$2'); // Divide los 4 números en dos grupos de 2 y agrega el slash (/) entre ellos
        setDateValue(formattedValue);
    };

    const handleDateInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
        handleDateInputChange(evt);
        handleDateChange(evt);
    }

    return (
        <div>
            <Cards
                number={state.number}
                expiry={state.expiry}
                cvc={state.cvc}
                name={state.name}
                focused={state.focused}
            />
            <form onSubmit={handleSubmit(onSubmit)}>
                <MyInput
                    name='cardNumber'
                    control={control}
                    defaultValue=''
                    type='text'
                    label='Número de tarjeta'
                    required
                    value={state.number}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                />
                <Typography variant="caption" color="error">
                    {errors.cardNumber?.message}
                </Typography>
                <MyInput
                    name='cardName'
                    control={control}
                    defaultValue=''
                    type='text'
                    label='Nombre como figura en la tarjeta'
                    required
                    value={state.name}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                />
                <Typography variant="caption" color="error">
                    {errors.cardName?.message}
                </Typography>
                <MyInput
                    name='expDate'
                    control={control}
                    defaultValue=''
                    type='text'
                    label='Fecha de vencimiento'
                    required
                    value={dateValue}
                    onChange={handleDateInputChange}
                    onFocus={handleInputFocus}
                />
                <Typography variant="caption" color="error">
                    {errors.expDate?.message}
                </Typography>
                <MyInput
                    name='cvv'
                    control={control}
                    defaultValue=''
                    type='password'
                    label='Código de seguridad'
                    required
                    value={state.cvc}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                />
                <Typography variant="caption" color="error">
                    {errors.cvv?.message}
                </Typography>
                <Box sx={{ mt: 2 }}>
                    <Button fullWidth type="submit" variant="contained" color="primary">
                        Enviar
                    </Button>
                </Box>
            </form>
        </div>
    );
}

export default PaymentForm