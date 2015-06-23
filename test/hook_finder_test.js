var clone      = require('clone');
var jsdom      = require('jsdom');
var fs         = require('fs');
var expect     = require('chai').expect;
var HookFinder = require('../HookFinder');
require('mocha-sinon');

describe('HookFinder.js', function () {
    var window, document, $, finder;

    beforeEach(function(done) {
        this.sinon.stub(console, 'error');

        jsdom.env(
            fs.readFileSync(__dirname + '/fixtures/index.html', 'utf-8'),
            function (err, windowObj) {
                window = windowObj;
                document = windowObj.document;
                $ = require('jquery')(window);
                finder = new HookFinder($('#module'), 'module__');

                done();
            }
        );
    });

    describe('#find - initiated with the separator parameter involved', function () {
        it('should find the element just fine when initialized with the separator parameter', function() {
            var finder = new HookFinder($('#module'), 'module', '__');
            var $element = finder.find('element1');
            expect($element).to.be.an.instanceof($);
            expect($element.length).to.equal(1);
        });
    });

    describe('#find - searching for the hook "element1"', function () {
        it('should be a jQuery object with one element', function() {
            var $element = finder.find('element1');
            expect($element).to.be.an.instanceof($);
            expect($element.length).to.equal(1);
        });
    });

    describe('#find - searching for hooks named "element2"', function () {
        it('should be a jQuery object with two element', function() {
            var $elements = finder.find('element2');
            expect($elements).to.be.an.instanceof($);
            expect($elements.length).to.equal(2);
        });
    });

    describe('#find - searching for a non-existent hook', function () {
        it('should return an empty jQuery object', function() {
            var $element = finder.find('non-existent-hook');
            expect($element.length).to.equal(0);
        });
    });

    describe('#find - number constraint tests', function () {
        it('should return 1 jQuery element if the number constraint is 1', function() {
            var $element = finder.find('element1', 1);
            expect($element).to.be.an.instanceof($);
            expect($element.length).to.equal(1);
        });

        it('should log a console error if fewer hooks were found than expected', function() {
            var $element1 = finder.find('element1', 2);
            expect(console.error.calledOnce).to.be.true;
            expect(console.error.calledWith('Expected to find exactly 2 hooks with the class "module__element1" but found 1. Returning all for now.')).to.be.true;
        });

        it('should log a console error if more hooks were found than expected', function() {
            var $element = finder.find('element2', 1);
            expect(console.error.calledOnce).to.be.true;
            expect(console.error.calledWith('Searched for the hook "module__element2" expecting 1 hook, but found 2 instead. Returning the first 1 for now, but this should be fixed.')).to.be.true;
            expect($element).to.be.an.instanceof($);
            expect($element.length).to.equal(1);
        });
    });

    describe('#getHookClass', function () {
        it('should return the given hook name prefixed with the module prefix', function() {
            expect(finder.getHookClass('element')).to.equal('module__element');
        });
    });
});
