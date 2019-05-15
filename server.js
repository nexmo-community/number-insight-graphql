const { ApolloServer } = require('apollo-server');
const NumberInsightAPI = require('./src/number-insight');

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
  dataSources: () => {
    return {
      numberInsight: new NumberInsightAPI()
    };
  }
});

server.listen(process.env.PORT || 4000).then(({ url }) => {
  console.log(`Server running at ${url}`);
});
