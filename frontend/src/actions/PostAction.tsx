import axios from "axios"
import { redirect } from "react-router-dom"

export async function action({ request } : {request: Request}) {
    const formData = await request.formData()

    const intent = formData.get('intent')
    const content = formData.get('Content')
    const title = formData.get('Title')

    const user = localStorage.getItem('username')

    if (intent === "save"){
        const publish = false
        const data = {
            title: title,
            content: content,
            is_published: publish
        }
        await axios.post('http://localhost:4000/api/createPost', data, { withCredentials: true}).catch((err) => {
            throw err
        })
        return redirect(`/home/${user}/collection?page=1`)
    }else if (intent === "publish"){
        const publish = true
        const data = {
            title: title,
            content: content,
            is_published: publish
        }
        await axios.post('http://localhost:4000/api/createPost', data, { withCredentials: true}).catch((err) => {
            throw err
        })
        return redirect(`/home/${user}/collection?page=1`)
    }else{
        return null
    }
}