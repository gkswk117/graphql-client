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
    //result 안에 data, loading, cache 등등 유용한 프로퍼티가 많다.
    //fetchPolicy에 대한 내용 => 네이버 메모 "fetchPolicy"검색
    
    const onClick=()=>{
        //cache데이터를 직접 수정하고 싶을 때 => writeFragment
        //https://www.apollographql.com/docs/react/caching/cache-interaction/
        //writeFragment의 파워는 cache의 데이터를 서버에서 받은 데이터랑 똑같이 사용할 수 있다는 점이다.
        //그 둘을 구분해서 사용할 필요가 없다.
        //isLiked:!result.data?.movie?.isLiked(캐시에만 저장되어있는 데이터)와
        //return <Title>{result.data.movie?.title}</Title>(서버에서 받은 데이터. 사실상 캐시를 거쳤다가 온다.)의 사용 방식이 똑같지 않냐.
        result.client.cache.writeFragment({
            id:`Movie:${id}`,
            //cache 아이디는 Firefox apollo 확장프로그램의 cache에서 확인할 수 있음. Movie:51175 이게 캐시 아이디임.
            fragment:gql`
                fragment tomato on Movie {
                    isLiked
                }
            `,
            //GET_MOVIE과 같이 데이터 형식을 정의해주는 곳.
            data:{
                isLiked:!result.data?.movie?.isLiked
            }
            //실제 데이터를 전달하는 곳
        })
    }
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
            {/* <Title>{loading ? "Loading..." : `${data.movie?.title}`}</Title> */}
            {/* 니코방식 */}
            <Subtitle>⭐️ {result.data?.movie?.rating}</Subtitle>
            <button onClick={onClick}>{result.data?.movie?.isLiked ? "Unlike" : "Like"}</button>
          </Column>
          <Image bg={result.data?.movie?.medium_cover_image} />
        </Container>
      );
}