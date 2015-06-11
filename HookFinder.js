'use strict';

function HookFinder($object, baseClass) {
    this.$object = $object;
    this.baseClass = baseClass;
}

HookFinder.prototype.find = function(hookName, expectedHookNum) {
    var hookClass = this.getHookClass(hookName);
    var $hooks = this.$object.find('.' + hookName);
    if (expectedHookNum !== undefined) {
        if ($hooks.length > expectedHookNum) {
            console.error('Searched for the hook "' + hookClass + '" expecting ' + expectedHookNum + ' hook' + (expectedHookNum > 1 ? 's': '') + ', but found ' + $hooks.length + ' instead. Returning the first ' + expectedHookNum + ' for now, but this should be fixed.');
            $hooks = $hooks.slice(0, expectedHookNum);
        } else if ($hooks.length < expectedHookNum) {
            console.error('Expected to find exactly ' + expectedHookNum + ' hook' + (expectedHookNum > 1 ? 's': '') + ' with the class "' + hookClass + '" but found ' + $hooks.length + '.' + ($hooks.length !== 0 ? ' Returning all for now.' : ''));
        }
    }

    return $hooks;
};

HookFinder.prototype.getHookClass = function(hookName) {
    return this.baseClass + hookName;
};

module.exports = HookFinder;
