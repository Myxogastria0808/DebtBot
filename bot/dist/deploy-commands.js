"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const dotenv_1 = __importDefault(require("dotenv"));
const index_1 = require("./types/index");
const slashcommands_1 = require("./commands/utilities/slashcommands");
dotenv_1.default.config();
const commands = [
    slashcommands_1.registerUser.data.toJSON(),
    slashcommands_1.deleteUser.data.toJSON(),
    slashcommands_1.approvalCommand.data.toJSON(),
];
const token = (0, index_1.checkIsString)(process.env.TOKEN);
const applicationId = (0, index_1.checkIsString)(process.env.APPLICATIONID);
const guildId = (0, index_1.checkIsString)(process.env.GUILDID);
const rest = new discord_js_1.REST({ version: '10' }).setToken(token);
//Discordサーバーにコマンドを登録
const registerCommands = (async () => {
    try {
        const registeredCommands = await rest.put(discord_js_1.Routes.applicationGuildCommands(applicationId, guildId), {
            body: commands,
        });
        console.log(registeredCommands);
    }
    catch (error) {
        console.error(error);
    }
})();
