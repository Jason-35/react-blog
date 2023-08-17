import axios from 'axios'
import { Params } from 'react-router-dom'

export async function action({ request, params } : {request: Request, params: Params}){
    const { postId } = params
    const formData = await request.formData()
    const comment = formData.get('comment-field')

    console.log(comment)

    await axios.post(`http://localhost:4000/api/createComment`, {postId: postId, comment: comment}, { withCredentials: true}).catch((error) => {
        throw error
    })

    return null
}