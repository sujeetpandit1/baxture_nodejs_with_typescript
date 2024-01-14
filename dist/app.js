"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_routes_1 = __importDefault(require("./routes/user_routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use('/api', user_routes_1.default);
app.use((err, _req, res, next) => {
    if (err instanceof SyntaxError) {
        res.status(400).json({ message: 'Invalid JSON' });
    }
    else {
        next();
    }
});
app.use((err, _, res, __) => {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
});
// app.use('*', (_: Request, res: Response) => {
//   res.status(404).json({ message: "Requested URL not Available" });
// });
app.all("/**", (_req, res) => {
    res.status(404).json({ message: "Requested URL not Available" });
});
// Log that the server is running
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
exports.default = app;
//# sourceMappingURL=app.js.map