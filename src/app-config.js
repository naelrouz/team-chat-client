export default {
  graphqlURL:
    process.env.NODE_ENV === 'production'
      ? 'http://localhost:3000/graphql'
      : 'http://localhost:3000/graphql'
};
