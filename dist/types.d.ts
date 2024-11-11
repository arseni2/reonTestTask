export interface IRequestWithUser extends Request {
    user: IUserJWT;
}
export interface IUserJWT {
    id: number;
    role: string;
}
