type createDebtAuthorizationDataType = {
    authorization: string;
    debtId?: number;
};

type AmountDataType = { lendId: string; amount: number }[];

type amountDebtAuthorizationDataType = {
    authorization: string;
    amount?: AmountDataType;
};

export { createDebtAuthorizationDataType, amountDebtAuthorizationDataType, AmountDataType };
