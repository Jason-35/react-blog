import { useLoaderData, useSearchParams } from "react-router-dom"
import { postObject } from "../dto/post.dto";
import "../styles/BrowsePage.css"
import { Button } from "@mui/material";

export default function BrowsePage(){
    const [searchParams, setSearchParams] = useSearchParams()
    const page = Number(searchParams.get('page'))
    const { postData, maxLength } = useLoaderData() as { postData: postObject[], maxLength: number};
    return(
            <div className="post-container">
                <div className="browse-text">Browse Around</div>                
                { postData.map((item: postObject) => (
                <div className="post-card" key={item.id} onClick={() => {console.log(item.id)}}>
                    <div>
                        {item.title}
                    </div>
                    <div>
                        published at {item.createdAt}
                    </div>
                    <div>
                        posted by {item.user.username ? item.user.username : <></>}
                    </div>
                </div>
                ))}
                <div className="page-button">
                { page > 1 ? <Button variant="contained" onClick={() => setSearchParams({ page: `${(page) > 1 ? (page) -1 : (page)}`})}>prev</Button> : <Button variant="contained" disabled>prev</Button>}
                { page < maxLength ? <Button variant="contained" onClick={() => setSearchParams({ page: `${(page) < maxLength ? (page) + 1 : page}`})}>next</Button> : <Button variant="contained" disabled>next</Button>}
                </div>
            </div>
    )
}