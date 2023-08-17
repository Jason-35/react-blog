import { Form, useLoaderData } from "react-router-dom"
import { commentObject, postObject } from "../dto/post.dto"
import { Button, TextField } from "@mui/material"
import { useState } from "react"

export default function ViewPost(){
    const { postData, commentData } = useLoaderData() as { postData: postObject, commentData: commentObject[] }
    const [textValue, setTextValue] = useState("")

    console.log(postData.content)
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault
        setTextValue("")
    }

    return (
        <div style={{color: "black"}}>
            <div className="title">
                <h1>{postData.title}</h1>
            </div>
            <div className="author">
                <div>{postData.user.username}</div>
                <div>{postData.createdAt}</div>
            </div>
            <div className="content">
                <pre>{postData.content}</pre>
            </div>
            <div className="comment-text">
                <Form method="post" onSubmit={handleSubmit}>
                    <div>
                        <TextField
                            id="filled-multiline-flexible"
                            multiline
                            maxRows={5}
                            variant="filled"
                            value={textValue}
                            name="comment-field"
                            onChange={(e) => setTextValue(e.target.value)}
                        />
                    </div>
                    <div>
                        <Button variant="contained" type="submit">Comment</Button>
                    </div>
                </Form>
            </div>
            <div className="comments">
                {commentData.map((item : commentObject) => (
                    <div key={item.id}>
                        <div>{item.comment}</div>
                        <div>by {item.user.username}</div>
                        <div>{item.createdAt}</div>
                    </div>
            ))}
            </div>
        </div>
    )
}