import { Test } from '@nestjs/testing';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';

describe('PaymentsController', () => {
  beforeEach(async () => {
    Test.createTestingModule({
      controllers: [PaymentsController],
      providers: [PaymentsService],
    }).compile();
  });
});
