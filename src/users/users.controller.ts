
import { Controller, Get, Res, HttpStatus, Param, NotFoundException, Post, Body, Put, Query, Delete ,UseGuards, ForbiddenException} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { ValidateObjectId } from '../pipes/validate-object-id.pipes';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOkResponse, ApiForbiddenResponse, ApiBearerAuth, ApiParam, ApiQuery, ApiNotFoundResponse, ApiBadRequestResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ObjectID } from 'mongodb';


@UseGuards(JwtAuthGuard)
@Controller('users')
@ApiTags('Users')
@ApiBearerAuth()
@ApiUnauthorizedResponse({description:'Access Token is not valid or has expired'})
export class UsersController{
    constructor(private usersService: UsersService) { }  
    // Fetch all users
    @Get('/users')
    @ApiOkResponse({description:'The users list has been successfully returned.'})
    @ApiForbiddenResponse({description:'Forbidden.'})
    async getUsers(@Res() res) {
      const users = await this.usersService.getUsers();
      return res.status(HttpStatus.OK).json(users);
    }
    // Fetch a particular user using ID
    @Get(':userID')
    @ApiOkResponse({ description:'The user has been successfully returned.'})
    @ApiForbiddenResponse({description:'Forbidden.'})
    @ApiNotFoundResponse({description:'User does not exist.'})
    @ApiBadRequestResponse({description:'Invalid ID!'})
    @ApiParam({ name: 'userID', type: String })
    async getUser(@Res() res, @Param('userID', new ValidateObjectId()) userID) {
      const user = await this.usersService.getUser(new ObjectID(userID));
      if (!user) {
          throw new NotFoundException('User does not exist!');
      }
      return res.status(HttpStatus.OK).json(user);
    }
    // Submit a user
    @Post('/add')
    @ApiForbiddenResponse({description:'User with this email already exists'})
    async addUser(@Res() res, @Body() createUserDTO: CreateUserDTO) {
      await this.usersService.checkEmail(createUserDTO.email); 
      const newUser = await this.usersService.addUser(createUserDTO);
      return res.status(HttpStatus.OK).json({
        message: 'User has been submitted successfully!',
        user: newUser,
      });
    }   

    @Put('/edit')
    @ApiQuery({ name: 'userID', type: String })
    @ApiForbiddenResponse({description:'User with this new email already exists'})
    async editUser(
      @Res() res,
      @Query('userID', new ValidateObjectId()) userID,
      @Body() createUserDTO: CreateUserDTO,
    ) {
      if (userID != createUserDTO._id) {
        throw new NotFoundException('Incorrect user ID');
      }
      const user = await this.usersService.getUser(new ObjectID(userID));
      if (user && user.email !=  createUserDTO.email) {
        await this.usersService.checkEmail(createUserDTO.email);
      }
      const editedUser = await this.usersService.editUser(userID, createUserDTO);
      if (!editedUser) {
          throw new NotFoundException('User does not exist!');
      }
      return res.status(HttpStatus.OK).json({
        message: 'User has been successfully updated',
        user: editedUser,
      });
    }
    // Delete a user using ID
    @Delete('/delete')
    @ApiNotFoundResponse({description:'User does not exist!'})
    @ApiQuery({ name: 'userID', type: String })
    async deleteUser(@Res() res, @Query('userID', new ValidateObjectId()) userID) {
      const deletedUser = await this.usersService.deleteUser(userID);
      if (!deletedUser) {
          throw new NotFoundException('User does not exist!');
      }
      return res.status(HttpStatus.OK).json({
        message: 'User has been deleted!',
        user: deletedUser,
      });
    }
  }