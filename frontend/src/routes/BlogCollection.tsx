import { Form, useLoaderData, useSearchParams } from "react-router-dom"
import { postObject } from "../dto/post.dto";
import { Button } from "@mui/material";
import "../styles/CollectionPage.css"
import sadImage from "../assets/sad.jpg"
import trashcan from "../assets/delete.png"
// import axios from "axios";

export default function BlogCollection(){
    
    const [searchParams, setSearchParams] = useSearchParams()
    const page = Number(searchParams.get('page'))
    const { postData, maxLength } = useLoaderData() as { postData: postObject[], maxLength: number};

    // const handleDeletePost = async(postId : number) => {
    //     await axios.delete(`http://localhost:4000/api/deletePost/${postId}`, { withCredentials: true}).catch((error) => {
    //         console.log(error)
    //     })
    // }
    
    return(
            <div className="collection-container">
                {postData.length !== 0 ? <div className="browse-text">Your Collection</div> : <></>}
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
                            <Form method="delete"><Button type="submit" name="intent" value={`delete-${item.id}`}><img src={trashcan}></img></Button></Form>
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