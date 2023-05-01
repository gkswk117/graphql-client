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
        isLiked @client
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
    //movie? => 자바스크립트 물음표 선택적 연산자 Optional chaining
    return (
        <Container>
          <Column>
            {view()}
            {/* 연습용. 앞으로는 이렇게 안하고 니코방식(Movies.js)대로 할 것. */}
            <Subtitle>⭐️ {result.data?.movie?.rating}</Subtitle>
            <button>{result.data?.movie?.isLiked ? "Unlike" : "Like"}</button>
          </Column>
          <Image bg={result.data?.movie?.medium_cover_image} />
        </Container>
      );
}