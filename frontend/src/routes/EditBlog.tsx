import { TextField } from "@mui/material"
import { Form, useLoaderData } from "react-router-dom"
import Button from '@mui/material/Button';
import "../styles/CreateBlog.css"   
import { postObject } from "../dto/post.dto";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function EditBlog(){
    const { postData } = useLoaderData() as { postData: postObject }
    const [publish, setPublish] = useState(postData.is_published)
    const { postId } = useParams()

    const handleSwitchPublish = () => {
        setPublish(!publish)
    }

    return(
    <div className="blog-container">
        <Form className="blog-form" method="post">
            <div className="blog-title">
            <TextField
                        label="Title"
                        name="Title"
                        type="title"
                        variant="filled"
                        className="blog-title-text"
                        sx={{backgroundColor: 'white', borderRadius: '3px'}}
                        required={true}
                        defaultValue={postData.title}
                    />
            </div>
            <div className="blog-content">
                <textarea className="blog-editor" name="Content" defaultValue={postData.content}/>
                <FormGroup>
                    <FormControlLabel control={<Switch checked={publish} onChange={handleSwitchPublish} />} label="Publish" name="edit-publish" value={publish} style={{color: "black"}}/>
                </FormGroup>
            </div>
            <div className="blog-submit"><Button variant="contained" type="submit" name="intent" value={`update-${postId}`}>Update</Button></div>
        </Form>
    </div>
    )
}