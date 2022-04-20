#!/usr/bin/env node

const argv      = process.argv.slice(2);

argv.push(
    '--coverage',
    '--no-cache',
    '--config',
    JSON.stringify(require('../jest.config.js'))
);

require('jest').run(argv);
