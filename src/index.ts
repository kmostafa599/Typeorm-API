import { createConnection,  } from 'typeorm'
import {config} from 'dotenv'
import express,{Request, Response, json, urlencoded} from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import postRoutes from '../routes/posts'
import commentsRoutes from '../routes/comments'
import tagRoutes from '../routes/tags'
// import { AppDataSource } from "./data-source"
import { Post } from "../entities/post"
import { Tag } from '../entities/Tag'
import { Comment } from '../entities/comment'
import { User } from '../entities/User'
// import { AppDataSource } from './data.source'

config()

// findOneBy(id:{par})

const app = express()
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());
app.use(json());

app.use(urlencoded({ extended: false }));

app.get('/', (req:Request,res:Response)=>{
    res.send("test")
  
})

// app.post('/api/post/:userId',async (req, res) =>{ //localhost:3000/userId 
//     // return res.json(req.body)
//     const {userId} = req.params
//     const user_id = await User.findOneBy({id:parseInt(userId)})
//     const {
//         title,
//         votes,
        
//     } = req.body

//     const post = Post.create({
//         title:title,
//         votes:votes,
//         user: user_id
//     })
//     await post.save()
//     return res.json(post)
// })


app.post('/api/create_user',async (req, res) =>{ //localhost:3000/userId 
    
    const {
        name,
    } = req.body

    const user = User.create({
        name:name,
    })
    await user.save()
    return res.json(user)
})




app.use('/posts', postRoutes)
app.use('/comments', commentsRoutes)
app.use('/tags', tagRoutes)


app.listen(process.env.PORT,async () => {
    console.log(`Application started on port 7070!`);
    try {
        await createConnection({
            type:'postgres',
            host:process.env.DB_HOSTNAME,
            port:+process.env.DB_PORT!,
            username:process.env.DB_USERNAME,
            password:process.env.DB_PASSWORD,
            entities:[Post,User,Comment,Tag],
            synchronize:true,
            logging:false
        })  
    console.log(`Connected to DB`);

     } catch (error) {
           console.log({error})
        }

}) 
console.log("hello")