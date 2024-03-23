"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIsString = void 0;
const checkIsString = (constant) => {
    if (typeof constant === 'string') {
        return constant;
    }
    else {
        throw new Error('This type of constant is undefined. You have to set the string value in this constant.');
    }
};
exports.checkIsString = checkIsString;
