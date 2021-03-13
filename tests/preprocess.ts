import ts from "typescript";
import { preProcess } from "../src/transform/preprocess.js";
import { assertProcessedTestcase, forEachFixture, Harness } from "./utils.js";

export default (t: Harness) => {
  forEachFixture("preprocess", (name, dir) => {
    t.test(`preprocess/${name}`, (bless) => {
      return assertProcessedTestcase(
        (fileName, code) => {
          const sourceFile = ts.createSourceFile(fileName, code, ts.ScriptTarget.Latest, true);
          return preProcess({ sourceFile }).code.toString();
        },
        dir,
        bless,
      );
    });
  });
};