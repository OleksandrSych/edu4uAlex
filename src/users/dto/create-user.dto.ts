import { ApiProperty } from '@nestjs/swagger';
 

export class CreateUserDTO {

    _id : any;
    @ApiProperty({description: 'User email'})
    readonly email: string;

    @ApiProperty({description: 'User password'})
    readonly password: string;
    
    @ApiProperty({description: 'User First Name'})
    readonly firstName: string;

    @ApiProperty({description: 'User Last Name'})
    readonly lastName: string;

    @ApiProperty({description: 'User Contact phone number', 
        required: false 
    })
    readonly contactPhone: string;

    @ApiProperty({description: 'User Title',
        required: false 
    })
    readonly title: string;

    @ApiProperty({description: 'User Interests',
        required: false        
    })
    readonly interests: string;
    @ApiProperty({description: 'User Role',
        required: false        
    })
    readonly role: string;
}