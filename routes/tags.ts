import express from 'express'
import { TypeFlags } from 'typescript'
import { Tag } from '../entities/Tag'
const routes = express()

routes.get('/',async (req, res) =>{
    // res.send({tags:{
    
    // }})})
    const tags = await Tag.find()
    if(!tags){
        return res.json({res:"No Tags Found"})
    }
    return res.json(tags)
})
routes.post('/create/',async (req, res) =>{
    const {name} = req.body
    const tag = Tag.create({
        name:name
    })
    await tag.save()

    return res.json(tag)
})
routes.put('/',async (req, res) =>{
    
})
// routes.delete('/delete/:tagId',async (req, res) =>{
//     // const tag = Tag.delete({
//     //     id:
//     // }
//     )
// })


export default routes