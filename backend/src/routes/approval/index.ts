import { Hono } from 'hono';
import dotenv from 'dotenv';
import { userExistValidator } from '../../db/orm';

dotenv.config();

const router = new Hono();

router.post('/', async (c) => {
    const discordId: string | undefined = c.req.header('Authorization');
    if (typeof discordId !== 'undefined') {
        if (await userExistValidator(discordId)) {
            return c.json({ authorization: 'You are authorized!' });
        } else {
            return c.json({ authorization: 'You are an unauthorized user.' });
        }
    } else {
        return c.json({ authorization: 'header is undefined' });
    }
});

export default router;
