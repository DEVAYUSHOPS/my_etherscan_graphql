// Import the RESTDataSource class from the apollo-datasource-rest package
const { RESTDataSource } = require("apollo-datasource-rest");

// Define the Ethereum address we want to fetch data for
const eth_address = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";

// Create an EtherDataSource class that inherits from RESTDataSource
class EtherDataSource extends RESTDataSource {
  // Constructor method to initialize the data source
  constructor() {
    super();
    this.baseURL = "https://api.etherscan.io/api"; // Set the Etherscan API base URL
  }

  // Method to fetch Ethereum balance for the specified address
  async etherBalanceByAddress() {
    // Construct the API request URL
    const url = `?module=account&action=balance&address=${eth_address}&tag=latest&apikey=${process.env.ETHERSCAN_API}`;

    // Fetch data from the Etherscan API
    const response = await this.get(url);

    // Return the retrieved Ethereum balance
    return response.result;
  }

  // Method to fetch the total supply of Ether
  async totalSupplyOfEther() {
    // Construct the API request URL
    const url = `?module=stats&action=ethsupply&apikey=${process.env.ETHERSCAN_API}`;

    // Fetch data from the Etherscan API
    const response = await this.get(url);

    // Return the retrieved total Ether supply
    return response.result;
  }

  // Method to fetch the latest Ethereum price
  async getLatestEthereumPrice() {
    // Construct the API request URL
    const url = `?module=stats&action=ethprice&apikey=${process.env.ETHERSCAN_API}`;

    // Fetch data from the Etherscan API
    const response = await this.get(url);

    // Return the retrieved latest Ethereum price
    return response.result.ethusd;
  }

  // Method to fetch the estimated block confirmation time
  async getBlockConfirmationTime() {
    // Construct the API request URL
    const url = `?module=gastracker&action=gasestimate&gasprice=2000000000&apikey=${process.env.ETHERSCAN_API}`;

    // Fetch data from the Etherscan API
    const response = await this.get(url);

    // Extract the estimated block confirmation time
    const confirmationTime = parseInt(response.result.blockTime);

    // Return the estimated block confirmation time in seconds
    return confirmationTime;
  }
}

// Export the EtherDataSource class for use in other modules
module.exports = EtherDataSource;

