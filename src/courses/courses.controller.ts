import { Controller, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';


@UseGuards(JwtAuthGuard)
@Controller('courses')
@ApiTags('Courses')
@ApiBearerAuth()
@ApiUnauthorizedResponse({description:'Access Token is not valid or has expired'})
export class CoursesController {}
