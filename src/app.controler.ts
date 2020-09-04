import { Controller, Request, Post, UseGuards, Get, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { ApiTags,ApiUnauthorizedResponse, ApiOkResponse, ApiForbiddenResponse, ApiBearerAuth} from '@nestjs/swagger';
import { UserLoginDTO } from './users/dto/userilogin.dto'; 
import { UsersService } from './users/users.service';
import { ObjectID } from 'mongodb';

@ApiTags('Login and Logout')
@Controller()
export class AppController {
  constructor(private authService: AuthService,private usersService: UsersService) {}
  //login User
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  @ApiOkResponse({description: 'result Token'})
  @ApiForbiddenResponse({description: 'Forbidden.'})
  @ApiUnauthorizedResponse({description: 'User doesn\'t exist or Wrong credentials.'})
  async login(
    @Request() req, @Body() userLoginDto: UserLoginDTO) {
    return this.authService.login(req.user['_doc']);
  }
  //logout User
  @Post('auth/logout')
  @ApiOkResponse({description: 'Always return statusCode: 201'})  
  async logout(@Request() req) {
    return {
      statusCode: 201
    }
  }
  // Get User profile
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiBearerAuth()  
  @ApiOkResponse({description: 'Return user profile'})
  @ApiUnauthorizedResponse({description: 'User Unauthorized'})
  async getProfile(@Request() req) {
  //return req.user;
    return await this.usersService.getUser(new ObjectID(req.user._id));
  }
}