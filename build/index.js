"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var controller_1 = require("./controller/");
var app = (0, express_1.default)();
var port = process.env.PORT || 3000;
app.get('/health', function (req, res) {
    res.json({ ok: true });
});
app.post('/user', function (req, res) { return controller_1.createUser; });
app.put('/user', function (req, res) { return controller_1.editUser; });
app.listen(port, function () {
    console.log('listening on port ' + port);
});
