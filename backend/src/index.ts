import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { checkIsString, checkIsStringAndParseInt } from './types/env';
import dotenv from 'dotenv';
import { debt, user } from './routes/index';
import { cors } from 'hono/cors';

dotenv.config();

const port: number = checkIsStringAndParseInt(process.env.PORT);
const ipaddress: string = checkIsString(process.env.IPADDRESS);

const app = new Hono();

app.use(
    '/*',
    cors({
        origin: ['*'],
        allowHeaders: ['*'],
        // allowMethods: ['GET', 'POST', 'PATCH'],
        exposeHeaders: ['*'],
        credentials: true,
    })
);

app.route('/user', user);
app.route('/debt', debt);

app.get('/', async (c) => {
    return c.text('Hello, World!');
});

console.log(`Server is running on port http://${ipaddress}:${port}`);

serve({
    fetch: app.fetch,
    port,
});
