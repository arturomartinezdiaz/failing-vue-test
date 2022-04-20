# failing-vue-jest

This repository is a demo of how vue-jest fails when testing components which template is not done in HTML syntax.

Seems to be an issue related with `pug/jade` transpilation.

More info at: https://github.com/vuejs/vue-jest/issues/443

## How to reproduce errors

Clone this repository and install dependencies (`npm install`), then run `npm run test` command.

Console output should present the following:

```bash
> node scripts/test.js


SyntaxError: Error parsing JavaScript expression: Unexpected token (1:3)

 FAIL  tests/unit/my-component.js
  MyComponent
    ✕ Name is "my-component" (6 ms)

  ● MyComponent › Name is "my-component"

    expect(received).toBe(expected) // Object.is equality

    Expected: "my-component"
    Received: ""

      5 | {
      6 |     const { name = '' } = MyComponent;
    > 7 |     it('Name is "my-component"', () => expect(name).toBe('my-component'));
        |                                                     ^
      8 | });
      9 |

      at Object.<anonymous> (tests/unit/my-component.js:7:53)

[ERROR] There was an error processing: "/Volumes/Projects/com.github/adhara/vue/failing-vue-jest/src/my-component"
Error:
[vue-jest] Error: Vue template compilation failed

-----------|---------|----------|---------|---------|-------------------
File       | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-----------|---------|----------|---------|---------|-------------------
All files  |       0 |        0 |       0 |       0 |
 script.js |       0 |        0 |       0 |       0 |
-----------|---------|----------|---------|---------|-------------------
Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
Snapshots:   0 total
Time:        2.86 s
Ran all test suites.
```
