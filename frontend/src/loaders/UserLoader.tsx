export async function loader(){
    const auth = localStorage.getItem("authenticated")
    const username = localStorage.getItem("username")
    if(auth !== 'true'){
        throw new Response("", {
            status: 401,
            statusText: "unauthorized"
        })
    }
    return username
}