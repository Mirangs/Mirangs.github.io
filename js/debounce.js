(function() {
    var DEBOUNCE_TIME_INTERVAL = 500;

    window.debounce = function(fun) {
        var lastTimeout = null;

        if (lastTimeout) {
            clearTimeout(lastTimeout);
        }
        lastTimeout = setInterval(function() {
            fun.apply(arguments);
        }, DEBOUNCE_TIME_INTERVAL);
    }
})();