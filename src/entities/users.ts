import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number | undefined;

	@Column("text")
	name: string = "";

	@Column("text")
	email: string = "";

	constructor(name: string, email: string){
		this.name = name
		this.email = email
	}
}