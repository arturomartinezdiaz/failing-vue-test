# failing-vue-jest

This repository is a demo of how vue-jest fails when testing components which template is not done in HTML syntax.

Seems to be an issue related with `pug/jade` transpilation.

More info at: https://github.com/vuejs/vue-jest/issues/443

## How to reproduce errors

Clone this repository and install dependencies (`npm install`), then run `npm run test` command.

Within `tests/unit` folder there are two (2) files.

If you add `.js` extension to `working-component` file the console output should be:

```bash
$ npm test

> failing-vuest-jest@0.1.0 test
> node scripts/test.js

 PASS  tests/unit/working-component.js
  WorkingComponent
    ✓ Name is "working-component" (2 ms)

-------------------|---------|----------|---------|---------|-------------------
File               | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-------------------|---------|----------|---------|---------|-------------------
All files          |       0 |        0 |       0 |       0 |
 failing-component |       0 |        0 |       0 |       0 |
  script.js        |       0 |        0 |       0 |       0 |
 working-component |       0 |        0 |       0 |       0 |
  script.js        |       0 |        0 |       0 |       0 |
-------------------|---------|----------|---------|---------|-------------------
Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        3.612 s
Ran all test suites.
```

But if you add the extension to `failing-component`, then the output is:

```bash
$ npm test

> failing-vuest-jest@0.1.0 test
> node scripts/test.js


SyntaxError: Error parsing JavaScript expression: Unexpected token (1:3)

 FAIL  tests/unit/failing-component.js
  FailingComponent
    ✕ Name is "failing-component" (5 ms)

  ● FailingComponent › Name is "failing-component"

    expect(received).toBe(expected) // Object.is equality

    Expected: "failing-component"
    Received: ""

      5 | {
      6 |     const { name = '' } = FailingComponent;
    > 7 |     it('Name is "failing-component"', () => expect(name).toBe('failing-component'));
        |                                                          ^
      8 | });
      9 |

      at Object.<anonymous> (tests/unit/failing-component.js:7:58)

[ERROR] There was an error processing: "/Volumes/Projects/com.github/adhara/vue/failing-vue-jest/src/failing-component"
Error:
[vue-jest] Error: Vue template compilation failed

-------------------|---------|----------|---------|---------|-------------------
File               | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-------------------|---------|----------|---------|---------|-------------------
All files          |       0 |        0 |       0 |       0 |
 failing-component |       0 |        0 |       0 |       0 |
  script.js        |       0 |        0 |       0 |       0 |
 working-component |       0 |        0 |       0 |       0 |
  script.js        |       0 |        0 |       0 |       0 |
-------------------|---------|----------|---------|---------|-------------------
Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
Snapshots:   0 total
Time:        3.782 s
Ran all test suites.
```
