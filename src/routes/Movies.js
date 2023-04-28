import { useEffect, useState } from "react";
import { useApolloClient, gql } from "@apollo/client";

export default function Movies() {
    const client = useApolloClient()
    const [movies, setMovies] = useState([])
    //const [movies, useMovies] = useState() 왜 이렇게 하면 안될까?
    //noob
    useEffect(()=>{
    client.query({
        query:gql`
        {
            allMovies{
                id
                title                
                runtime
            }
        }
        `,
    }).then((data)=>{
        console.log(data)
        setMovies(data.data.allMovies)
    })
    },[client])
    
    return (
    <div>
        <div>This is a list of movies.</div>
        {movies.map((e)=>{
            console.log(e)
        return (<li key={e.id}>{e.title} {e.runtime}</li>)})}
    </div>
    )
}
