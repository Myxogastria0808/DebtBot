import { REST, Routes } from 'discord.js';
import dotenv from 'dotenv';
import { checkIsString } from './types/index';

//.envファイルを読み込む
dotenv.config();

const token: string = checkIsString(process.env.TOKEN);
const applicationId: string = checkIsString(process.env.APPLICATIONID);
const guildId: string = checkIsString(process.env.GUILDID);

const rest = new REST({ version: '10' }).setToken(token);

//*特定のコマンドを削除する
//削除するコマンドID
const COMMANDID = 'delete command id';

// for guild-based commands
rest.delete(Routes.applicationGuildCommand(applicationId, guildId, COMMANDID))
    .then(() => console.log('Successfully deleted guild command'))
    .catch(console.error);

// for global commands
// rest.delete(Routes.applicationCommand(applicationId, COMMANDID))
//     .then(() => console.log('Successfully deleted application command'))
//     .catch(console.error);

//*全てのコマンドを削除する
// for guild-based commands
// rest.put(Routes.applicationGuildCommands(COMMANDID, guildId), { body: [] })
//     .then(() => console.log('Successfully deleted all guild commands.'))
//     .catch(console.error);

// // for global commands
// rest.put(Routes.applicationCommands(COMMANDID), { body: [] })
//     .then(() => console.log('Successfully deleted all application commands.'))
//     .catch(console.error);
