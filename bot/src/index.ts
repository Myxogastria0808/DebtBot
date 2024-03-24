import { CacheType, Interaction, GatewayIntentBits, Client, Events } from 'discord.js';
import dotenv from 'dotenv';
import { registerUser, deleteUser } from './commands/utilities/user';
import { createDebt, amountDebt } from './commands/utilities/debt';

dotenv.config();

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions],
});

client.once('ready', () => {
    console.log('Bot starting ...');
    if (client.user) {
        console.log(`Logged in as ${client.user.tag}!`);
    }
});

client.on(Events.InteractionCreate, async (interaction: Interaction<CacheType>) => {
    if (interaction.isChatInputCommand()) {
        if (interaction.commandName === registerUser.data.name) {
            try {
                await registerUser.execute(interaction);
            } catch (error) {
                console.error(error);
                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp({
                        content: 'There was an error while executing this command!',
                        ephemeral: true,
                    });
                } else {
                    await interaction.reply({
                        content: 'There was an error while executing this command!',
                        ephemeral: true,
                    });
                }
            }
        } else if (interaction.commandName === deleteUser.data.name) {
            try {
                await deleteUser.execute(interaction);
            } catch (error) {
                console.error(error);
                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp({
                        content: 'There was an error while executing this command!',
                        ephemeral: true,
                    });
                } else {
                    await interaction.reply({
                        content: 'There was an error while executing this command!',
                        ephemeral: true,
                    });
                }
            }
        } else if (interaction.commandName === createDebt.data.name) {
            try {
                await createDebt.execute(interaction);
            } catch (error) {
                console.error(error);
                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp({
                        content: 'There was an error while executing this command!',
                        ephemeral: true,
                    });
                } else {
                    await interaction.reply({
                        content: 'There was an error while executing this command!',
                        ephemeral: true,
                    });
                }
            }
        } else if (interaction.commandName === amountDebt.data.name) {
            try {
                await amountDebt.execute(interaction);
            } catch (error) {
                console.error(error);
                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp({
                        content: 'There was an error while executing this command!',
                        ephemeral: true,
                    });
                } else {
                    await interaction.reply({
                        content: 'There was an error while executing this command!',
                        ephemeral: true,
                    });
                }
            }
        } else {
            return;
        }
    } else {
        console.error('interaction is not match CommandInteraction or AutocompleteInteraction.');
    }
});

client.login(process.env.TOKEN);
