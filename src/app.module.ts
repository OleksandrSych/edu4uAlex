import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UsersController} from './users/users.controller';
import { AppController } from './app.controler';
import { MongooseModule } from '@nestjs/mongoose'; 
 
//let url = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${parseInt(process.env.DB_PORT)}/${process.env.DB_DATABASE_NAME}`;
let url = "mongodb+srv://alex:admin@cluster0.jczgn.mongodb.net/edu4u?retryWrites=true&w=majority";

@Module({
  imports: [
   // DatabaseModule,
    AuthModule,
    UsersModule,
    MongooseModule.forRoot(url),
  ],
  controllers: [
    AppController,
    UsersController
  ],
  providers: [],
})
export class AppModule {}
