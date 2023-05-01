import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import {Container, Column, Title, Subtitle, Description, Image} from "../css/MovieCss";

const GET_MOVIE = gql`
query getMovie($movieId: String!){
    movie(id: $movieId){
        id
        title
        medium_cover_image
        rating
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
            return <Title>Loading...</Title>
        }
        return <Title>{result.data.movie?.title}</Title>
    }

    return (
        <Container>
          <Column>
            {view()}
            <Subtitle>⭐️ {result.data?.movie?.rating}</Subtitle>
          </Column>
          <Image bg={result.data?.movie?.medium_cover_image} />
        </Container>
      );
}