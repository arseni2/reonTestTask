import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshAuthDto {
    @IsNotEmpty({ message: 'поле не должно быть пустым' })
    @IsString({ message: 'поле должно быть строкой' })
    @ApiProperty()
    refreshToken: string;
}
