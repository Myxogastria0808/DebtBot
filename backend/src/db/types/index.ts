type UserDataType = {
    discordId: string;
    discordUsername: string;
    createdAt: Date;
    updatedAt: Date;
};

type DebtDataType = {
    id: number;
    money: number;
    isPayOff: boolean;
    createdAt: Date;
    updatedAt: Date;
    lendId: string;
    borrowId: string;
};

type AmountDataType = { lendId: string; amount: number }[];

export { UserDataType, DebtDataType, AmountDataType };
