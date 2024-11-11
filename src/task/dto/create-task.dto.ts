import { ApiProperty } from '@nestjs/swagger';
import {
    IsDate,
    IsNotEmpty,
    IsString,
    IsDateString,
    IsNumber,
} from 'class-validator';

export class CreateTaskDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'title: Поле не должно быть пустым' })
    @IsString({ message: 'title: Должно быть строкой' })
    title: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'description: Поле не должно быть пустым' })
    @IsString({ message: 'description: Должно быть строкой' })
    description: string;

    @ApiProperty()
    @IsDateString({}, { message: 'deadline: Поле должно быть датой' })
    @IsNotEmpty({ message: 'deadline: Поле не должно быть пустым' })
    deadline: Date;

    @ApiProperty()
    @IsNotEmpty({ message: 'userId: поле не должно быть пустым' })
    @IsNumber({}, { message: 'userId: поле должно быть числом' })
    projectId: number;
}
