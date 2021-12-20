const { SlashCommandBuilder } = require("@discordjs/builders");
const axios = require("axios");
const { MessageEmbed } = require("discord.js");
var _ = require("lodash");

let idSeedAllow = ["mmv_farm_0", "mmv_farm_1", "mmv_farm_2"];

let idStemdAllow = ["mmv_farm_3", "mmv_farm_1", "mmv_farm_2"];

module.exports = {
  data: new SlashCommandBuilder()
    .setName("check-mmv")
    .setDescription("Get list of tokens in morning moon")
    .addStringOption((option) =>
      option
        .setName("addresshash")
        .setDescription("A 160-bit code used for identifying accounts.")
        .setRequired(true)
    ),
  async execute(interaction) {
    let addresshash = interaction.options.getString("addresshash");
    let { data } = await axios.get(
      `https://api.loremboard.finance/api/v2/dashboard/wallet/balances/all/${addresshash}?chain=bkc`
    );

    let platform = data.platforms.filter((item) => item.name == "mmv")[0];
    // let filtedIdSeedAllow = _.intersectionWith(
    //   platform.farms,
    //   idSeedAllow,
    //   (a, b) => a.id === b
    // );
    // let filtedIdStemdAllow = _.intersectionWith(
    //     platform.farms,
    //     idStemdAllow,
    //     (a, b) => a.id === b
    //   );
    //   console.log(filtedIdSeedAllow);
    let fields1 = platform.farms.filter((item) => item.value !== 0);
    let fields = fields1.map((item, index) => ({
      name: `${index + 1}. _${item.name}_`,
      value: `Value_\n**${item.amount}**`,
    }));
    console.log(fields);
    await interaction.reply({
      embeds: [
        {
          color: null,
          fields: fields,
        },
      ],
    });
  },
};
