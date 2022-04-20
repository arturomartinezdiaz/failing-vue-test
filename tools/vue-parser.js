const chalk = require('chalk');
const pug = require('pug');
const vueJest = require('vue-jest');
const path = require('path');
const babelCore = require('@babel/core');
const crypto = require('crypto');
const fs = require('fs');

const babelrc = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', '.babelrc')).toString());

const loadFile = (dir, name) =>
{
    const _filename = path.join(dir, name);

    return fs.existsSync(_filename) ? fs.readFileSync(_filename, 'utf8') : null;
};

const compileJs = (dir, name, options, addIstanbul = true) =>
{
    const _filename = path.join(dir, name);
    if (addIstanbul)
    {
        const _plugins = options.plugins;
        if (Array.isArray(_plugins))
        {
            if (!_plugins.includes('istanbul'))
            {
                options.plugins = [ 'istanbul', ..._plugins ];
            }
        }
        else
        {
            options.plugins = [ 'istanbul' ];
        }
    }

    return fs.existsSync(_filename)
        ? babelCore.transformFileSync(_filename, { ...options })
        : null;
};

const loadStyles = (dir = '') =>
{
    const sassFile = loadFile(dir, 'styles.sass') || loadFile(dir, 'styles.scss');
    const cssFile = loadFile(dir, 'styles.css');
    const syntax = sassFile ? 'sass' : 'css';

    return { code : sassFile || cssFile, syntax };
};

const compileScript = (dir = '') =>
{
    const _babel = Object.assign({}, babelrc);
    const { code } = compileJs(dir, 'script.js', _babel);

    return code;
};

const compileTemplate = (dir = '', filename = '') =>
{
    const htmlFile = loadFile(dir, 'template.html');
    const pugFile = loadFile(dir, 'template.pug');

    return pugFile
        ? pug.render(pugFile, { filename })
        : htmlFile;
};

const compileVueSFC = (dir = '', filename = '', config) =>
{
    const HTML = compileTemplate(dir, filename);
    const SCRIPT = compileScript(dir);
    const { code, syntax } = loadStyles(dir);

    const sfc = `<template>${HTML}</template>
<script>${SCRIPT}</script>
<style lang="${syntax}">${code}</style>`;

    return vueJest.process(sfc, filename, config);
};

module.exports = {
    canInstrument : true,
    getCacheKey(fileContent, filename, config, cacheOptions)
    {
        return crypto
            .createHash('md5')
            .update(__filename)
            .update('\0', 'utf8')
            .update(fileContent)
            .update('\0', 'utf8')
            .update(path.relative(cacheOptions ? cacheOptions.rootDir : '', filename))
            .update('\0', 'utf8')
            .update(JSON.stringify(config))
            .update('\0', 'utf8')
            .update(JSON.stringify(babelrc))
            .update('\0', 'utf8')
            .update('instrument')
            .digest('hex');
    },
    /**
     * @override
     */
    process(src, filename, config/*, transformOptions*/)
    {
        const dir = path.dirname(filename);
        let result = { code : '', map : '' };
        try
        {
            result = Object.assign({}, result, compileVueSFC(dir, filename, config));
        }
        catch (e)
        {
            console.log(`[${chalk.red.bold('ERROR')}] There was an error processing: "${chalk.bold(dir)}"\n${e}`);
        }

        return result;
    }
};
