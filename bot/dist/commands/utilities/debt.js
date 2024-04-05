"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.amountDebt = exports.createDebt = void 0;
const discord_js_1 = require("discord.js");
const dotenv_1 = __importDefault(require("dotenv"));
const types_1 = require("../../types");
dotenv_1.default.config();
const guildId = (0, types_1.checkIsString)(process.env.GUILDID);
const webApiUrl = (0, types_1.checkIsString)(process.env.WEBAPIURL);
const createDebt = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('create-debt')
        .setDescription('借金を登録できます。')
        .addUserOption((option) => option.setName('lend').setDescription('お金を貸した人').setRequired(true))
        .addIntegerOption((option) => option.setName('money').setDescription('金額').setRequired(true))
        .addUserOption((option) => option.setName('borrow').setDescription('お金を借りた人').setRequired(true)),
    async execute(interaction) {
        await interaction.deferReply();
        const lend = interaction.options.get('lend')?.value;
        const money = interaction.options.get('money')?.value;
        const borrow = interaction.options.get('borrow')?.value;
        if (guildId === interaction.guild?.id) {
            if (typeof lend !== 'string' || typeof money !== 'number' || typeof borrow !== 'string') {
                await interaction.editReply('You have entered invalid data.');
            }
            else {
                try {
                    const debtCreateData = await fetch(`${webApiUrl}/debt/create`, {
                        method: 'POST',
                        headers: {
                            Authorization: `${interaction.user.id} ${interaction.guild?.id}`,
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            lend: lend,
                            money: money,
                            borrow: borrow,
                        }),
                    });
                    const data = await debtCreateData.json();
                    const message = await interaction.editReply(data.authorization);
                    if (typeof data.debtId !== 'number')
                        return;
                    const debtId = data.debtId;
                    await message.react('✅');
                    await interaction.followUp(`Debt ID: ${debtId}\nお金を貸した人: <@!${lend}>\nお金を借りた人: <@!${borrow}>\n金額: ${money}円`);
                    //filterの作成
                    const collectorFilter = (reaction, user) => {
                        if (typeof reaction.emoji.name === 'string') {
                            return ['✅'].includes(reaction.emoji.name) && !user.bot;
                        }
                        else {
                            return false;
                        }
                    };
                    try {
                        const reaction = await message.awaitReactions({
                            filter: collectorFilter,
                            max: 1,
                            errors: ['time'],
                        });
                        await message.reactions
                            .removeAll()
                            .catch((error) => console.error('Failed to clear reactions:', error));
                        const users = reaction.first()?.users.cache.map((user) => {
                            if (user.tag === 'DebtBot#6173')
                                return;
                            return user.tag;
                        });
                        if (!users || users.length === 0)
                            return;
                        const user = users[1];
                        if (typeof user === 'undefined')
                            return;
                        //チェックマークを押した後の処理
                        const debtPayOffData = await fetch(`${webApiUrl}/debt/pay-off`, {
                            method: 'PATCH',
                            headers: {
                                Authorization: `${interaction.user.id} ${interaction.guild?.id}`,
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                debtId: debtId,
                            }),
                        });
                        const debtPayOffDataJsonify = await debtPayOffData.json();
                        if (typeof debtPayOffDataJsonify.debtId !== 'number')
                            return;
                        const payOffDebtId = debtPayOffDataJsonify.debtId;
                        await interaction.followUp(`Debt ID: ${payOffDebtId}\n完済しました。`);
                    }
                    catch (_e) {
                        console.log(`Unexpected error.`);
                    }
                }
                catch (_e) {
                    await interaction.editReply('Fetch error is ocurred.');
                }
            }
        }
        else {
            await interaction.editReply('あなたは、ギルドメンバーではありません。');
        }
    },
};
exports.createDebt = createDebt;
const amountDebt = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('amount')
        .setDescription('借金の総量を確認できます。')
        .addUserOption((option) => option.setName('check-user').setDescription('借金量を確認したいユーザー').setRequired(true)),
    async execute(interaction) {
        await interaction.deferReply();
        const discordId = interaction.options.get('check-user')?.value;
        if (guildId === interaction.guild?.id) {
            if (typeof discordId !== 'string') {
                await interaction.editReply('You have entered invalid data.');
            }
            else {
                try {
                    const debtCreateData = await fetch(`${webApiUrl}/debt/amount`, {
                        method: 'POST',
                        headers: {
                            Authorization: `${interaction.user.id} ${interaction.guild?.id}`,
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            discordUserId: discordId,
                        }),
                    });
                    const data = await debtCreateData.json();
                    await interaction.editReply(data.authorization);
                    if (typeof data.amount === 'undefined')
                        return;
                    let resultMessage = '';
                    data.amount.forEach((eachAmount) => {
                        if (discordId === eachAmount.lendId) {
                            resultMessage += '';
                        }
                        else {
                            resultMessage += `<@!${discordId}>の<@!${eachAmount.lendId}>に対しての借金額: ${eachAmount.amount}円\n`;
                        }
                    });
                    if (resultMessage.length === 0) {
                        await interaction.followUp(`<@!${discordId}>は現在、誰からも借金をしていません。`);
                    }
                    else {
                        await interaction.followUp(resultMessage);
                    }
                }
                catch (_e) {
                    await interaction.editReply(_e);
                }
            }
        }
        else {
            await interaction.editReply('あなたは、ギルドメンバーではありません。');
        }
    },
};
exports.amountDebt = amountDebt;
