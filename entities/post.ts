import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany, OneToMany, JoinTable, ManyToOne, JoinColumn } from "typeorm"
import { Comment } from "./comment"
import { Tag } from "./Tag"
import { User } from "./User"

@Entity()
export class Post extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string
    @Column({
        nullable: true,
    })
    body: string
    @ManyToMany(() => Tag, tag=>tag.posts ,{
        cascade: true,
    })   
     @JoinTable()
    tags: Tag[]
    @Column()
    votes: number
    @OneToMany(
        () => Comment,
        comment => comment.post
    )
    comments: Comment[]

    @ManyToOne(
        () => User,
        user => user.posts
    )
    @JoinColumn({
        name: "user_id",

    })
    user: User

    
    
    // @JoinTable({
    //     name: "post_tag",
    //     joinColumn: {
    //         name: "post",
    //         referencedColumnName: 'id'
    //     },
    //     inverseJoinColumn: {

    //         name: "tag",
    //         referencedColumnName: 'id'
    //     }
    // })
    // tags: Tag[]
}



