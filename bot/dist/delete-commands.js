"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const dotenv_1 = __importDefault(require("dotenv"));
const index_1 = require("./types/index");
//.envファイルを読み込む
dotenv_1.default.config();
const token = (0, index_1.checkIsString)(process.env.TOKEN);
const applicationId = (0, index_1.checkIsString)(process.env.APPLICATIONID);
const guildId = (0, index_1.checkIsString)(process.env.GUILDID);
const rest = new discord_js_1.REST({ version: '10' }).setToken(token);
//*特定のコマンドを削除する
//削除するコマンドID
const COMMANDID = 'delete command id';
// for guild-based commands
rest.delete(discord_js_1.Routes.applicationGuildCommand(applicationId, guildId, COMMANDID))
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
