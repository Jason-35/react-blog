import axios from 'axios'
import { redirect } from 'react-router-dom'

export async function action({ request } : {request: Request}) {
    const formData = await request.formData()

    const username = formData.get('Username')
    const password = formData.get('Password')
    
    const result = await axios.post('http://localhost:4000/api/register', {username: username, password: password}).then(() => {
        return redirect("/dashboard")
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
        return redirect("/dashboard")
    }
}

