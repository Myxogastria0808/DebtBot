"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const dotenv_1 = __importDefault(require("dotenv"));
const slashcommands_1 = require("./commands/utilities/slashcommands");
dotenv_1.default.config();
const client = new discord_js_1.Client({
    intents: [discord_js_1.GatewayIntentBits.Guilds],
});
client.once('ready', () => {
    console.log('Bot starting ...');
    if (client.user) {
        console.log(`Logged in as ${client.user.tag}!`);
    }
});
client.on(discord_js_1.Events.InteractionCreate, async (interaction) => {
    if (interaction.isChatInputCommand()) {
        if (interaction.commandName === slashcommands_1.registerUser.data.name) {
            try {
                await slashcommands_1.registerUser.execute(interaction);
            }
            catch (error) {
                console.error(error);
                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp({
                        content: 'There was an error while executing this command!',
                        ephemeral: true,
                    });
                }
                else {
                    await interaction.reply({
                        content: 'There was an error while executing this command!',
                        ephemeral: true,
                    });
                }
            }
        }
        else if (interaction.commandName === slashcommands_1.deleteUser.data.name) {
            try {
                await slashcommands_1.deleteUser.execute(interaction);
            }
            catch (error) {
                console.error(error);
                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp({
                        content: 'There was an error while executing this command!',
                        ephemeral: true,
                    });
                }
                else {
                    await interaction.reply({
                        content: 'There was an error while executing this command!',
                        ephemeral: true,
                    });
                }
            }
        }
        else if (interaction.commandName === slashcommands_1.approvalCommand.data.name) {
            try {
                await slashcommands_1.approvalCommand.execute(interaction);
            }
            catch (error) {
                console.error(error);
                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp({
                        content: 'There was an error while executing this command!',
                        ephemeral: true,
                    });
                }
                else {
                    await interaction.reply({
                        content: 'There was an error while executing this command!',
                        ephemeral: true,
                    });
                }
            }
        }
        else {
            return;
        }
    }
    else {
        console.error('interaction is not match CommandInteraction or AutocompleteInteraction.');
    }
});
client.login(process.env.TOKEN);
