import { BcryptAdapter, envs, JwtAdapter } from "../../config";
import { UserModel } from "../../data/mongodb/models/user.model";

import { CustomError, GetAndDeleteUserDto, LoginUserDto, RegisterUserDto, UpdateUserDto, UserEntity } from "../../domain";
import { EmailService } from "./email.service";


type HashFunction = (password: string) => string;
type ConpareFunction = (password: string, hashed: string) => boolean;




export class AuthService {

  constructor(
    //DI - Servicio Email
    private readonly emailservice: EmailService,
    private readonly hashPassword: HashFunction = BcryptAdapter.hash,
    private readonly comparePassword: ConpareFunction = BcryptAdapter.compare,
  ) { }

  async registerUser(registerUserDto: RegisterUserDto) {

    const existUser = await UserModel.findOne({ email: registerUserDto.email })
    if (existUser) {
      throw CustomError.badRequest('User already exist')
    }

    try {

      const user = new UserModel(registerUserDto)

      //encriptar contraseña
      user.password = BcryptAdapter.hash(registerUserDto.password)
      await user.save();

      //enviar correo de verificacion
      await this.sendEmailValidationLink(user.email)

      const { password, ...userEntity } = UserEntity.fromJson(user)

      const token = await this.generateTokenService(user.id)

      return {
        user: userEntity,
        token
      }

    } catch (error) {
      throw CustomError.internalServer(`${error}`)
    }

  }

  async loginUser(loginUserDto: LoginUserDto) {
    //find one para verificar si existe el usuario
    const user = await UserModel.findOne({ email: loginUserDto.email })
    if (!user) {
      throw CustomError.badRequest('User or email invalid')
    }

    //ismatch ..bcrypt
    const isMatchPassword = BcryptAdapter.compare(loginUserDto.password, user.password)
    if (!isMatchPassword) {
      throw CustomError.badRequest('Invalid credentials')
    }

    const { password, ...userEntity } = UserEntity.fromJson(user)

    const token = await this.generateTokenService(user.id)



    return {
      user: userEntity,
      token: token
    }
  }

  async update(updateUserDto: UpdateUserDto) {
    const { id, ...rest } = updateUserDto;

    try {
      if (!id || !rest) {
        throw CustomError.badRequest('Invalid update data');
      }

      //1. verificar si el correo existe
      const existsEmail = await UserModel.findOne({ email: rest.email });
      if (existsEmail) {
        throw CustomError.badRequest('User already exists');
      }

      if (rest.password) {
        rest.password = this.hashPassword(rest.password);
      }

      const user = await UserModel.findByIdAndUpdate(id, rest, { new: true });

      const { password, ...userEntity } = UserEntity.fromJson(user!)

      return { user: userEntity }

    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }


  async delete(getAndDeleteUserDto: GetAndDeleteUserDto) {
    const { id } = getAndDeleteUserDto;

    try {
      //1. verificar si el usuario existe
      const user = await UserModel.findByIdAndUpdate(id, { status: false }, { new: true });
      if (!user) {
        throw CustomError.badRequest('User not exists');
      }

      //2. mapear la respuesta a nuestra entidad
      return "User deleted"

    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }


  //metodo para genrar token--puede ser un caso de uso
  private async generateTokenService(id: string) {
    const token = await JwtAdapter.generateToken({ id })
    if (!token) {
      throw CustomError.internalServer('Error generating token')
    }
    return token
  }

  //este metodo puede ser un caso de uso -- metodo para enviar correo
  private async sendEmailValidationLink(email: string) {
    const token = await JwtAdapter.generateToken({ email })
    if (!token) {
      throw CustomError.internalServer('Error generating token')
    }

    const link = `${envs.WEBSERVICE_URL}/api/auth/validate-email/${token}`;
    const html = `
      <h1>Validate your email</h1>
      <p>Please click the following link to validate your email:</p>
      <a href="${link}">validate your email: ${email}</a>
    `;

    const options = {
      to: email,
      subject: 'Validate your email',
      html,
    }

    const isSent = await this.emailservice.sendEmail(options);
    if (!isSent) {
      throw CustomError.internalServer('Error sending email')
    }

    return true;
  }


  // metodo para validar token
  public async validateEmail(token: string) {
    const payload = await JwtAdapter.validateToken(token);
    if (!payload) {
      throw CustomError.unauthorized('Invalid token');
    }

    const { email } = payload as { email: string }
    if (!email) {
      throw CustomError.internalServer('Email not in token');
    };

    const user = await UserModel.findOne({ email });
    if (!user) {
      throw CustomError.badRequest('User not found');
    };

    user.emailValidated = true;
    await user.save();

    return true;
  }
}
