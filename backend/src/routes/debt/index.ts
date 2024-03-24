import { Hono } from 'hono';
import dotenv from 'dotenv';
import { userExistValidator } from '../../db/src/user';
import { changePayOff, checkDebtAmount, createDebt } from '../../db/src/debt';
import { AmountDataType } from '../../db/types';

dotenv.config();

const router = new Hono();

router.post('/create', async (c) => {
    const discordId: string | undefined = c.req.header('Authorization');
    const { lend, money, borrow } = await c.req.json<{ lend: string; money: number; borrow: string }>();
    if (typeof discordId !== 'undefined') {
        if (await userExistValidator(discordId)) {
            console.log(`lend: ${lend}, money: ${money}, borrow: ${borrow}`);
            const debtId: number = await createDebt(money, lend, borrow);
            return c.json({ authorization: 'You are authorized!', debtId: debtId });
        } else {
            return c.json({ authorization: 'You are an unauthorized user.' });
        }
    } else {
        return c.json({ authorization: 'header is undefined' });
    }
});

router.post('/pay-off', async (c) => {
    const discordId: string | undefined = c.req.header('Authorization');
    const { debtId } = await c.req.json<{ debtId: number }>();
    if (typeof discordId !== 'undefined') {
        if (await userExistValidator(discordId)) {
            console.log(`debtId: ${debtId}`);
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
    const discordId: string | undefined = c.req.header('Authorization');
    const { discordUserId } = await c.req.json<{ discordUserId: string }>();
    if (typeof discordId !== 'undefined') {
        if (await userExistValidator(discordId)) {
            console.log(`debtId: ${discordUserId}`);
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
