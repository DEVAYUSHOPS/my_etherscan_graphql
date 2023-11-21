// Import the ApolloServer and importSchema packages
const { ApolloServer } = require("apollo-server");
const { importSchema } = require("graphql-import");

// Import the EtherDataSource class
const EtherDataSource = require("./datasource/ethDatasource");

// Import the schema definition from the schema.graphql file
const typeDefs = importSchema("./schema.graphql");

// Load environment variables from the .env file
require("dotenv").config();

// Define the GraphQL resolvers
const resolvers = {
  // Query resolver for fetching Ethereum balance by address
  Query: {
    etherBalanceByAddress: (root, _args, { dataSources }) => {
      // Retrieve the Ether balance using the EtherDataSource instance
      return dataSources.ethDataSource.etherBalanceByAddress();
    },

    // Query resolver for fetching the total supply of Ether
    totalSupplyOfEther: (root, _args, { dataSources }) => {
      // Retrieve the total Ether supply using the EtherDataSource instance
      return dataSources.ethDataSource.totalSupplyOfEther();
    },

    // Query resolver for fetching the latest Ethereum price
    latestEthereumPrice: (root, _args, { dataSources }) => {
      // Retrieve the latest Ethereum price using the EtherDataSource instance
      return dataSources.ethDataSource.getLatestEthereumPrice();
    },

    // Query resolver for fetching the block confirmation time
    blockConfirmationTime: (root, _args, { dataSources }) => {
      // Retrieve the block confirmation time using the EtherDataSource instance
      return dataSources.ethDataSource.getBlockConfirmationTime();
    },
  },
};

// Create an ApolloServer instance with the typeDefs, resolvers, and dataSources
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    ethDataSource: new EtherDataSource(),
  }),
});

// Set the server timeout to 0 (no timeout)
server.timeout = 0;

// Start the ApolloServer on port 9000
server.listen("9000").then(({ url }) => {
  // Log a message indicating the server is ready with the URL
  console.log(`🚀 Server ready at ${url}`);
});