"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const sets_service_1 = require("./sets.service");
const sets_resolver_1 = require("./sets.resolver");
const sets_controller_1 = require("./sets.controller");
const set_entity_1 = require("../entities/set.entity");
const user_entity_1 = require("../entities/user.entity");
const like_entity_1 = require("../entities/like.entity");
const track_entity_1 = require("../entities/track.entity");
let SetsModule = class SetsModule {
};
exports.SetsModule = SetsModule;
exports.SetsModule = SetsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                set_entity_1.SetEntity,
                user_entity_1.UserEntity,
                like_entity_1.LikeEntity,
                track_entity_1.TrackEntity,
            ]),
        ],
        controllers: [sets_controller_1.SetsController],
        providers: [sets_service_1.SetsService, sets_resolver_1.SetsResolver],
    })
], SetsModule);
//# sourceMappingURL=sets.module.js.map