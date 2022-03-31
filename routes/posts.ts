import express from 'express'
import { In } from 'typeorm'
import { Post } from '../entities/post'
import { Tag } from '../entities/Tag'
import { User } from '../entities/User'

const routes = express()

// routes.get('/',async (req, res) =>{
// //     console.log("Inserting a new user into the database...")

// //     const postRepository 
// //     const post = new Post()
// //     post.title = "post title"
// //     post.comment = "Craig"
// //     post.votes = 50
// //     await AppDataSource.manager.save(post)
// //     console.log("Saved a new post with id: " + post.id)
// res.send(
   
//     res.json(posts)
//  )
// }
routes.get('/', async (req,res)=>{
    const posts = await Post.find() 
    if(!posts){
        return res.json({msg:"No Posts Found!"})
    }
    return res.json(posts)
})
routes.get('/:postId',async (req, res) =>{ //localhost:3000/userId 
    // const posts = await Post.find()

    const { postId } = req.params
    const post = await Post.findOneBy({id: parseInt(postId)})
    
    
    if(!post){
        return res.json({res:"Post not found"})
    }
    return res.json(post)
    
})
routes.post('/create/:userId',async (req, res) =>{ //localhost:3000/userId 
    // return res.json(req.body)
    const {userId} = req.params
    const userBody = await User.findOneBy({id:parseInt(userId)})
    const {
        title,
        votes,
        tags,
        comments
    } = req.body
    const tagsTable = await Tag.find({
        
            where:{id: In(tags)}
        
    }) 
    
    const post = Post.create({
        title:title,
        votes:votes,
        user: userBody,
        tags:tagsTable,
        comments:comments
    })
    await post.save()
    return res.json(post)
})

routes.put('/update/:postId',async (req, res) =>{
    const {postId} = req.params
    const postBody = await Post.findOneBy({id:parseInt(postId)})
    const post = Post.merge(postBody, req.body)
    await post.save()
    return res.json(post)
})
routes.delete('/delete/:id',async (req, res) =>{
    const {id} = req.params
    // const postBody = await Post.findOneBy({id:parseInt(id)})
    const post = Post.delete(id)
    
    return res.json(post)
})
// AppDataSource.initialize()

export default routes   