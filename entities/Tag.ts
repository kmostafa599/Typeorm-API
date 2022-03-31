import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany, JoinTable } from "typeorm"
import { Post } from "./post"

@Entity('tag')
export class Tag extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    // @ManyToMany(
    //     ()=> Post,
    // )
    // post:Post[]
    @ManyToMany((type) => Post, post=>post.tags ,)   
     @JoinTable()
    posts: Post[]
}
