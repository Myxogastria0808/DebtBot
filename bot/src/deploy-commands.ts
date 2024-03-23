import { REST, Routes, RESTPostAPIChatInputApplicationCommandsJSONBody } from 'discord.js';
import dotenv from 'dotenv';
import { checkIsString } from './types/index';
import { registerUser, deleteUser, approvalCommand } from './commands/utilities/slashcommands';

dotenv.config();

const commands: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [
    registerUser.data.toJSON(),
    deleteUser.data.toJSON(),
    approvalCommand.data.toJSON(),
];

const token: string = checkIsString(process.env.TOKEN);
const applicationId: string = checkIsString(process.env.APPLICATIONID);
const guildId: string = checkIsString(process.env.GUILDID);

const rest = new REST({ version: '10' }).setToken(token);

//Discordサーバーにコマンドを登録
const registerCommands = (async () => {
    try {
        const registeredCommands = await rest.put(Routes.applicationGuildCommands(applicationId, guildId), {
            body: commands,
        });
        console.log(registeredCommands);
    } catch (error) {
        console.error(error);
    }
})();
