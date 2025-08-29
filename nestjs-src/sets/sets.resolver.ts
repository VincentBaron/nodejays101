import { Resolver, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { SetEntity } from '../entities/set.entity';
import { SetsService } from './sets.service';
import { CurrentUser } from '../auth/current-user.decorator';

@Resolver(() => SetEntity)
export class SetsResolver {
  constructor(private readonly setsService: SetsService) {}

  @Query(() => [SetEntity])
  async sets(@CurrentUser() user: any): Promise<SetEntity[]> {
    if (!user) {
      throw new Error('Unauthorized');
    }
    return this.setsService.getSets(user);
  }
}
