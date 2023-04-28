import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri:"http://localhost:4000/",
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