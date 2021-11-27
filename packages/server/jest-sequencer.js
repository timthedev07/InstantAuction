"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_sequencer_1 = __importDefault(require("@jest/test-sequencer"));
const path_1 = __importDefault(require("path"));
class CustomSequencer extends test_sequencer_1.default {
    sort(tests) {
        const orderNames = [
            "index",
            "ItemResolvers",
            "AuctionResolvers",
            "BidResolvers",
            "AuctionResolvers2",
        ];
        const orderPath = orderNames.map(each => path_1.default.resolve(__dirname, "src/tests", each + ".test.ts"));
        return tests.sort((testA, testB) => {
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
