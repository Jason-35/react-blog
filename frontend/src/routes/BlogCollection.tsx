import { useLoaderData, useSearchParams } from "react-router-dom"
import { postObject } from "../dto/post.dto";
import { Button } from "@mui/material";
import "../styles/CollectionPage.css"
import sadImage from "../assets/sad.jpg"
import trashcan from "../assets/delete.png"

export default function BlogCollection(){
    
    const [searchParams, setSearchParams] = useSearchParams()
    const page = Number(searchParams.get('page'))
    const { postData, maxLength } = useLoaderData() as { postData: postObject[], maxLength: number};
    
    return(
            <div className="collection-container">
                <div className="browse-text">Your Collection</div>
                {postData.length !== 0 ? 
                    <div className="inner-collection-container">
                    { postData.map((item: postObject) => (
                    <div className="collection-post" key={item.id}>
                        <div>
                            <div>
                                {item.title}
                            </div>
                            <div>
                                {item.createdAt}
                            </div>
                            <div>
                                {item.user.username ? item.user.username : <></>}
                            </div>
                        </div>
                        <div>
                            <div><Button><img src={trashcan}></img></Button></div>
                        </div>
                    </div>
                    ))}
                <div className="page-button">
                { page > 1 ? <Button variant="contained" onClick={() => setSearchParams({ page: `${(page) > 1 ? (page) -1 : (page)}`})}>prev</Button> : <Button disabled variant="contained">prev</Button>}
                { page < maxLength ? <Button variant="contained" onClick={() => setSearchParams({ page: `${(page) < maxLength ? (page) + 1 : page}`})}>next</Button> : <Button disabled variant="contained">next</Button>}
                </div>
            </div>
                :
                <div className="empty-collection">
                    <div className="no-collection-text">You have no collections</div>    
                    <div><img src={sadImage} width="450" height="500"></img></div>
                </div>}
            </div>
    )
}