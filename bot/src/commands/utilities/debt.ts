import { Collection, CommandInteraction, Message, MessageReaction, SlashCommandBuilder, User } from 'discord.js';
import dotenv from 'dotenv';
import { checkIsString } from '../../types';
import { amountDebtAuthorizationDataType, createDebtAuthorizationDataType } from 'src/types/debt';
import { ADDRGETNETWORKPARAMS } from 'dns';

dotenv.config();

const guildId = checkIsString(process.env.GUILDID);
const webApiUrl = checkIsString(process.env.WEBAPIURL);

const createDebt = {
    data: new SlashCommandBuilder()
        .setName('create-debt')
        .setDescription('借金を登録できます。')
        .addUserOption((option) => option.setName('lend').setDescription('お金を貸した人').setRequired(true))
        .addIntegerOption((option) => option.setName('money').setDescription('金額').setRequired(true))
        .addUserOption((option) => option.setName('borrow').setDescription('お金を借りた人').setRequired(true)),
    async execute(interaction: CommandInteraction) {
        await interaction.deferReply();
        const lend: string | number | boolean | undefined = interaction.options.get('lend')?.value;
        const money: string | number | boolean | undefined = interaction.options.get('money')?.value;
        const borrow: string | number | boolean | undefined = interaction.options.get('borrow')?.value;
        if (guildId === interaction.guild?.id) {
            if (typeof lend !== 'string' || typeof money !== 'number' || typeof borrow !== 'string') {
                await interaction.editReply('You have entered invalid data.');
            } else {
                try {
                    const debtCreateData: Response = await fetch(`${webApiUrl}/debt/create`, {
                        method: 'POST',
                        headers: {
                            Authorization: `${interaction.user.id}`,
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            lend: lend,
                            money: money,
                            borrow: borrow,
                        }),
                    });
                    const data: createDebtAuthorizationDataType = await debtCreateData.json();
                    const message: Message<boolean> = await interaction.editReply(data.authorization);

                    if (typeof data.debtId !== 'number') return;
                    const debtId: number = data.debtId;

                    await message.react('✅');

                    await interaction.followUp(
                        `Debt ID: ${debtId}\nお金を貸した人: <@!${lend}>\nお金を借りた人: <@!${borrow}>\n金額: ${money}円`
                    );

                    //filterの作成
                    const collectorFilter = (reaction: MessageReaction, user: User): boolean => {
                        if (typeof reaction.emoji.name === 'string') {
                            return ['✅'].includes(reaction.emoji.name) && !user.bot;
                        } else {
                            return false;
                        }
                    };

                    try {
                        const reaction: Collection<string, MessageReaction> = await message.awaitReactions({
                            filter: collectorFilter,
                            max: 1,
                            errors: ['time'],
                        });
                        console.log(reaction.size);
                        console.log(
                            `Collected ${reaction.first()?.emoji.name} from ${reaction
                                .first()
                                ?.users.cache.map((user) => user.tag)}`
                        );

                        await message.reactions
                            .removeAll()
                            .catch((error) => console.error('Failed to clear reactions:', error));
                        const users: (string | undefined)[] | undefined = reaction.first()?.users.cache.map((user) => {
                            if (user.tag === 'DebtBot#6173') return;
                            return user.tag;
                        });
                        if (!users || users.length === 0) return;
                        const user: string | undefined = users[1];
                        if (typeof user === 'undefined') return;
                        //チェックマークを押した後の処理
                        const debtPayOffData: Response = await fetch(`${webApiUrl}/debt/pay-off`, {
                            method: 'PATCH',
                            headers: {
                                Authorization: `${interaction.user.id}`,
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                debtId: debtId,
                            }),
                        });
                        const debtPayOffDataJsonify: createDebtAuthorizationDataType = await debtPayOffData.json();
                        if (typeof debtPayOffDataJsonify.debtId !== 'number') return;
                        const payOffDebtId: number = debtPayOffDataJsonify.debtId;
                        await interaction.followUp(`debtId: ${payOffDebtId}\n完済しました。`);
                    } catch (_e: any) {
                        console.log(`Unexpected error.`);
                    }
                } catch (_e: any) {
                    await interaction.editReply('Fetch error is ocurred.');
                }
            }
        } else {
            await interaction.editReply('You are not guild member.');
        }
    },
};

const amountDebt = {
    data: new SlashCommandBuilder()
        .setName('amount')
        .setDescription('借金の総量を確認できます。')
        .addUserOption((option) =>
            option.setName('check-user').setDescription('借金量を確認したいユーザー').setRequired(true)
        ),
    async execute(interaction: CommandInteraction) {
        await interaction.deferReply();
        const discordId: string | number | boolean | undefined = interaction.options.get('check-user')?.value;
        if (guildId === interaction.guild?.id) {
            if (typeof discordId !== 'string') {
                await interaction.editReply('You have entered invalid data.');
            } else {
                try {
                    const debtCreateData: Response = await fetch(`${webApiUrl}/debt/amount`, {
                        method: 'POST',
                        headers: {
                            Authorization: `${interaction.user.id}`,
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            discordUserId: discordId,
                        }),
                    });
                    const data: amountDebtAuthorizationDataType = await debtCreateData.json();
                    await interaction.editReply(data.authorization);
                    if (typeof data.amount === 'undefined') return;
                    let resultMessage: string = '';
                    data.amount.forEach((eachAmount) => {
                        if (discordId === eachAmount.lendId) {
                            resultMessage += '';
                        } else {
                            resultMessage += `<@!${discordId}>の<@!${eachAmount.lendId}>に対しての借金額: ${eachAmount.amount}円\n`;
                        }
                    });
                    if (resultMessage.length === 0) {
                        await interaction.followUp('あなたは現在、誰からも借金をしていません。');
                    } else {
                        await interaction.followUp(resultMessage);
                    }
                } catch (_e: any) {
                    await interaction.editReply('Fetch error is ocurred.');
                }
            }
        } else {
            await interaction.editReply('You are not guild member.');
        }
    },
};

export { createDebt, amountDebt };
