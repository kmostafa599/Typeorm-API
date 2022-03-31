import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne,JoinColumn } from "typeorm"
import { Post } from "./post";
import { User } from "./User";

@Entity('comment')
export class Comment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string
   
    @Column()
    description:string

    
    @ManyToOne(
        ()=> User,
        user => user.comment
        
    )
    user:User

    @ManyToOne(
        () => Post,
        post => post.comments
    )
    @JoinColumn({
        name: "post_id",

    })
    post: Post
    // @JoinColumn({
	// 	name: 'post_id',
	// })
	// post: Post;
}