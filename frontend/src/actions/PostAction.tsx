import axios from "axios"
import { redirect } from "react-router-dom"

export async function action({ request } : {request: Request}) {
    const formData = await request.formData()

    const intent = formData.get('intent') as string
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
    }else if(intent.includes("delete")){
        console.log("work")
        const postId = intent.split("-")[1]
        await axios.delete(`http://localhost:4000/api/deletePost/${postId}`, { withCredentials: true}).catch((error) => {
            console.log(error)
        })
        console.log(postId)
        return null
    }
    else if (intent.includes("update")){
        const postId = intent.split("-")[1]
        let publish = false
        const EditPublish = formData.get("edit-publish")
        if(EditPublish){
            publish = true
        }
        const data = {
            title: title,
            content: content,
            is_published: publish
        }
        await axios.put(`http://localhost:4000/api/updatePost/${postId}`, data, { withCredentials: true}).catch((error) => {
            console.log(error)
        })
        return null
    }
    else
    {
        return null
    }
}