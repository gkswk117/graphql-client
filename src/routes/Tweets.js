import { useEffect, useState } from "react";
import { useApolloClient, gql, useQuery } from "@apollo/client";

const ALL_TWEETS = gql`
query AllTweets {
    allTweets {
      id
      text
    }
  }
`

export default function Tweets() {
    const client = useApolloClient()
    const [tweets, setTweets] = useState([])
    //const [tweets, useTweets] = useState() 왜 이렇게 하면 안될까?
    //noob
    // useEffect(()=>{
    // client.query({
    //     query:gql`
    //     {
    //         allTweets{
    //             id
    //             text
    //             author{
    //                 fullName
    //             }
    //         }
    //     }
    //     `,
    // }).then((data)=>{
    //     console.log(data)
    //     setTweets(data.data.allTweets)
    // })
    // },[client])
    
    const result = useQuery(ALL_TWEETS, {
        fetchPolicy:'cache-and-network'
    })
    console.log(result)
    if(result.data===undefined){
        return <h1>Loading...</h1>
    }
    return (
    <div>
        <div>This is a list of tweets.</div>
        {result.data.allTweets.map((e)=>{
        return (<li key={e.id}>{e.text}</li>)})}
    </div>
    )
}
