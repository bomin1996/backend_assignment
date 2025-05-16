export class CreateUserDto {
    username: string;
    password: string;
    role?: 'USER' | 'OPERATOR' | 'ADMIN' | 'AUDITOR';
}
