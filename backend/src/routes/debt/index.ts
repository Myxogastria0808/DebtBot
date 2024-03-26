import { Hono } from 'hono';
import dotenv from 'dotenv';
import { userExistValidator } from '../../db/src/user';
import { changePayOff, checkDebtAmount, createDebt } from '../../db/src/debt';
import { AmountDataType } from '../../db/types';
import { checkIsString } from '../../types/env';

dotenv.config();

const router = new Hono();

const configGuildId = checkIsString(process.env.GUILDID);

router.post('/create', async (c) => {
    const authorizationData: string | undefined = c.req.header('Authorization');
    if (typeof authorizationData !== 'undefined') {
        const splitAuthorizationData: string[] = authorizationData?.split(' ', 2);
        const discordId: string = splitAuthorizationData[0];
        const guildId: string = splitAuthorizationData[1];
        const { lend, money, borrow } = await c.req.json<{ lend: string; money: number; borrow: string }>();
        if ((await userExistValidator(discordId)) && guildId === configGuildId) {
            const debtId: number = await createDebt(money, lend, borrow);
            return c.json({ authorization: 'You are authorized!', debtId: debtId });
        } else {
            return c.json({ authorization: 'You are an unauthorized user.' });
        }
    } else {
        return c.json({ authorization: 'header is undefined' });
    }
});

router.patch('/pay-off', async (c) => {
    const authorizationData: string | undefined = c.req.header('Authorization');
    if (typeof authorizationData !== 'undefined') {
        const splitAuthorizationData: string[] = authorizationData?.split(' ', 2);
        const discordId: string = splitAuthorizationData[0];
        const guildId: string = splitAuthorizationData[1];
        const { debtId } = await c.req.json<{ debtId: number }>();
        if ((await userExistValidator(discordId)) && guildId === configGuildId) {
            await changePayOff(debtId);
            return c.json({ authorization: 'You are authorized!', debtId: debtId });
        } else {
            return c.json({ authorization: 'You are an unauthorized user.' });
        }
    } else {
        return c.json({ authorization: 'header is undefined' });
    }
});

router.post('/amount', async (c) => {
    const authorizationData: string | undefined = c.req.header('Authorization');
    if (typeof authorizationData !== 'undefined') {
        const splitAuthorizationData: string[] = authorizationData?.split(' ', 2);
        const discordId: string = splitAuthorizationData[0];
        const guildId: string = splitAuthorizationData[1];
        const { discordUserId } = await c.req.json<{ discordUserId: string }>();
        if ((await userExistValidator(discordId)) && guildId === configGuildId) {
            const amount: AmountDataType = await checkDebtAmount(discordUserId);
            return c.json({ authorization: 'You are authorized!', amount });
        } else {
            return c.json({ authorization: 'You are an unauthorized user.' });
        }
    } else {
        return c.json({ authorization: 'header is undefined' });
    }
});

export default router;
