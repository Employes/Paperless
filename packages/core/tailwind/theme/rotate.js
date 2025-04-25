"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rotateNumbers = {};
for (var i = 1; i < 360; i++) {
    rotateNumbers["".concat(i)] = "".concat(i, "deg");
    rotateNumbers["-".concat(i)] = "-".concat(i, "deg");
}
exports.default = rotateNumbers;
