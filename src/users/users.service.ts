import { Injectable } from '@nestjs/common';
export type User = {
    id:string,
    name:string,
    username:string,
    password: string
}
@Injectable()
export class UsersService {
    #users: User[]  = [
        {
            id:'sursdffendarsdfds',
            name: 'surendar',
            username: 'sure',
            password: 'sure'
        }
    ]

    async findOne(username:string) {
        return this.#users.find((user)=>user.username === username);
    }
}
