"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ping = void 0;
const discord_js_1 = require("discord.js");
const dotenv_1 = __importDefault(require("dotenv"));
const types_1 = require("../../types/");
dotenv_1.default.config();
const authUrl = (0, types_1.checkIsString)(process.env.AUTHURL);
const guildId = (0, types_1.checkIsString)(process.env.GUILDID);
const ping = {
    data: new discord_js_1.SlashCommandBuilder().setName('ping').setDescription('Sample slash command.'),
    async execute(interaction) {
        if (guildId === interaction.guild?.id) {
            await interaction.reply(`[OAuth URL](${authUrl})`);
        }
        else {
            await interaction.reply('You are not guild member');
        }
    },
};
exports.ping = ping;
