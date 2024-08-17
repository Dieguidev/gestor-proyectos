import { Request, Response } from "express"
import { ConfirmAccountDto, CustomError, GetAndDeleteUserDto, LoginUserDto, RegisterUserDto, RequestConfirmationCodeDto, UpdateUserDto } from "../../domain"

import { UserModel } from "../../data/mongodb";
import { AuthService } from "../services/auth.service";




export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) { }


  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message })
    }

    console.log(`${error}`);

    return res.status(500).json({ error: 'Internal Server Error' })
  }


  registerUser = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body)
    if (error) return res.status(400).json({ error })

    this.authService.registerUser(registerUserDto!)
      .then((user) => res.json(user))
      .catch((error) => this.handleError(error, res));
  }


  loginUser = (req: Request, res: Response) => {
    const [error, loginUserDto] = LoginUserDto.create(req.body)
    if (error) return res.status(400).json({ error })

    this.authService.loginUser(loginUserDto!)
      .then((user) => res.json(user))
      .catch((error) => this.handleError(error, res));
  }


  updateUser = (req: Request, res: Response) => {
    const [error, updateUserDto] = UpdateUserDto.create(req.body)
    if (error) return res.status(400).json({ error })

    console.log(updateUserDto);

    this.authService.update(updateUserDto!)
      .then((user) => res.json(user))
      .catch((error) => this.handleError(error, res));
  }


  deleteUser = (req: Request, res: Response) => {
    const { id } = req.params
    const [error, getAndDeleteUserDto] = GetAndDeleteUserDto.create({ id })
    if (error) return res.status(400).json({ error })

    this.authService.delete(getAndDeleteUserDto!)
      .then((user) => res.json(user))
      .catch((error) => this.handleError(error, res));
  }

  confirmAccount = (req: Request, res: Response) => {
    const [error, confirmAccountDto] = ConfirmAccountDto.create(req.body)
    if (error) return res.status(400).json({ error })

    this.authService.confirmSixDigitToken(confirmAccountDto!)
      .then((user) => res.json(user))
      .catch((error) => this.handleError(error, res));
  }

  requestConfirmationCode = (req: Request, res: Response) => {
    const [error, requestConfirmationCodeDto] = RequestConfirmationCodeDto.create(req.body)
    if (error) return res.status(400).json({ error })

    this.authService.requestConfirmationCode(requestConfirmationCodeDto!)
      .then((user) => res.json(user))
      .catch((error) => this.handleError(error, res));
  }

  // getUsers = (req: Request, res: Response) => {
  //   UserModel.find()
  //     .then(users => res.json({
  //       user: req.body.user
  //     }))
  //     .catch(error => this.handleError(error, res))
  // }
}
