import { CheckoutInput } from 'dh-marvel/features/checkout/checkout.types';
import React, { createContext, useContext, useState, ReactNode } from 'react';


// Definir el tipo para el contexto
type CheckoutContextType = {
  checkoutData: CheckoutInput;
  setCheckoutData: (data: CheckoutInput) => void;
}

// Crear el contexto
const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

// Crear un proveedor del contexto para envolver componentes que necesiten acceder a los datos de checkout
export const CheckoutProvider = ({ children }: any) => {
  const [checkoutData, setCheckoutData] = useState<CheckoutInput>({customer: {
    name: "",
    lastname: "",
    email: "",
    address: {
        address1: "",
        address2: "",
        city: "",
        state: "",
        zipCode: ""
    }
},
card: {
    number: "",
    cvc: "",
    expDate: "",
    nameOnCard: ""
},
order: {
    name: "",
    image: "",
    price: 0
}});

  return (
    <CheckoutContext.Provider value={{ checkoutData, setCheckoutData }}>
      {children}
    </CheckoutContext.Provider>
  );
};

// Crear un hook personalizado para acceder al contexto
export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error('useCheckout debe ser usado dentro de un CheckoutProvider');
  }
  return context;
};
