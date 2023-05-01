import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";

const GET_MOVIE = gql`
query getMovie($movieId: String!){
    movie(id: $movieId){
        id
        title
    }
}
`

export default function Movie() {
    const {id} = useParams()
    const result = useQuery(GET_MOVIE, {
        variables:{
            movieId:id,
        },
        fetchPolicy:'cache-and-network'
    })
    console.log(result)
    const view  = ()=>{
        if(result.data===undefined){
            return <h1>Loading...</h1>
        }
        
        return (<div>
            <h1>This is movie details</h1>
        <p>{result.data.movie.title}</p>
        </div>)
        
    }

    return (
        <div>
            {view()}
        </div>
    )
}