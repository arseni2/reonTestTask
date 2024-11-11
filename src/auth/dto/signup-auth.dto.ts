import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignupAuthDto {
    @IsNotEmpty({ message: 'поле должно быть заполненным' })
    @ApiProperty()
    name: string;

    @IsEmail({}, { message: 'email не валидный' })
    @IsNotEmpty({ message: 'поле должно быть заполненным' })
    @ApiProperty()
    email: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'поле должно быть заполненным' })
    password: string;
}
