import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty({ message: 'поле должно быть заполненным' })
    @ApiProperty()
    name: string;

    @IsNotEmpty({ message: 'поле должно быть заполненным' })
    @IsEmail({}, { message: 'email не валидный' })
    @ApiProperty()
    email: string;

    @IsNotEmpty({ message: 'поле должно быть заполненным' })
    @ApiProperty()
    password: string;
}
