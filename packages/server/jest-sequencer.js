"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_sequencer_1 = __importDefault(require("@jest/test-sequencer"));
class CustomSequencer extends test_sequencer_1.default {
    sort(tests) {
        const orderPath = ["ItemResolvers.test.ts"];
        return tests.sort((testA, testB) => {
            console.log(testA);
            const indexA = orderPath.indexOf(testA.path);
            const indexB = orderPath.indexOf(testB.path);
            if (indexA === indexB)
                return 0;
            if (indexA === -1)
                return 1;
            if (indexB === -1)
                return -1;
            return indexA < indexB ? -1 : 1;
        });
    }
}
exports.default = CustomSequencer;
//# sourceMappingURL=jest-sequencer.js.map