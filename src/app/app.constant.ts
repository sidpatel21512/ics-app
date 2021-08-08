export enum ROLE {
    ADMIN = 'admin',
    USER = 'user',
}

export enum GENDER {
    MALE = 'male',
    FEMALE = 'female',
}

export const Methods = {
    Accounts: '/accounts',
    Users: '/users'
}

export interface IAccount {
    id: number;
    username: string;
    password: string;
    role: ROLE;
    userId: number;
}

export interface IProfile {
    id: number;
    name: string;
    email: string;
    username: string;
    gender: GENDER;
    role: ROLE;
}

export interface IUserDetails {
    id: number;
    username: string;
    email: string;
    role: ROLE;
    name: string;
    gender: GENDER;
}

export class UserDetails {
    public isEdit = false;
    public editEmail: string;
    public editRole: ROLE;
    constructor(
        public readonly id: number,
        public readonly username: string,
        public readonly name: string,
        public readonly gender: string,
        public email: string,
        public role: ROLE
    ) {
        this.editEmail = email;
        this.editRole = role;
    }
}