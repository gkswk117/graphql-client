import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

//pro
const ALL_MOVIES = gql`
{
    allMovies{
        id
        title                
        runtime
    }
}
`
export default function Movies() {

    const result = useQuery(ALL_MOVIES)
    console.log(result)
    if(result.loading){
        return <h1>Loading...</h1>
    }
    return (
    <div>
        <div>This is a list of movies.</div>
        {result.data.allMovies.map((e)=>{
        return (<li key={e.id}>
            <Link to={`/movies/${e.id}`}>{e.title} {e.runtime}</Link>
            </li>)})}
    </div>
    )
}
