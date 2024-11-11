import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class AddEmplProjectDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'userId: Поле не должно быть пустым' })
    @IsNumber({}, { message: 'userId: Должно быть числом' })
    userId: number;

    @ApiProperty()
    @IsNotEmpty({ message: 'projectId: Поле не должно быть пустым' })
    @IsNumber({}, { message: 'projectId: Должно быть числом' })
    projectId: number;
}
