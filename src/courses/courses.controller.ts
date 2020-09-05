import { Controller, UseGuards, Get, Res, HttpStatus, Post, Body, Param, Put, Query, NotFoundException, Delete } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CoursesService} from './courses.service';
import { ApiTags, ApiBearerAuth, ApiUnauthorizedResponse, ApiOkResponse, ApiForbiddenResponse, ApiBadRequestResponse, ApiNotFoundResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { ObjectID } from 'mongodb';
import { ValidateObjectId } from 'src/pipes/validate-object-id.pipes';
import { CreateCourseDTO } from './dto/create-course.dto';



@UseGuards(JwtAuthGuard)
@Controller('courses')
@ApiTags('Courses')
@ApiBearerAuth()
@ApiUnauthorizedResponse({description:'Access Token is not valid or has expired'})
export class CoursesController {
    constructor(private coursesService: CoursesService) { }  
    // Fetch all courses
    @Get('/courses')
    @ApiOkResponse({description:'The courses list has been successfully returned.'})
    @ApiForbiddenResponse({description:'Forbidden.'})
    async getUsers(@Res() res) {
      const courses = await this.coursesService.getCourses();
      return res.status(HttpStatus.OK).json(courses);
    }
    // Fetch a particular course using ID
    @Get(':id')
    @ApiOkResponse({ description:'The course has been successfully returned.'})
    @ApiForbiddenResponse({description:'Forbidden.'})
    @ApiNotFoundResponse({description:'Course does not exist.'})
    @ApiBadRequestResponse({description:'Invalid id!'})
    @ApiParam({ name: 'id', type: String })
    async getCourse(@Res() res, @Param('id', new ValidateObjectId()) id) {
      const course = await this.coursesService.getCourse(new ObjectID(id));
      if (!id) {
          throw new NotFoundException('Course does not exist!');
      }
      return res.status(HttpStatus.OK).json(course);
    }
    // Fetch courses using department ID
    @Get('courses/:departmentiId')
    @ApiOkResponse({ description:'The courses has been successfully returned by department id'})
    @ApiForbiddenResponse({description:'Forbidden.'})
    @ApiNotFoundResponse({description:'Course does not exist.'})
    @ApiBadRequestResponse({description:'Invalid id!'})
    @ApiParam({ name: 'departmentiId', type: String })
    async getCoursesDepartmentId(@Res() res, @Param('departmentiId', new ValidateObjectId()) id) {
        const departments = await this.coursesService.getCoursesDepartmentId(id);
        return res.status(HttpStatus.OK).json(departments);
    }

    // Submit a course
    @Post('/add') 
    async addUser(@Res() res, @Body() createCourseDTO: CreateCourseDTO) { 
      const newCourse = await this.coursesService.addCourse(createCourseDTO);
      return res.status(HttpStatus.OK).json({
        message: 'Course has been submitted successfully!',
        course: newCourse,
      });
    }   

    @Put('/edit')
    @ApiQuery({ name: 'id', type: String })
    @ApiForbiddenResponse({description:'Course with this new email already exists'})
    async editCourse(
      @Res() res,
      @Query('id', new ValidateObjectId()) id,
      @Body() createCourseDTO: CreateCourseDTO,
    ) {
      if (id != createCourseDTO._id) {
        throw new NotFoundException('Incorrect course id');
      }
      const editedCourse= await this.coursesService.editCourse(id, createCourseDTO);
      if (!editedCourse) {
          throw new NotFoundException('Course does not exist!');
      }
      return res.status(HttpStatus.OK).json({
        message: 'Course has been successfully updated',
        course: editedCourse,
      });
    }
    // Delete a course using ID
    @Delete('/delete')
    @ApiNotFoundResponse({description:'Course does not exist!'})
    @ApiQuery({ name: 'id', type: String })
    async deleteCourse(@Res() res, @Query('id', new ValidateObjectId()) id) {
      const deletedCourse = await this.coursesService.deleteCourse(id);
      if (!deletedCourse) {
          throw new NotFoundException('Course does not exist!');
      }
      return res.status(HttpStatus.OK).json({
        message: 'Course has been deleted!',
        course: deletedCourse,
      });
    }
  }