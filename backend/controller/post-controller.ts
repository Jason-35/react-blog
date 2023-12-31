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
        console.log("run1")
        res.send("deleted")
    } catch (error) {
        console.log(error)
        res.send("some error happened")
    }
}

export const getPost = async(req: Request, res: Response) => {
    const postId = req.params.postId 

    const post = await Post
    .createQueryBuilder('post')
    .leftJoinAndSelect('post.user', 'user')
    .select(['post', 'user.username'])
    .where("post.id = :id" , {id: postId})
    .getOne();


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
    .orderBy("post.id",'DESC')
    .where("post.published = :publish" , {publish: true})
    .getMany();
    
    if(postsWithUsernames){
        res.status(200).send({slicedPosts: postsWithUsernames.slice(page * 4 - 4, page * 4), maxLength: Math.ceil(postsWithUsernames.length/4)})
    }else{
        res.status(404).json({error:"no post"})
    }
}

export const userPost = async ( req: Request, res: Response) => {
    let page: number = Number(req.query.page) 

    const userPost = await Post
    .createQueryBuilder('post')
    .leftJoinAndSelect('post.user', 'user')
    .select(['post', 'user.username'])
    .where("post.user = :user", {user: req.session.username})
    .getMany();

    if(userPost){
        res.status(200).send({slicedPosts: userPost.slice(page * 5 - 5, page * 5), maxLength: Math.ceil(userPost.length/5)})
    }else{
        res.status(404).json({error: "no post"})
    }
}