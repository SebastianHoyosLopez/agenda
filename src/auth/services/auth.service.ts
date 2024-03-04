import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import { UsersService } from '../../users/services/users.service';
import { UsersEntity } from '../../users/entities/users.entity';
import { PayloadToken } from '../interfaces/auth.interface';
@Injectable()
export class AuthService {
  constructor(private readonly userServices: UsersService) {}

  public async validateUser(usernameOrEmail: string, password: string) {
    const user = await this.getUserByUsernameOrEmail(usernameOrEmail);

    if (user && (await this.comparePasswords(password, user.password))) {
      return user;
    }

    return null;
  }

  private async getUserByUsernameOrEmail(
    usernameOrEmail: string,
  ): Promise<UsersEntity | null> {
    const userByUsername = await this.userServices.findBy({
      key: 'username',
      value: usernameOrEmail,
    });

    const userByEmail = await this.userServices.findBy({
      key: 'email',
      value: usernameOrEmail,
    });

    return userByUsername || userByEmail || null;
  }

  private async comparePasswords(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
  }

  public async validateToken(token: string): Promise<UsersEntity | null> {
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET, {
        ignoreExpiration: false,
      }) as jwt.JwtPayload;

      // Verificar la expiración del token
      if (decodedToken && decodedToken.exp) {
        const currentTimestamp = Math.floor(Date.now() / 1000);
        if (decodedToken.exp < currentTimestamp) {
          throw new UnauthorizedException('Token expirado');
        }
      }

      // Puedes realizar más validaciones según tus necesidades, como verificar roles, etc.
      if (decodedToken && decodedToken.sub) {
        const user = await this.userServices.findUsersById(decodedToken.sub);
        return user;
      }
    } catch (error) {
      // Manejar errores de decodificación o token no válido
      if (error instanceof jwt.JsonWebTokenError) {
        throw new UnauthorizedException('Error en el token');
      } else if (error instanceof jwt.TokenExpiredError) {
        throw new UnauthorizedException('Token expirado');
      } else {
        throw new UnauthorizedException('Token inválido');
      }
    }

    return null;
  }

  public signJWT({
    payload,
    secret,
    expires,
  }: {
    payload: jwt.JwtPayload;
    secret: string;
    expires: number | string;
  }) {
    return jwt.sign(payload, secret, { expiresIn: expires });
  }

  public async generateJWT(user: UsersEntity): Promise<any> {
    const getUser = await this.userServices.findUsersById(user.id);

    const payload: PayloadToken = {
      role: getUser.role,
      sub: getUser.id,
    };

    return {
      accessToken: this.signJWT({
        payload,
        secret: process.env.JWT_SECRET,
        expires: '1h',
      }),
      user,
    };
  }
}
