const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
require('dotenv').config()
const { Client, Intents, Collection } = require("discord.js");
const axios = require("axios");


// Create a new client instance
const client = new Client({
  intents: [Intents.FLAGS.GUILDS],
});

// Loading commands from the commands folder
const commands = [];
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

const TOKEN = process.env.TOKEN;

// console.log(client.channels);

client.commands = new Collection();
console.log(`---- Commands Loading ----`);
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  console.log(`[OK] ${file}`);
  commands.push(command.data.toJSON());
  client.commands.set(command.data.name, command);
}
console.log(`---- Commands Loaded ----`);

// When the client is ready, run this code (only once)
client.once("ready", () => {
  console.log("Ready!");
  setInterval(async () => {
    let { data } = await axios.get(
      "https://api.loremboard.finance/api/v2/charts/info?symbol=0x95013Dcb6A561e6C003AED9C43Fb8B64008aA361-bkc-usd"
    );
    client.user.setActivity(`🌙LUMI : ${data.priceUSD.toFixed(5)}$`, { type: "WATCHING" });
    // console.log(data.priceUSD.toFixed(5));
    // console.log(data.priceUSD);
  }, 10000);
  
  // Registering the commands in the client
  const CLIENT_ID = client.user.id;
  const rest = new REST({
    version: "9",
  }).setToken(TOKEN);
  (async () => {
    try {
      await rest.put(Routes.applicationCommands(CLIENT_ID), {
        body: commands,
      });
      console.log("Successfully registered application commands globally");
    } catch (error) {
      if (error) console.error(error);
    }
  })();
  
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  const command = client.commands.get(interaction.commandName);
  if (!command) return;
  try {
    await command.execute(interaction, client);
  } catch (error) {
    if (error) console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

// Login to Discord with your client's token
client.login(TOKEN);
