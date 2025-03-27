const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authMiddleware = require("./middlewares/authMiddleware");
const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");
const sequelize = require("./db/sequelize");

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware for parsing cookies and JSON
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());

// Apply the authentication middleware
app.use(authMiddleware);

// Initialize Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

(async () => {
  await sequelize.authenticate();
  console.log("Connected to PostgreSQL");

  // await sequelize.sync(); // Sync models with the database

  await server.start();

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: ({ req }) => ({
        user: req.user, // Attach the authenticated user to the GraphQL context
      }),
    })
  );

  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
  });
})();
