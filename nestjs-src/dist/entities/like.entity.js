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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeEntity = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const user_entity_1 = require("./user.entity");
const track_entity_1 = require("./track.entity");
let LikeEntity = class LikeEntity {
};
exports.LikeEntity = LikeEntity;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], LikeEntity.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], LikeEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id' }),
    __metadata("design:type", Number)
], LikeEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'track_id' }),
    __metadata("design:type", Number)
], LikeEntity.prototype, "trackId", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_entity_1.UserEntity),
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (user) => user.likes),
    __metadata("design:type", user_entity_1.UserEntity)
], LikeEntity.prototype, "user", void 0);
__decorate([
    (0, graphql_1.Field)(() => track_entity_1.TrackEntity),
    (0, typeorm_1.ManyToOne)(() => track_entity_1.TrackEntity, (track) => track.likes),
    __metadata("design:type", track_entity_1.TrackEntity)
], LikeEntity.prototype, "track", void 0);
exports.LikeEntity = LikeEntity = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)('likes')
], LikeEntity);
//# sourceMappingURL=like.entity.js.map