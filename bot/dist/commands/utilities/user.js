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
    data: new discord_js_1.SlashCommandBuilder().setName('register-user').setDescription('ユーザー登録ができます。'),
    async execute(interaction) {
        if (guildId === interaction.guild?.id) {
            const registerUserLinkButton = new discord_js_1.ButtonBuilder()
                .setLabel('Register Your Account')
                .setURL(registerUrl)
                .setStyle(discord_js_1.ButtonStyle.Link);
            const row = new discord_js_1.ActionRowBuilder().addComponents(registerUserLinkButton);
            const response = await interaction.reply({
                content: '以下のボタンをクリックしてユーザーの登録をしてください。',
                components: [row],
            });
            //スラッシュコマンドを入力したユーザーのみがコンポーネントの操作ができる
            const collectorFilter = (i) => i.user.id === interaction.user.id;
            try {
                await response.awaitMessageComponent({ filter: collectorFilter, time: 5_000 });
            }
            catch (error) {
                await interaction.editReply({
                    content: '前の操作をしてから5秒以上が経過したため、ボタンを削除しました。',
                    components: [],
                });
            }
        }
        else {
            await interaction.reply('あなたは、ギルドメンバーではありません。');
        }
    },
};
exports.registerUser = registerUser;
const deleteUser = {
    data: new discord_js_1.SlashCommandBuilder().setName('delete-user').setDescription('ユーザー削除ができます。'),
    async execute(interaction) {
        if (guildId === interaction.guild?.id) {
            const acceptButton = new discord_js_1.ButtonBuilder().setCustomId('accept').setLabel('Yes').setStyle(discord_js_1.ButtonStyle.Danger);
            const rejectButton = new discord_js_1.ButtonBuilder().setCustomId('reject').setLabel('No').setStyle(discord_js_1.ButtonStyle.Success);
            const firstRow = new discord_js_1.ActionRowBuilder().addComponents(acceptButton, rejectButton);
            const deleteUserLinkButton = new discord_js_1.ButtonBuilder()
                .setLabel('Delete Your Account')
                .setURL(deleteUrl)
                .setStyle(discord_js_1.ButtonStyle.Link);
            const secondRow = new discord_js_1.ActionRowBuilder().addComponents(deleteUserLinkButton);
            const response = await interaction.reply({
                content: 'あなたが関係している借金の情報もすべて消えますが、よろしいですか。',
                components: [firstRow],
            });
            //スラッシュコマンドを入力したユーザーのみがコンポーネントの操作ができる
            const collectorFilter = (i) => i.user.id === interaction.user.id;
            try {
                const confirmation = await response.awaitMessageComponent({ filter: collectorFilter, time: 5_000 });
                if (confirmation.customId === 'accept') {
                    const Linkconfirmation = await confirmation.update({
                        content: `以下のボタンをクリックしてユーザーの削除を行ってください。`,
                        components: [secondRow],
                    });
                    await Linkconfirmation.awaitMessageComponent({
                        filter: collectorFilter,
                        time: 5_000,
                    });
                }
                if (confirmation.customId === 'reject') {
                    await confirmation.update({ content: 'ユーザーの削除は行われませんでした。', components: [] });
                }
            }
            catch (error) {
                await interaction.editReply({
                    content: '前の操作をしてから5秒以上が経過したため、ボタンを削除しました。',
                    components: [],
                });
            }
        }
        else {
            await interaction.reply('あなたは、ギルドメンバーではありません。');
        }
    },
};
exports.deleteUser = deleteUser;
