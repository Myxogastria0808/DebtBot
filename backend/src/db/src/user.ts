import { PrismaClient } from '@prisma/client';
import { UserDataType } from 'types';

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

export { registerUser, userExistValidator, deleteUser };
