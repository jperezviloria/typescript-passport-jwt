import {Entity, Column, PrimaryGeneratedColumn} from "typeorm"
import "reflect-metadata"

@Entity()
export class Users{

    @PrimaryGeneratedColumn()
    idUser : number;

    @Column()
    emailUser : string;

    @Column()
    passwordUser : string;

    @Column()
    levelUser : number;

    @Column()
    rolUser : string;
}


export interface IUser {
    idUser ?: number;
    emailUser ?:string;
    passwordUser ?: string;
    levelUser ?: number;
    rolUser ?: string;

}