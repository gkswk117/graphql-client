import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { Container, Header, Title, Loading, MoviesGrid, PosterContainer, PosterBg } from "../css/MoviesCss";
//pro
const ALL_MOVIES = gql`
{
    allMovies{
        id
        title
        medium_cover_image
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
        <Container>
        <Header>
          <Title>Apollo Movies</Title>
        </Header>
        {result.loading && <Loading>Loading...</Loading>}
        <MoviesGrid>
          {result.data?.allMovies?.map((e) => (
            <PosterContainer key={e.id}>
              <Link to={`/movies/${e.id}`}>
                <PosterBg background={e.medium_cover_image} />
              </Link>
            </PosterContainer>
          ))}
        </MoviesGrid>
      </Container>
    )
}
