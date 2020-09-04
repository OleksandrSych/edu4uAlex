import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UsersController} from './users/users.controller';
import { AppController } from './app.controler';
import { MongooseModule } from '@nestjs/mongoose'; 
import { UniversitiesModule } from './universities/universities.module';
import { CoursesModule } from './courses/courses.module';
 
let url =  process.env.DB_URI || "mongodb+srv://alex:admin@cluster0.jczgn.mongodb.net/edu4u?retryWrites=true&w=majority";
console.log(url);
@Module({
  imports: [
   // DatabaseModule,
    AuthModule,
    UsersModule,
    MongooseModule.forRoot(url),
    UniversitiesModule,
    CoursesModule,
  ],
  controllers: [
    AppController,
    UsersController
  ],
  providers: [],
})
export class AppModule {}
