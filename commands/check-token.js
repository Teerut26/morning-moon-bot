const { SlashCommandBuilder } = require("@discordjs/builders");
const axios = require("axios");
const { MessageEmbed } = require("discord.js");
var _ = require("lodash");

let symbolAllow = [
  "TOMATOSEED",
  "CABBAGESEED",
  "CORN",
  "TOMATO",
  "MM-NFT",
  "CORNSEED",
  "KKUB",
  "KUSDT",
];

const CheckBalance = (symbol, balance) => {
  switch (symbol) {
    // case "CORN":
    //   return (parseInt(balance) * Math.pow(10, -18)).toFixed(8);
    //   case "TOMATOSEED":
    //   return (parseInt(balance) * Math.pow(10, -18)).toFixed(8);
    //   case "CABBAGESEED":
    //   return (parseInt(balance) * Math.pow(10, -18)).toFixed(8);
    //   case "CORNSEED":
    //   return (parseInt(balance) * Math.pow(10, -18)).toFixed(8);
    // case "TOMATO":
    //   return (parseInt(balance) * Math.pow(10, -18)).toFixed(8);
    // case "FANS":
    //   return parseInt(balance) * Math.pow(10, -18);
    // case "CORN":
    //   return parseInt(balance) * Math.pow(10, -18).toFixed(8);
    // case "TOMATO":
    //   return parseInt(balance) * Math.pow(10, -18).toFixed(8);
    // case "CABBAGE":
    //   return parseInt(balance) * Math.pow(10, -18).toFixed(8);
    // case "KKUB":
    //   return parseInt(balance) * Math.pow(10, -18).toFixed(8);
    // case "KUSDT":
    //   return parseInt(balance) * Math.pow(10, -18).toFixed(8);
    default:
      return balance;
  }
};

const addSymbolEmoji = (symbol) => {
  switch (symbol) {
    case "CORN":
      return `:corn: CORN`;
    case "TOMATO":
      return `:tomato: TOMATO`;
    case "CABBAGE":
      return `🥬 CABBAGE`;
    case "CABBAGESEED":
      return `🌱 CABBAGESEED`;
    case "CORNSEED":
      return `🌱 CORNSEED `;
    case "TOMATOSEED":
      return `🌱 TOMATOSEED`;
    case "KKUB":
      return `🪙 KKUB`;
    case "KUSDT":
      return `🪙 KUSDT`;
    default:
      return symbol;
  }
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("check-token")
    .setDescription("Get list of tokens owned by address.")
    .addStringOption((option) =>
      option
        .setName("addresshash")
        .setDescription("A 160-bit code used for identifying accounts.")
        .setRequired(true)
    ),
  async execute(interaction) {
    let addresshash = interaction.options.getString("addresshash");
    let res = await axios.get(
      `https://api.loremboard.finance/api/v2/dashboard/wallet/balances/all/${addresshash}?chain=bkc`
    );
    let data1 = await res.data;
    let filted = _.intersectionWith(
      data1.tokens,
      symbolAllow,
      (a, b) => a.symbol.toUpperCase() === b
    );
    let fields = filted.map((item, index) => ({
      name: `${index + 1}. **${addSymbolEmoji(item.symbol.toUpperCase())}**`,
      value: `balance : **${CheckBalance(item.symbol.toUpperCase(), item.amount)}**`,
    }));
    await interaction.reply({
      embeds: [
        {
          title: `**${fields.length} Tokens**`,
          description: `**_${addresshash}_**`,
          color: 3342245,
          fields: fields,
        },
      ],
    });
  },
};
