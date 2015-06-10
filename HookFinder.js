'use strict';

function HookFinder($object, baseClass) {
    this.$object = $object;
    this.baseClass = baseClass;
}

HookFinder.prototype.find = function(hookName, expectedHookNum) {
    hookName = this.baseClass + hookName;
    var $hooks = this.$object.find('.' + hookName);
    if (expectedHookNum !== undefined) {
        if ($hooks.length > expectedHookNum) {
            console.error('Searched for the hook "' + hookName + '" expecting ' + expectedHookNum + ' hook' + (expectedHookNum > 1 ? 's': '') + ', but found ' + $hooks.length + ' instead. Returning the first ' + expectedHookNum + ' for now, but this should be fixed.');
            $hooks = $hooks.slice(0, expectedHookNum);
        } else if ($hooks.length < expectedHookNum) {
            console.error('Expected to find exactly ' + expectedHookNum + ' hook' + (expectedHookNum > 1 ? 's': '') + ' with the class "' + hookName + '" but found ' + $hooks.length + '.' + ($hooks.length !== 0 ? ' Returning all for now.' : ''));
        }
    }

    return $hooks;
};

module.exports = HookFinder;
