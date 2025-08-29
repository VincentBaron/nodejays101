import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';
import { SetsService } from './sets.service';
import { SetEntity } from '../entities/set.entity';

interface AuthenticatedRequest extends Request {
  user?: {
    authorization?: string;
    spotifyAuthorization?: string;
    userId?: string;
  };
}

@Controller('api/sets')
export class SetsController {
  constructor(private readonly setsService: SetsService) {}

  @Get()
  async getSets(@Req() req: AuthenticatedRequest): Promise<SetEntity[]> {
    // For now, allow requests without authentication for testing
    // TODO: Implement proper authentication
    console.log('Request user:', req.user);
    return this.setsService.getSets(req.user || null);
  }
}
