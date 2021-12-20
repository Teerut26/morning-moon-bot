const { SlashCommandBuilder } = require("@discordjs/builders");
const axios = require("axios");
const { MessageEmbed } = require("discord.js");
var _ = require("lodash");
let Web3 = require('web3');
let web3 = new Web3('https://rpc.bitkubchain.io');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("get-accounts")
    .setDescription("Get list Accounts Bitkub Chain"),
  async execute(interaction) {
      console.log(web3.eth.accounts);
    await interaction.reply({
        embeds: [
          {
            title: `**555**`,
            description: `**555**`,
            color: 3342245,
          },
        ],
      });
  },
};
