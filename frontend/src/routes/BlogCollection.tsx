import { useLoaderData, useSearchParams } from "react-router-dom"
import { postObject } from "../dto/post.dto";

export default function BlogCollection(){
    
    const [searchParams, setSearchParams] = useSearchParams()
    const page = Number(searchParams.get('page'))
    const { postData, maxLength } = useLoaderData() as { postData: postObject[], maxLength: number};
    
    return(
        <div>
            <button>{page}</button>
            <div>
                { maxLength ? <button>{maxLength}</button> : <>no number</>}
                { postData.map((item: postObject) => (
                <div key={item.id} style={{color: "black"}}>
                    <div>
                        {item.title}
                    </div>
                    <div>
                        {item.content}
                    </div>
                    <div>
                        {item.createdAt}
                    </div>
                    <div>
                        {item.user.username ? item.user.username : "nuhu"}
                    </div>
                </div>
                ))}
                { page > 1 ? <button onClick={() => setSearchParams({ page: `${(page) > 1 ? (page) -1 : (page)}`})}>prev</button> : <></>}
                { page < maxLength ? <button onClick={() => setSearchParams({ page: `${(page) < maxLength ? (page) + 1 : page}`})}>next</button> : <></>}

            </div>
        </div>
    )
}