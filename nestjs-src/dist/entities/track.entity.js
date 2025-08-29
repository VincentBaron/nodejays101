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
exports.TrackEntity = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const set_entity_1 = require("./set.entity");
const like_entity_1 = require("./like.entity");
let TrackEntity = class TrackEntity {
};
exports.TrackEntity = TrackEntity;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], TrackEntity.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ name: 'name' }),
    __metadata("design:type", String)
], TrackEntity.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ name: 'artist' }),
    __metadata("design:type", String)
], TrackEntity.prototype, "artist", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ name: 'uri' }),
    __metadata("design:type", String)
], TrackEntity.prototype, "uri", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ name: 'img_url', nullable: true }),
    __metadata("design:type", String)
], TrackEntity.prototype, "imgURL", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => set_entity_1.SetEntity, (set) => set.tracks),
    __metadata("design:type", Array)
], TrackEntity.prototype, "sets", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => like_entity_1.LikeEntity, (like) => like.track),
    __metadata("design:type", Array)
], TrackEntity.prototype, "likes", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Boolean)
], TrackEntity.prototype, "liked", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { defaultValue: 0 }),
    __metadata("design:type", Number)
], TrackEntity.prototype, "likesCount", void 0);
exports.TrackEntity = TrackEntity = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)('tracks')
], TrackEntity);
//# sourceMappingURL=track.entity.js.map