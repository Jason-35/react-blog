import { TextField } from "@mui/material"
import { Form } from "react-router-dom"
import 'react-quill/dist/quill.snow.css';
import Button from '@mui/material/Button';
import "../styles/CreateBlog.css"   
import { useState } from 'react'

export default function CreateBlog(){
    const [textValue, setTextValue] = useState("")
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
                        value={textValue}
                        onChange={(e) => setTextValue(e.target.value)}
                    />
            </div>
            <div className="blog-content" style={{color: "black"}}>
                <textarea className="blog-editor" name="Content"/>
            </div>
            <div className="blog-submit"><Button variant="contained" type="submit" name="intent" value="save">Save</Button> <Button variant="contained" type="submit" name="intent" value="publish">Publish</Button></div>
        </Form>
    </div>
    )
}