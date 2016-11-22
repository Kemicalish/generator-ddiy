'use strict';
const path = require('path');
const _ = require('lodash');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const scopeDir = '../generators/components';
const conf = require('../generators/conf.js');
const testCompName = 'my-comp';

const jsFilePath = `${conf.WORKSPACE_DIRNAME}/${conf.APP_DIRNAME}/${conf.SCRIPTS_DIRNAME}/components/${testCompName}.js`;
const sccsFilePath = `${conf.WORKSPACE_DIRNAME}/${conf.APP_DIRNAME}/${conf.STYLES_DIRNAME}/components/_${testCompName}.scss`;
const hbsFilePath = `${conf.WORKSPACE_DIRNAME}/${conf.APP_DIRNAME}/${conf.TEMPLATES_DIRNAME}/components/${testCompName}.hbs`;

let _essentialVars = ['init', 'renderIn'];

describe('components', () => {
    before(function (done) {
        helpers.run(path.join(__dirname, scopeDir))
            .withArguments([testCompName])
            .withGenerators([
                [helpers.createDummyGenerator(), 'mocha:components']
            ])
            .on('end', done);
    });

    it('the generator can be required without throwing', () => {
        // not testing the actual run of generators yet
        require(scopeDir);
    });

    it('creates expected components files', () => {
        assert.file([
            jsFilePath,
            sccsFilePath,
            hbsFilePath,
        ]);
    });

    it(`${jsFilePath} should register its partial`, () => {
        assert.fileContent(jsFilePath, `Handlebars.registerPartial(\'partial-${testCompName}\'`);
    });

    it(`${jsFilePath} should declare essential vars `, () => {
        _.forEach(_essentialVars, v => assert.fileContent(jsFilePath, `var ${v}`));
    });

    it(`${jsFilePath} should export essential vars `, () => {
        _.forEach(_essentialVars, v => assert.fileContent(jsFilePath, `${v}:${v}`));
    });

    it(`${hbsFilePath} should have its tag adding its own className `, () => {
        assert.fileContent(hbsFilePath, `class="component-${testCompName}`);
    });

    it(`${sccsFilePath} should have its class defined `, () => {
        assert.fileContent(sccsFilePath, `.component-${testCompName}`);
    });


});