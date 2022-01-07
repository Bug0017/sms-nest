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
      username: 'sure@test.com',
      password: 'sure123',
      role: Role.User
    },
    {
      id: 'sursdffendssssarsdfds',
      name: 'arun',
      username: 'arun@test.com',
      password: 'arun123',
      role: Role.Admin
    },
  ];

  async findOne(username: string) {
    return this.#users.find((user) => user.username === username);
  }
}
