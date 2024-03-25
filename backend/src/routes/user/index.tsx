import { Hono } from 'hono';
import { checkIsString, checkIsStringAndParseInt } from '../../types/env';
import dotenv from 'dotenv';
import { titleClass, nameClass } from '../../components/css';
import { meta } from '../../types/meta';
import { tokenDataType, discordDataType } from '../../types/discord';
import { registerUser, userExistValidator, deleteUser } from '../../db/src/user';
import { Base } from '../../components';

dotenv.config();

const router = new Hono();

const port: number = checkIsStringAndParseInt(process.env.PORT);
const ipaddress: string = checkIsString(process.env.IPADDRESS);
const registerRedirectUrl: string = `http://${ipaddress}:${port}/user/register`;
const deleteRedirectUrl: string = `http://${ipaddress}:${port}/user/delete`;

const clientId: string = checkIsString(process.env.CLIENTID);
const clientSecret: string = checkIsString(process.env.CLIENTSECRET);

router.get('/register', async (c) => {
    //* ***************************************//
    //codeを取得する
    const code: string | undefined = c.req.query('code');
    //* ***************************************//
    if (typeof code == 'undefined') {
        //codeが取得できなかった場合
        console.log('========================================');
        console.log('/user/register');
        return c.html(
            <>
                <Base meta={meta}>
                    <>
                        <h1 className={titleClass}>OAuth authentication failed.</h1>
                    </>
                </Base>
            </>
        );
    } else {
        try {
            //* ***************************************//
            const body = `client_id=${clientId}&client_secret=${clientSecret}&grant_type=authorization_code&code=${code}&redirect_uri=${registerRedirectUrl}`;
            //トークンを取得する
            const tokenData = await fetch('https://discordapp.com/api/oauth2/token', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body,
            });
            const IncludesToken: tokenDataType = await tokenData.json();
            const token: string = IncludesToken.access_token;
            //* ***************************************//
            //ユーザーIDを取得する
            const discordData = await fetch('https://discordapp.com/api/users/@me', {
                method: 'GET',
                headers: { Authorization: `Bearer ${token}` },
            });
            const discord: discordDataType = await discordData.json();
            //* ***************************************//
            //* ***************************************//
            //ユーザーが存在するかどうかチェック
            const validator: boolean = await userExistValidator(discord.id);
            if (!validator) {
                //ユーザーの登録
                await registerUser(discord.id, discord.username);
            } else {
                return c.html(
                    <>
                        <Base meta={meta}>
                            <h1 className={titleClass}>{discord.username} is already exists.</h1>
                        </Base>
                    </>
                );
            }
            //* ***************************************//
            return c.html(
                <>
                    <Base meta={meta}>
                        <>
                            <h1 class={titleClass}>OAuth authentication succeeded.</h1>
                            <h2 class={nameClass}>{discord.username}</h2>
                        </>
                    </Base>
                </>
            );
        } catch (_e) {
            return c.html(
                <>
                    <Base meta={meta}>
                        <h1 class={titleClass}>OAuth authentication failed.</h1>
                    </Base>
                </>
            );
        }
    }
});

router.get('/delete', async (c) => {
    //* ***************************************//
    //codeを取得する
    const code: string | undefined = c.req.query('code');
    //* ***************************************//
    if (typeof code == 'undefined') {
        //codeが取得できなかった場合
        console.log('========================================');
        console.log('/user/delete');
        return c.html(
            <>
                <Base meta={meta}>
                    <h1 class={titleClass}>OAuth authentication failed.</h1>
                </Base>
            </>
        );
    } else {
        try {
            //* ***************************************//
            const body = `client_id=${clientId}&client_secret=${clientSecret}&grant_type=authorization_code&code=${code}&redirect_uri=${deleteRedirectUrl}`;
            //トークンを取得する
            const tokenData = await fetch('https://discordapp.com/api/oauth2/token', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body,
            });
            const IncludesToken: tokenDataType = await tokenData.json();
            const token: string = IncludesToken.access_token;
            //* ***************************************//
            //ユーザーIDを取得する
            const discordData = await fetch('https://discordapp.com/api/users/@me', {
                method: 'GET',
                headers: { Authorization: `Bearer ${token}` },
            });
            const discord: discordDataType = await discordData.json();
            //* ***************************************//
            //* ***************************************//
            const validator: boolean = await userExistValidator(discord.id);
            if (validator) {
                try {
                    //ユーザーの削除
                    await deleteUser(discord.id);
                } catch (_e: any) {
                    return c.html(
                        <>
                            <Base meta={meta}>
                                <h1 class={titleClass}>{discord.username} can not delete user data.</h1>
                            </Base>
                        </>
                    );
                }
                return c.html(
                    <>
                        <Base meta={meta}>
                            <h1 class={titleClass}>{discord.username} successfully deleted.</h1>
                        </Base>
                    </>
                );
            } else {
                return c.html(
                    <>
                        <Base meta={meta}>
                            <h1 class={titleClass}>{discord.username} is not registered.</h1>
                        </Base>
                    </>
                );
            }
            //* ***************************************//
        } catch (_e) {
            return c.html(
                <>
                    <Base meta={meta}>
                        <h1 class={titleClass}>OAuth authentication failed.</h1>
                    </Base>
                </>
            );
        }
    }
});

export default router;
