export interface PersonalInfo {
    name: string,
    lastName: string,
    email: string
}

export interface AddressInfo {
    address: string,
    apt?: string | undefined,
    city: string,
    provincia: string,
    zip: string
}

export interface PaymentInfo {
    cardNumber: string,
    cardName: string,
    expDate: string,
    cvv: string
}