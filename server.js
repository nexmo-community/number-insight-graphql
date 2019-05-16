const { ApolloServer } = require('apollo-server');
const NumberInsightAPI = require('./src/number-insight');
const config = require('config');

const typeDefs = require('./src/number-insight-types');

const resolvers = {
  Query: {
    insight: async (_source, { number, type, cnam, ip }, { dataSources }) => {
      return dataSources.numberInsight.getInsight(number, type, cnam, ip);
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection:
    process.env.GRAPHQL_INTROSPECTION || config.get('graphql_introspection'),
  playground:
    process.env.GRAPHQL_PLAYGROUND || config.get('graphql_playground'),
  dataSources: () => {
    return {
      numberInsight: new NumberInsightAPI()
    };
  }
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`Server running at ${url}`);
});
