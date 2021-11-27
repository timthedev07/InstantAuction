"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var test_sequencer_1 = require("@jest/test-sequencer");
var CustomSequencer = /** @class */ (function (_super) {
    __extends(CustomSequencer, _super);
    function CustomSequencer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CustomSequencer.prototype.sort = function (tests) {
        var orderPath = ["ItemResolvers.test.ts"];
        return tests.sort(function (testA, testB) {
            console.log(testA);
            var indexA = orderPath.indexOf(testA.path);
            var indexB = orderPath.indexOf(testB.path);
            if (indexA === indexB)
                return 0;
            if (indexA === -1)
                return 1;
            if (indexB === -1)
                return -1;
            return indexA < indexB ? -1 : 1;
        });
    };
    return CustomSequencer;
}(test_sequencer_1["default"]));
exports["default"] = CustomSequencer;
