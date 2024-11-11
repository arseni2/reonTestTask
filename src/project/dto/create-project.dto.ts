import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'title: Поле не должно быть пустым' })
    @IsString({ message: 'title: Должно быть строкой' })
    title: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'description: Поле не должно быть пустым' })
    @IsString({ message: 'description: Должно быть строкой' })
    description: string;
}
