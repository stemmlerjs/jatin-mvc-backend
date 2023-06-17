
import { Request, Response } from 'express';
import { IUser, User } from '../database/models/user';
import { UserServiceAPI } from '../../../modules/users/application/usersServiceAPI';

export class UserController {
  constructor(private usersService: UserServiceAPI) {}

  async create(req: Request, res: Response) {
    try {
      let response = await this.usersService.createUser(req.body);

      if (response.success) {
        return res.status(201).json({ ok: true, data: response.data });
      }

      switch (response.error.name) {
        case 'AlreadyCreated':
          return res
            .status(409)
            .json({ ok: false, error: 'Collision. Already created.' });
        case 'ValidationError':
          return res
            .status(400)
            .json({ ok: false, error: 'You did something wrong, dude.' });
        case 'Exception':
          return res
            .status(500)
            .json({ ok: false, error: 'We messed up, bruh.' });
      }
    } catch (err) {
      return res.status(500).json({ ok: false, error: 'We messed up, bruh.' });
    }
  }

  async edit(req: Request, res: Response) {
    const { username, password, age, id } = req.body;

    try {
      const user: IUser | null = await User.findOne({ _id: id });

      if (!user) {
        throw new Error('User not exists');
      }
    } catch (error: any) {
      return res.status(400).json({ ok: false, error: error.message });
    }

    try {
      const user: IUser | null = await User.findOneAndUpdate(
        { _id: id },
        { username, password, age },
        { new: true },
      );
      return res.status(201).json({ ok: true, data: user });
    } catch (error) {
      return res.status(400).json({ ok: false, error: error });
    }
  }
}
