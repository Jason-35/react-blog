import axios from 'axios'
import { redirect } from 'react-router-dom'

export async function action({ request } : {request: Request}) {
    const formData = await request.formData()

    const intent = formData.get('intent')
    const username = formData.get('Username')
    const password = formData.get('Password')

    if(intent === 'register')
    {    
        const result = await axios.post('http://localhost:4000/api/register', {username: username, password: password}, { withCredentials: true }).then((e) => {
            return e.data
        }).catch((err) => {
            const { status } = err.response.data
            if (status === 409){
                return {dup : true}
            }else{
                throw err
            }
        })
    
        const { dup } = result as {dup: boolean}
    
        if (dup){
            return true
        }else{
            localStorage.setItem("authenticated", result.authenticated)
            localStorage.setItem("username", result.username)
            return redirect(`/home/${result.username}`)
        }
    }
    else if(intent === 'login')
    {
        const result = await axios.post('http://localhost:4000/api/login', {username: username, password: password}, { withCredentials: true }).then((e) => {
            return e.data
        }).catch((err) => {
            const { status } = err.response.data
            if (status === 401){
                return {valid : false}
            }else{
                throw err
            }
        })

        const { valid } = result as {valid: boolean}


        if (valid === false){
            return {invalid : true}
        }else{
            localStorage.setItem("authenticated", result.authenticated)
            localStorage.setItem("username", result.username)
            return redirect(`/home/${result.username}`)
        }
    }else
    {
        return null
    }


}

