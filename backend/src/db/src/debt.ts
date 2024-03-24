import { PrismaClient } from '@prisma/client';
import { AmountDataType, DebtDataType } from 'types';

const prisma = new PrismaClient();

const createDebt = async (money: number, lendId: string, borrowId: string): Promise<number> => {
    const debt: DebtDataType = await prisma.debt.create({
        data: {
            money,
            isPayOff: false,
            lendId,
            borrowId,
        },
    });
    return debt.id;
};

const changePayOff = async (id: number) => {
    const debt: DebtDataType = await prisma.debt.update({
        where: {
            id,
        },
        data: {
            isPayOff: true,
        },
    });
};

const cancelPayOff = async (id: number) => {
    const debt: DebtDataType = await prisma.debt.update({
        where: {
            id,
        },
        data: {
            isPayOff: false,
        },
    });
};

const checkDebtAmount = async (discordId: string): Promise<AmountDataType> => {
    const debt: DebtDataType[] = await prisma.debt.findMany({
        where: {
            borrowId: discordId,
        },
    });
    let amount: AmountDataType = [];
    debt.forEach((debtData) => {
        let isHit: boolean = false;
        amount.forEach((eachAmount) => {
            if (eachAmount.lendId === debtData.lendId) {
                eachAmount.amount += debtData.money;
                isHit = true;
            }
        });
        if (!isHit) {
            amount.push({ lendId: debtData.lendId, amount: debtData.money });
        }
    });
    return amount;
};

const deleteDebt = async (id: number) => {
    const debt: DebtDataType = await prisma.debt.delete({
        where: {
            id,
        },
    });
};

export { createDebt, changePayOff, checkDebtAmount, deleteDebt };
