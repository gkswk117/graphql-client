import { useEffect, useState } from "react";
import { useApolloClient, gql } from "@apollo/client";

export default function Tweets() {
    const client = useApolloClient()
    const [tweets, setTweets] = useState([])
    //const [tweets, useTweets] = useState() 왜 이렇게 하면 안될까?
    //noob
    useEffect(()=>{
    client.query({
        query:gql`
        {
            allTweets{
                id
                text
                author{
                    fullName
                }
            }
        }
        `,
    }).then((data)=>{
        console.log(data)
        setTweets(data.data.allTweets)
    })
    },[client])
    
    return (
    <div>
        <div>This is a list of tweets.</div>
        {tweets.map((e)=>{
            console.log(e)
        return (<li key={e.id}>{e.text} {e.runtime}</li>)})}
    </div>
    )
}
