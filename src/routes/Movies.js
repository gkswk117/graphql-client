import { useEffect, useState } from "react";
import { useApolloClient, gql } from "@apollo/client";

export default function Movies() {
    const client = useApolloClient()
    const [movies, setMovies] = useState([])
    //const [movies, useMovies] = useState() 왜 이렇게 하면 안될까?
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
        setMovies(data.data.allTweets)
    })
    },[client])
    
    return (
    <div>
        <div>This is a list of movies.</div>
        {movies.map((e)=>{
            console.log(e)
        return (<li key={e.id}>{e.text} {e.author.fullName}</li>)})}
    </div>
    )
}
