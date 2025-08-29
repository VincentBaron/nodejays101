import { SetEntity } from '../entities/set.entity';
import { SetsService } from './sets.service';
export declare class SetsResolver {
    private readonly setsService;
    constructor(setsService: SetsService);
    sets(user: any): Promise<SetEntity[]>;
}
