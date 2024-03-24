import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import dotenv from 'dotenv';
import { checkIsString } from '../../types';

dotenv.config();

const registerUrl = checkIsString(process.env.REGISTERURL);
const deleteUrl = checkIsString(process.env.DELETEURL);
const guildId = checkIsString(process.env.GUILDID);

const registerUser = {
    data: new SlashCommandBuilder().setName('register-user').setDescription('Sample slash command.'),
    async execute(interaction: CommandInteraction) {
        if (guildId === interaction.guild?.id) {
            await interaction.reply(`[OAuth URL](${registerUrl})`);
        } else {
            await interaction.reply('You are not guild member');
        }
    },
};

const deleteUser = {
    data: new SlashCommandBuilder().setName('delete-user').setDescription('Sample slash command.'),
    async execute(interaction: CommandInteraction) {
        if (guildId === interaction.guild?.id) {
            await interaction.reply(`[OAuth URL](${deleteUrl})`);
        } else {
            await interaction.reply('You are not guild member');
        }
    },
};

export { registerUser, deleteUser };
