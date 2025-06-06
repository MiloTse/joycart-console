type CartItemType = {
    productId: string;
    imgUrl: string;
    weight: string;
    title: string;
    price: number;
    count: number;
    selected?: boolean;
}

export type ResponseDataType = {
    balance: number;
    timeRange: Array<Array<{
        label: string;
        value: string;
    }>>;
    address: AddressItemType;
    time: Array<string>;
    total: number;
    shop: Array<{
        shopId: string;
        shopName: string;
        cartList: Array<CartItemType>;
    }>
}

export type ResponseType ={
    success: boolean;
    data: ResponseDataType;
};

export type AddressItemType = {
    id: string;
    name: string;
    phone: string;
    address: string;
}

export type AddressResponseType ={
    success: boolean;
    data: Array<AddressItemType>;
};

export type PaymentResponseType ={
    success: boolean;
    data: boolean;
};
