"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const typeorm_1 = require("typeorm");
const passport_1 = __importDefault(require("passport"));
const passport_2 = __importDefault(require("./middlewares/passport"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const private_routes_1 = __importDefault(require("./routes/private.routes"));
const public_routes_1 = __importDefault(require("./routes/public.routes"));
//initialization
const app = express_1.default();
typeorm_1.createConnection();
//settings
app.set('port', process.env.PORT || 3001);
//middlewares
app.use(morgan_1.default("dev"));
app.use(cors_1.default());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use(passport_1.default.initialize());
passport_1.default.use(passport_2.default);
//routes
app.get("/", (req, res) => {
    res.send(`The API is at http://localhost:${app.get('port')}`);
});
app.use("/auth", auth_routes_1.default);
app.use("/user", passport_1.default.authenticate('jwt', { session: false }), private_routes_1.default);
app.use("/publicuser", public_routes_1.default);
exports.default = app;
