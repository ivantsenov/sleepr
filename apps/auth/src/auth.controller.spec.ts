import { Test } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  beforeEach(async () => {
    await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();
  });
});
