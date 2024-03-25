import { PrismaClient } from '@prisma/client';
import { DebtDataType, deleteUserResultType, UserDataType } from 'types';

const prisma = new PrismaClient();

const registerUser = async (discordId: string, discordUsername: string): Promise<void> => {
    await prisma.user.create({
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

const deleteUser = async (discordId: string): Promise<deleteUserResultType> => {
    const isActive: DebtDataType | null = await prisma.debt.findFirst({
        where: {
            OR: [
                {
                    lendId: discordId,
                    isPayOff: false,
                },
                {
                    borrowId: discordId,
                    isPayOff: false,
                },
            ],
        },
    });
    //対象のdiscordIdのユーザーがすべてのPayOffがtrue or 一度も貸し借りしていないのであれば削除する
    if (isActive === null) {
        await prisma.debt.deleteMany({
            where: {
                OR: [
                    {
                        lendId: discordId,
                    },
                    {
                        borrowId: discordId,
                    },
                ],
            },
        });
        await prisma.user.delete({
            where: {
                discordId,
            },
        });
        return 'success';
    } else {
        return 'failed';
    }
};

export { registerUser, userExistValidator, deleteUser };
