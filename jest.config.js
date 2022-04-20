const cwd = process.cwd();
const path = require('path');
const root = path.resolve(__dirname);

module.exports = {
    testRegex                  : 'tests/unit/[^_].+js$',
    collectCoverageFrom        : [
        'src/**/*.{mjs,js}',
        '!**/tests/**',
        '!**/node_modules/**',
        '!**/demo/**',
        '!**/mock.{mjs,js}'
    ],
    coverageDirectory          : '<rootDir>/coverage/unit',
    coveragePathIgnorePatterns : [
        '/node_modules/',
        '/src/index.m?js'
    ],
    coverageThreshold          : {
        global : {
            branches   : 90,
            functions  : 90,
            lines      : 90,
            statements : -10
        }
    },
    moduleFileExtensions       : [ 'js', 'json', 'mjs', 'vue' ],
    moduleNameMapper           : {
        '^%/(.*)$' : `${root}/$1`,
        '^@/(.*)$' : '<rootDir>/src/$1',
        '^#/(.*)$' : '<rootDir>/tests/$1'
    },
    rootDir                    : cwd,
    roots                      : [ '<rootDir>/src', '<rootDir>/tests' ],
    snapshotSerializers        : [ 'jest-serializer-vue' ],
    transform                  : {
        '.js'  : 'babel-jest',
        '.vue' : path.resolve(__dirname, 'tools', 'vue-parser.js')
    },
    testEnvironment            : 'jsdom'
};
