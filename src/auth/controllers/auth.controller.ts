import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthDTO } from '../dto/auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { PublicAccess } from '../decorators/public.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() { username, password }: AuthDTO) {
    const userAuthentication = await this.authService.validateUser(
      username,
      password,
    );

    if (!userAuthentication) {
      throw new UnauthorizedException('Data not valid');
    }

    if (userAuthentication) {
      const { accessToken, user: authenticatedUser } =
        await this.authService.generateJWT(userAuthentication);
      return { accessToken, user: authenticatedUser };
    } else {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    // const jwt = await this.authService.generateJWT(userAuthentication);
    // return jwt;
  }

  @PublicAccess()
  @Post('validate-token')
  async validateToken(@Body('token') token: string) {
    try {
      const userValidate = await this.authService.validateToken(token);
      if (userValidate === null) {
        return `token inválido`;
      } else {
        return { isValid: true, userValidate };
      }
    } catch (error) {
      throw new UnauthorizedException('Token expirado');
    }
  }
}
