import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { checkIsString, checkIsStringAndParseInt } from './types/env';
import dotenv from 'dotenv';
import { debt, user } from './routes/index';

dotenv.config();

const port: number = checkIsStringAndParseInt(process.env.PORT);
const ipaddress: string = checkIsString(process.env.IPADDRESS);

const app = new Hono();

app.route('/user', user);
app.route('/debt', debt);

console.log(`Server is running on port http://${ipaddress}:${port}`);

serve({
    fetch: app.fetch,
    port,
});
