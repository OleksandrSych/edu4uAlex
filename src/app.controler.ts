
import { Controller, Request, Post, UseGuards, Get, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { ApiTags,ApiUnauthorizedResponse, ApiBody, ApiHeader, ApiOkResponse, ApiForbiddenResponse, ApiBasicAuth,ApiParamOptions, ApiParam , ApiHeaderOptions, ApiBearerAuth} from '@nestjs/swagger';
import { UserLoginDTO } from './users/dto/userilogin.dto';

@ApiTags('Login and Logout')
@Controller()
export class AppController {
  constructor(private authService: AuthService) {}


 
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')

  @ApiOkResponse({description: 'result Token'})
  @ApiForbiddenResponse({description: 'Forbidden.'})
  @ApiUnauthorizedResponse({description: 'User doesn\'t exist or Wrong credentials.'})
  async login(
    @Request() req, @Body() userLoginDto: UserLoginDTO) {
    return this.authService.login(userLoginDto);
  }
 
  @ApiOkResponse({description: 'Always return statusCode: 200'})
  @Post('auth/logout')
  async logout(@Request() req) {
    return {
      statusCode: 200
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('profile')
  @ApiOkResponse({description: 'Return user profile'})
  @ApiUnauthorizedResponse({description: 'User Unauthorized'})
  getProfile(@Request() req) {
    return req.user;
  }
}