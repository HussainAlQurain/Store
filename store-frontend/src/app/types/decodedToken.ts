export interface DecodedToken {
    "user":{
        id: number;
        first_name?: string;
        last_name?: string;
        username?: string;
        password_digest?: string;
        email?: string;
        token?: string;
    }
}