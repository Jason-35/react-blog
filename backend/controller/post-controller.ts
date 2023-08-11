import { Request, Response } from 'express'
import { Post } from "../entities/Post"
import { User } from '../entities/User'

export const createPost = async(req: Request, res: Response) => {
    const { title, content, is_published } = req.body
    
    const user = await User.findOne({
        where: { 
            username: req.session.username
        }
    })

    const post: Post = Post.create({
        title: title,
        content: content,
        is_published: is_published,
        user
    })

    try {
        await post.save()
        res.status(200).send("created post")
    } catch (error) {
        res.status(500).json({error: "something went wrong trying to save post"})
    }
    
}

export const deletePost = async(req: Request, res: Response) => {
    const postId = req.params.postId
    const post = await Post.findOne({
        where: {
            id: parseInt(postId)
        }
    })

    try {
        await Post.remove(post)
        res.send("deleted")
    } catch (error) {
        res.send("some error happened")
    }
}

export const getPost = async(req: Request, res: Response) => {
    const postId = req.params.postId 
    console.log(req.query.page)
    const post = await Post.findOne({
        where: {
            id: parseInt(postId)
        }
    })

    if(post){
        res.send(post)
    }else{
        res.status(404).json({error: "post not found"})
    }
}

export const updatePost = async(req: Request, res: Response) => {
    const { title, content, is_published } = req.body 
    const postId = req.params.postId 
    
    const post = await Post.findOne({
        where: {
            id: parseInt(postId)
        }
    })

    if(post){
        post.title = title
        post.content = content
        post.is_published = is_published
        await post.save()
        res.status(200).send(post)
    }else{
        res.status(404).json({error: "post not found"})
    }
    
}

export const allPost = async ( req: Request, res: Response) => {
    let page: number = Number(req.query.page) 

    const postsWithUsernames = await Post
    .createQueryBuilder('post')
    .leftJoinAndSelect('post.user', 'user')
    .select(['post', 'user.username']) // Select the post and username columns
    .getMany();
    
    if(postsWithUsernames){
        res.status(200).send({slicedPosts: postsWithUsernames.slice(page * 5 - 5, page * 5), maxLength: Math.ceil(postsWithUsernames.length/5)})
    }else{
        res.status(404).json({error:"no post"})
    }
}