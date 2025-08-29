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
exports.SetsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const set_entity_1 = require("../entities/set.entity");
const sets_service_1 = require("./sets.service");
const current_user_decorator_1 = require("../auth/current-user.decorator");
let SetsResolver = class SetsResolver {
    constructor(setsService) {
        this.setsService = setsService;
    }
    async sets(user) {
        if (!user) {
            throw new Error('Unauthorized');
        }
        return this.setsService.getSets(user);
    }
};
exports.SetsResolver = SetsResolver;
__decorate([
    (0, graphql_1.Query)(() => [set_entity_1.SetEntity]),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SetsResolver.prototype, "sets", null);
exports.SetsResolver = SetsResolver = __decorate([
    (0, graphql_1.Resolver)(() => set_entity_1.SetEntity),
    __metadata("design:paramtypes", [sets_service_1.SetsService])
], SetsResolver);
//# sourceMappingURL=sets.resolver.js.map