import TestSequencer from "@jest/test-sequencer";
import { Test } from "@jest/test-result";
import path from "path";

export default class CustomSequencer extends TestSequencer {
  sort(tests: Array<Test>): Array<Test> {
    const orderNames = ["ItemResolvers"];
    const orderPath = orderNames.map(each =>
      path.resolve(__dirname, "..", each + ".test.ts")
    );
    // console.log(orderPath);
    return tests.sort((testA, testB) => {
      const indexA = orderPath.indexOf(testA.path);
      const indexB = orderPath.indexOf(testB.path);

      if (indexA === indexB) return 0;

      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      return indexA < indexB ? -1 : 1;
    });
  }
}
