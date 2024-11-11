import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty } from 'class-validator';

export class ChangeDeadlineDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'deadline: поле не должно быть пустым' })
    @IsDate({ message: 'deadline: поле должно быть датой' })
    deadline: Date;
}
