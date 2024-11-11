import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class AddResponsibleDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'userId: поле не должно быть пустым' })
    @IsNumber({}, { message: 'userId: поле должно быть числом' })
    userId: number;
}
