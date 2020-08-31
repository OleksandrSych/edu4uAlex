import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from 'class-validator';
 
export class UserLoginDTO {
    @IsEmail()
    @ApiProperty({example:'admin@admin.com'})
    username: string;
    @IsNotEmpty()
    @ApiProperty({example:'admin'})
    password: string;
  }