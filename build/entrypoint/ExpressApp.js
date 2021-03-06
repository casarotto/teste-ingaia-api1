"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressApp = void 0;
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var ExpressApp = /** @class */ (function () {
    function ExpressApp(swaggerRouter, metricsRouter) {
        this.swaggerRouter = swaggerRouter;
        this.metricsRouter = metricsRouter;
        this.app = express_1.default();
    }
    ExpressApp.prototype.configApp = function () {
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        //Routers
        this.app.use(this.swaggerRouter.getRouter());
        this.app.use(this.metricsRouter.getRouter());
    };
    ExpressApp.prototype.boot = function () {
        if (!this.app) {
            this.app = express_1.default();
        }
        this.configApp();
        this.app.listen((process.env.PORT || 3001), function () {
            console.log("Server up and running on port " + (process.env.PORT || 3001) + "...");
        });
        return this.app;
    };
    return ExpressApp;
}());
exports.ExpressApp = ExpressApp;
