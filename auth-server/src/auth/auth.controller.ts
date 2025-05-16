import {Body, Controller, Get, Post, Request, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import {LoginUserDto} from "./dto/login-user.dto";
import { AuthGuard } from '@nestjs/passport';
import {RolesGuard} from "./roles.guard";
import {Roles} from "./roles.decorator";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    register(@Body() createUserDto: CreateUserDto) {
        return this.authService.register(createUserDto);
    }

    @Post('login')
    login(@Body() loginUserDto: LoginUserDto) {
        return this.authService.login(loginUserDto.username, loginUserDto.password);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Get('me')
    @Roles('USER', 'ADMIN')
    getProfile(@Request() req) {
        return req.user;
    }

}



