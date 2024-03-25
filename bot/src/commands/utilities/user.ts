import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonInteraction,
    ButtonStyle,
    CacheType,
    ChannelSelectMenuInteraction,
    CommandInteraction,
    MentionableSelectMenuInteraction,
    RoleSelectMenuInteraction,
    SlashCommandBuilder,
    StringSelectMenuInteraction,
    UserSelectMenuInteraction,
} from 'discord.js';
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
            const registerUserLinkButton = new ButtonBuilder()
                .setLabel('Register Your Account')
                .setURL(registerUrl)
                .setStyle(ButtonStyle.Link);
            const row = new ActionRowBuilder<ButtonBuilder>().addComponents(registerUserLinkButton);

            const response = await interaction.reply({
                content: '以下のボタンをクリックしてユーザーの登録をしてください。',
                components: [row],
            });

            //スラッシュコマンドを入力したユーザーのみがコンポーネントの操作ができる
            const collectorFilter = (
                i:
                    | ButtonInteraction<CacheType>
                    | StringSelectMenuInteraction<CacheType>
                    | UserSelectMenuInteraction<CacheType>
                    | RoleSelectMenuInteraction<CacheType>
                    | MentionableSelectMenuInteraction<CacheType>
                    | ChannelSelectMenuInteraction<CacheType>
            ) => i.user.id === interaction.user.id;

            try {
                await response.awaitMessageComponent({ filter: collectorFilter, time: 5_000 });
            } catch (error) {
                await interaction.editReply({
                    content: '前の操作をしてから5秒以上が経過したため、ボタンを削除しました。',
                    components: [],
                });
            }
        } else {
            await interaction.reply('あなたは、ギルドメンバーではありません。');
        }
    },
};

const deleteUser = {
    data: new SlashCommandBuilder().setName('delete-user').setDescription('Sample slash command.'),
    async execute(interaction: CommandInteraction) {
        if (guildId === interaction.guild?.id) {
            const acceptButton = new ButtonBuilder().setCustomId('accept').setLabel('Yes').setStyle(ButtonStyle.Danger);
            const rejectButton = new ButtonBuilder().setCustomId('reject').setLabel('No').setStyle(ButtonStyle.Success);
            const firstRow = new ActionRowBuilder<ButtonBuilder>().addComponents(acceptButton, rejectButton);

            const deleteUserLinkButton = new ButtonBuilder()
                .setLabel('Delete Your Account')
                .setURL(deleteUrl)
                .setStyle(ButtonStyle.Link);
            const secondRow = new ActionRowBuilder<ButtonBuilder>().addComponents(deleteUserLinkButton);

            const response = await interaction.reply({
                content: 'あなたが関係している借金の情報もすべて消えますが、よろしいですか。',
                components: [firstRow],
            });
            //スラッシュコマンドを入力したユーザーのみがコンポーネントの操作ができる
            const collectorFilter = (
                i:
                    | ButtonInteraction<CacheType>
                    | StringSelectMenuInteraction<CacheType>
                    | UserSelectMenuInteraction<CacheType>
                    | RoleSelectMenuInteraction<CacheType>
                    | MentionableSelectMenuInteraction<CacheType>
                    | ChannelSelectMenuInteraction<CacheType>
            ) => i.user.id === interaction.user.id;

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
            } catch (error) {
                await interaction.editReply({
                    content: '前の操作をしてから5秒以上が経過したため、ボタンを削除しました。',
                    components: [],
                });
            }
        } else {
            await interaction.reply('あなたは、ギルドメンバーではありません。');
        }
    },
};

export { registerUser, deleteUser };
