import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import dotenv from 'dotenv';
import { checkIsString } from '../../types';
import { ApprovalAuthorizationDataType } from 'src/types/approval';

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

const approvalCommand = {
    data: new SlashCommandBuilder().setName('approval').setDescription('Sample slash command.'),
    async execute(interaction: CommandInteraction) {
        await interaction.deferReply();
        if (guildId === interaction.guild?.id) {
            try {
                const resData: Response = await fetch('http://127.0.0.1:3000/approval', {
                    method: 'POST',
                    headers: {
                        Authorization: `${interaction.user.id}`,
                    },
                });
                const data: ApprovalAuthorizationDataType = await resData.json();
                await interaction.editReply(data.authorization);
            } catch (_e) {
                await interaction.editReply('fetch error');
            }
        } else {
            await interaction.editReply('You are not guild member');
        }
    },
};

export { registerUser, deleteUser, approvalCommand };
