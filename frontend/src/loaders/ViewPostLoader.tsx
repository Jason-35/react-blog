import { Params } from "react-router-dom"
import axios from "axios"

export async function loader({ params } : {params : Params}){
    const {postId} = params
    const post = await axios.get(`http://localhost:4000/api/getPost/${postId}`, { withCredentials: true}).catch((error) => {
        throw error
    })

    return post.data
}