"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const set_entity_1 = require("../entities/set.entity");
const user_entity_1 = require("../entities/user.entity");
const like_entity_1 = require("../entities/like.entity");
const track_entity_1 = require("../entities/track.entity");
let SetsService = class SetsService {
    constructor(setRepository, userRepository, likeRepository, trackRepository) {
        this.setRepository = setRepository;
        this.userRepository = userRepository;
        this.likeRepository = likeRepository;
        this.trackRepository = trackRepository;
    }
    async getSets(user) {
        try {
            console.log('Fetching sets for user:', user);
            const sets = await this.setRepository.find({
                relations: ['tracks', 'user'],
                order: {
                    createdAt: 'DESC'
                }
            });
            console.log(`Found ${sets.length} sets`);
            return sets;
        }
        catch (error) {
            console.error('Error fetching sets:', error);
            throw error;
        }
    }
};
exports.SetsService = SetsService;
exports.SetsService = SetsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(set_entity_1.SetEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(like_entity_1.LikeEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(track_entity_1.TrackEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], SetsService);
//# sourceMappingURL=sets.service.js.map