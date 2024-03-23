import { PrismaClient } from '@prisma/client';
import { UserDataType, DebtDataType } from 'types';

const prisma = new PrismaClient();

const registerUser = async (discordId: string, discordUsername: string): Promise<void> => {
    const user: UserDataType = await prisma.user.create({
        data: {
            discordId,
            discordUsername,
        },
    });
};

const userExistValidator = async (discordId: string): Promise<boolean> => {
    const user: UserDataType | null = await prisma.user.findFirst({
        where: {
            discordId,
        },
    });
    if (user !== null) {
        return true;
    } else {
        return false;
    }
};

const deleteUser = async (discordId: string): Promise<void> => {
    const user: UserDataType = await prisma.user.delete({
        where: {
            discordId,
        },
    });
};

const createDebt = async (money: number, lendId: string, borrowId: string) => {
    const debt: DebtDataType = await prisma.debt.create({
        data: {
            money,
            isPayOff: false,
            lendId,
            borrowId,
        },
    });
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

const resetPayOff = async (id: number) => {
    const debt: DebtDataType = await prisma.debt.update({
        where: {
            id,
        },
        data: {
            isPayOff: false,
        },
    });
};

const deleteDebt = async (id: number) => {
    const debt: DebtDataType = await prisma.debt.delete({
        where: {
            id,
        },
    });
};

export { registerUser, userExistValidator, deleteUser };

////////////////////////////////////////////

// const debtCreate = async () => {
//     const debt = await prisma.debt.createMany({
//         data: [
//             {
//                 money: 120,
//                 lendId: 792738692208394200,
//                 borrowId: 9876543210987654,
//             },
//             {
//                 money: 10,
//                 lendId: 9876543210987654,
//                 borrowId: 792738692208394200,
//             },
//             {
//                 money: 10,
//                 lendId: 792738692208394200,
//                 borrowId: 9876543210987654,
//             },
//         ],
//     });
// };

// debtCreate();

// const debtDelete = async () => {
//     const debt = await prisma.debt.delete({
//         where: {
//             id: 6,
//         },
//     });
// };

// debtDelete();
