const axios = require("axios");

class Loremboard {
    async constructor(addresshash) {
    this.addresshash = addresshash;
    this.result = null
    this.BASE_URL =
      "https://api.loremboard.finance/api/v2/dashboard/wallet/balances/all/";
    this.getData();
  }

  async getData() {
    let { data } = await axios.get(
      `${this.BASE_URL}${this.addresshash}?chain=bkc`
    );
    this.result = data;
  }

  getTokens() {
    // return this.result.tokens;
    console.log(this.result);
  }

//   getPlatforms() {
//     return this.result.platforms;
//   }
//   getSummarized() {
//     return this.result.summarized;
//   }
}

module.exports = {
  Loremboard,
};
