import { Controller, UseGuards, Get, Res, Param, Post, Body, Put, Query, Delete, NotFoundException, HttpStatus } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiUnauthorizedResponse, ApiOkResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiBadRequestResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { ObjectID } from 'mongodb';
import { ValidateObjectId } from 'src/pipes/validate-object-id.pipes';
import { UniversitiesService } from './universities.service';
import { CreateDepartmentDTO } from './dto/create-department.dto';


@UseGuards(JwtAuthGuard)
@Controller('universities')
@ApiTags('Universities')
@ApiBearerAuth()
@ApiUnauthorizedResponse({description:'Access Token is not valid or has expired'})
export class UniversitiesController {
    constructor(private universitiesService: UniversitiesService) { }  
    // Fetch all universities
    @Get('/universities')
    @ApiOkResponse({description:'The universities list has been successfully returned.'})
    @ApiForbiddenResponse({description:'Forbidden.'})
    async getDepartments(@Res() res) {
      const Universities = await this.universitiesService.getDepartments("");
      return res.status(HttpStatus.OK).json(Universities);
    }
    // Fetch a particular department using ID
    @Get(':id')
    @ApiOkResponse({ description:'The department has been successfully returned.'})
    @ApiForbiddenResponse({description:'Forbidden.'})
    @ApiNotFoundResponse({description:'Department does not exist.'})
    @ApiBadRequestResponse({description:'Invalid id!'})
    @ApiParam({ name: 'id', type: String })
    async getDepartment(@Res() res, @Param('id', new ValidateObjectId()) id) {
      const department = await this.universitiesService.getDepartment(new ObjectID(id));
      if (!id) {
          throw new NotFoundException('Department does not exist!');
      }
      return res.status(HttpStatus.OK).json(department);
    }
    // Fetch departments using patent ID
    @Get('departments/:id')
    @ApiOkResponse({ description:'The departments has been successfully returned by parent id'})
    @ApiForbiddenResponse({description:'Forbidden.'})
    @ApiNotFoundResponse({description:'Department does not exist.'})
    @ApiBadRequestResponse({description:'Invalid id!'})
    @ApiParam({ name: 'id', type: String })
    async getDepartmentsPatentID(@Res() res, @Param('id', new ValidateObjectId()) id) {
        const departments = await this.universitiesService.getDepartments(id);
        return res.status(HttpStatus.OK).json(departments);
    }

    // Submit a department
    @Post('/add') 
    async addDepartment(@Res() res, @Body() createDepartmentDTO: CreateDepartmentDTO) { 
      const newDepartment = await this.universitiesService.addDepartment(createDepartmentDTO);
      return res.status(HttpStatus.OK).json({
        message: 'Department has been submitted successfully!',
        department: newDepartment,
      });
    }   

    @Put('/edit')
    @ApiQuery({ name: 'id', type: String }) 
    async editDepartment(
      @Res() res,
      @Query('id', new ValidateObjectId()) id,
      @Body() createDepartmentDTO: CreateDepartmentDTO,
    ) {
      if (id != createDepartmentDTO._id) {
        throw new NotFoundException('Incorrect department id');
      }
      const editedDepartment= await this.universitiesService.editDepartment(id, createDepartmentDTO);
      if (!editedDepartment) {
          throw new NotFoundException('Department does not exist!');
      }
      return res.status(HttpStatus.OK).json({
        message: 'Department has been successfully updated',
        department: editedDepartment,
      });
    }
    // Delete a department using ID
    @Delete('/delete')
    @ApiNotFoundResponse({description:'Department does not exist!'})
    @ApiQuery({ name: 'id', type: String })
    async deleteDepartment(@Res() res, @Query('id', new ValidateObjectId()) id) {
      const deletedDepartment = await this.universitiesService.deleteDepartment(id);
      if (!deletedDepartment) {
          throw new NotFoundException('Department does not exist!');
      }
      return res.status(HttpStatus.OK).json({
        message: 'Departmentser has been deleted!',
        department: deletedDepartment,
      });
    }
  }