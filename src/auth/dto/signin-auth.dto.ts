import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SigninAuthDto {
    @IsEmail({}, { message: 'email не валидный' })
    @IsNotEmpty({ message: 'поле должно быть заполненным' })
    @ApiProperty({ default: 'user@gmail.com' })
    email: string;

    @ApiProperty({ default: 'user' })
    @IsNotEmpty({ message: 'поле должно быть заполненным' })
    password: string;
}
