"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.registerUser = void 0;
const discord_js_1 = require("discord.js");
const dotenv_1 = __importDefault(require("dotenv"));
const types_1 = require("../../types");
dotenv_1.default.config();
const registerUrl = (0, types_1.checkIsString)(process.env.REGISTERURL);
const deleteUrl = (0, types_1.checkIsString)(process.env.DELETEURL);
const guildId = (0, types_1.checkIsString)(process.env.GUILDID);
const registerUser = {
    data: new discord_js_1.SlashCommandBuilder().setName('register-user').setDescription('Sample slash command.'),
    async execute(interaction) {
        if (guildId === interaction.guild?.id) {
            await interaction.reply(`[OAuth URL](${registerUrl})`);
        }
        else {
            await interaction.reply('You are not guild member');
        }
    },
};
exports.registerUser = registerUser;
const deleteUser = {
    data: new discord_js_1.SlashCommandBuilder().setName('delete-user').setDescription('Sample slash command.'),
    async execute(interaction) {
        if (guildId === interaction.guild?.id) {
            await interaction.reply(`[OAuth URL](${deleteUrl})`);
        }
        else {
            await interaction.reply('You are not guild member');
        }
    },
};
exports.deleteUser = deleteUser;
