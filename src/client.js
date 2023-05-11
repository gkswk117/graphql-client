import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri:"http://localhost:4000/",
    // uri specifies the URL of our GraphQL server.
    // 노마드코더-graphql-server와 연결.
    cache: new InMemoryCache(),
})

// noob
// client.query({
//     query:gql`
//     {
//         allTweets{
//             id
//             text
//         }
//     }
//     `,
// }).then((data)=>console.log(data))

export default client