import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Button } from '@mui/material';
import PersonalForm from '../forms/personal';
import { AddressInfo, PaymentInfo, PersonalInfo } from 'model/information';
import AddressForm from '../forms/address';
import PaymentForm from '../forms/payment';
import { CheckoutInput } from 'dh-marvel/features/checkout/checkout.types';

const steps = [{
    label:'Datos personales'
},
{
    label:'Entrega'
},
{
    label:'Pago'
}];

interface MyStepperProps {
    getData: (data: CheckoutInput) => void;
}

export default function MyStepper({getData}: MyStepperProps) {
    const [activeStep, setActiveStep] = React.useState(0);
    const [CheckoutData, setCheckoutData] = React.useState<CheckoutInput>({
        customer: {
            name: "",
            lastname: "",
            email: "",
            address: {
                address1: "",
                address2: "",
                city: "",
                state: "",
                zipCode: "",
            },
        },  
        card: {
            nameOnCard: "",
            number: "",
            cvc: "",
            expDate: ""
        },
        order: {
            name: "",
            image: "",
            price: 0
        }
    })
    
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const getFromPersonal = (data: PersonalInfo) => {
        setCheckoutData(prev => ({...prev, personalInfo: data}))
    }

    const getFromAddress = (data: AddressInfo) => {
        setCheckoutData(prev => ({...prev, addressInfo: data}))
    }

    const getFromPayment = (data: PaymentInfo) => {
        setCheckoutData(prev => ({...prev, paymentInfo: data}))
    }


    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const handleCheckoutdata = () => {

    }

    return (
        <Box sx={{ width: '100%', flex: '1' }}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((step) => {
                    const stepProps: { completed?: boolean } = {};
                    return (
                        <Step key={step.label}>
                            <StepLabel>{step.label}</StepLabel>
                        </Step>
                    )
                })}
            </Stepper>
            {activeStep === steps.length ? (
        <React.Fragment>
          <PaymentForm getFromPayment={getFromPayment} handleNext={handleNext} />
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleBack}>Volver</Button>
            <Button onClick={handleReset}>Reset</Button>
            <Button onClick={handleCheckoutdata}>Confirmar</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
            {activeStep == 0 ? 
            <PersonalForm getFromPersonal={getFromPersonal} handleNext={handleNext} />
            : <AddressForm getFromAddress={getFromAddress} handleNext={handleNext} />}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            </Box>
        </React.Fragment>
      )}
        </Box>
    );
}