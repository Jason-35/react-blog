import { Params } from "react-router-dom"
import axios from "axios"

export async function loader({ params } : {params : Params}){
    const {postId} = params
    const post = await axios.get(`http://localhost:4000/api/getPost/${postId}`, { withCredentials: true}).catch((error) => {
        throw error
    })

    console.log(post.data)

    const comment = await axios.get(`http://localhost:4000/api/getComment/${postId}`, { withCredentials: true}).catch((error) => {
        throw error
    })
    
    return { postData: post.data, commentData: comment.data}
}