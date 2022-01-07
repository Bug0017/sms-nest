import { Role } from './../roles/role.enum';
import { Injectable } from '@nestjs/common';
export type User = {
    id:string,
    name:string,
    username:string,
    password: string,
    role:Role
}
@Injectable()
export class UsersService {
  #roles: string[];
  #users: User[] = [
    {
      id: 'sursdffendarsdfds',
      name: 'surendar',
      username: 'sure',
      password: 'sure',
      role: Role.User
    },
    {
      id: 'sursdffendssssarsdfds',
      name: 'arun',
      username: 'arun',
      password: 'arun',
      role: Role.Admin
    },
  ];

  async findOne(username: string) {
    return this.#users.find((user) => user.username === username);
  }
}
