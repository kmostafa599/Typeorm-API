import express from 'express'
import { Comment } from '../entities/comment'
import { Post } from '../entities/post'
import { User } from '../entities/User'

const routes = express()

routes.get('/',async (req, res) =>{
    const comments = await Comment.find()
    if(!comments){
        res.send("No Comments Found")
    }
    return res.json(comments)
})
routes.post('/create/:postId/:userId',async (req, res) =>{
    const {postId,userId} =  req.params
    const post = await Post.findOneBy({id:parseInt(postId)})
    const user = await User.findOneBy({id:parseInt(userId)})
    const {
        title,
        description,
    } = req.body
    const comment =  Comment.create({
        title:title,
        description:description,
        user:user,
        post:post,
    })
    await comment.save()
    return res.json(comment)
})
routes.put('/update/:commentId/:userId',async (req, res) =>{
    const {commentId, userId} = req.params
    const commentBody = await Post.findOneBy({id:parseInt(commentId)})
    const comment = Post.merge(commentBody, req.body)
    await comment.save()
    return res.json(comment)
})
routes.delete('/delete/:id',async (req, res) =>{
    const { id } = req.params
    const comment = Comment.delete(id)
    return res.json(comment)
})


export default routes