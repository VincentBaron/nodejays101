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
export declare class SetsController {
    private readonly setsService;
    constructor(setsService: SetsService);
    getSets(req: AuthenticatedRequest): Promise<SetEntity[]>;
}
export {};
