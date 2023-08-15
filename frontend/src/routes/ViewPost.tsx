import { useLoaderData } from "react-router-dom"
import { postObject } from "../dto/post.dto"

export default function ViewPost(){
    const post = useLoaderData() as postObject
    return (
        <div style={{color: "black"}}>
            <div>{post.title}</div>
            <div>{post.user.username}</div>
            <div>{post.createdAt}</div>
            <div>{post.content}</div>
            comments go under here
        </div>
    )
}