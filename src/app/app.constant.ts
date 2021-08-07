export const apiUrl = 'http://localhost:3000';

export enum ROLE {
    ADMIN = 'admin',
    USER = 'user',
}

export enum GENDER {
    MALE = 'male',
    FEMALE = 'female',
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
}