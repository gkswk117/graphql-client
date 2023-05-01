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
    
    //pro
    const result = useQuery(ALL_TWEETS, {
        fetchPolicy:'cache-and-network'
    })
    console.log(result)
    if(result.data===undefined){
        return <h1>Loading...</h1>
    }

    const onClick=(id)=>{
        result.client.cache.writeFragment({
            id:`Tweet:${id}`,
            fragment:gql`
                fragment tomato on Tweet {
                    isLiked
                }
            `,
            data:{
                isLiked:!result.client.cache.data.data["Tweet:"+id].isLiked
            }
        })
        console.log(result.client.cache.data.data["Tweet:1"].isLiked)
        console.log(result.client.cache.data.data["Tweet:2"].isLiked)
        
    }

    const test = ()=>{
        
        result.client.cache.writeFragment({
            id:`ROOT_QUERY`,
            fragment:gql`
                fragment tomato on Query {
                    isTrue
                }
            `,
            data:{
                isTrue:!result.data?.allTweets?.isTrue
            }
        })
    }
    return (
    <div>
        <div>This is a list of tweets.</div>
        {result.data.allTweets.map((e)=>{
        return (
            <li key={e.id}>
                {e.text}
                <button onClick={()=>{onClick(e.id)}}>{result.client.cache.data?.data["Tweet:"+e.id]?.isLiked ? "true" : "false"}</button>
            </li>
        )})}
        <button onClick={test}>{result.data?.allTweets?.isTrue ? "true" : "false"}</button>
    </div>
    )
    //근데 이렇게 하면 니코가 얘기한 장점을 활용 못함.
    //니코는 writeFragment의 장점이 서버의 데이터 사용하는 것 처럼 캐시의 데이터를 사용할 수 있다고 했는데, 그렇게 안됨.
    //그래서 임시 방편으로 캐시에 직접 접근해서 데이터를 수정하고 있는데, 우선 반만 성공.
    //뒤로 갔다가 다시 돌아오면 바뀌어 있고, 바로 바뀌지는 않음.
}
