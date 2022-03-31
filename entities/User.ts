import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany, OneToMany, JoinTable, ManyToOne } from "typeorm"
import { Comment } from "./comment"
import { Post } from "./post"
import { Tag } from "./Tag"

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string
    

    
    // @ManyToOne(()=>User,(user)=>user.post)
    @OneToMany(
        ()=> Post,
        post => post.user
    )
    posts:Post[]

    @OneToMany(
        ()=>Comment,
        comment => comment.user
    )
    comment:Comment
}

   

