import { Request, Response } from 'express'
import { Post } from "../entities/Post"
import { User } from '../entities/User'
import { Comment } from '../entities/Comment'

export const createComment = async(req: Request, res: Response) => {
    const { postId, comment } = req.body
    const user = await User.findOne({
        where: { 
            username: req.session.username
        }
    })

    const post = await Post.findOne({
        where: {
            id: postId
        }
    })

    const _comment : Comment = Comment.create({
        user,
        post,
        comment: comment
    })

    try {
        Comment.insert(_comment)
        res.status(200).send({ status: "ok"})
    } catch (error) {
        res.status(404).send({error: error})
    }
}

export const getPostComment = async(req: Request, res: Response) => {
    const postId = req.params.postId

    const comments = await Comment
    .createQueryBuilder('comment')
    .leftJoinAndSelect('comment.user', 'user')
    .select(['comment', 'user.username'])
    .where("comment.post = :id", { id : postId})
    .getMany()

  
    if(comments){
        res.status(200).send(comments)
    }else{
        res.status(404).send({error : "error"})
    }

}