const { ApolloServer } = require("apollo-server-micro");
const typeDefs = require("../graphql/schema");
const resolvers = require("../graphql/resolvers");
const sequelize = require("../db/sequelize");
const authMiddleware = require("../middlewares/authMiddleware");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    // Apply authentication middleware manually
    authMiddleware(req, {}, () => {});
    return { user: req.user }; // Attach the authenticated user to the context
  },
});

const startServer = server.start();

module.exports = async (req, res) => {
  await sequelize.authenticate();
  console.log("Connected to PostgreSQL");

  await startServer;
  return server.createHandler({
    path: "/graphql",
  })(req, res);
};

export const config = {
  api: {
    bodyParser: false, // Required for Apollo Server
  },
};
