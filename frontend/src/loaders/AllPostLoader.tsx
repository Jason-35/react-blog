import axios from "axios";
export async function loader({ request } : { request: Request }){
    const url = new URL(request.url);
    const page = url.searchParams.get("page");
    const posts = await axios.get(`http://localhost:4000/api/allPost?page=${page}`,  { withCredentials: true })
    console.log(posts.data.slicedPosts)
    return {postData: posts.data.slicedPosts, maxLength: posts.data.maxLength }
}