(function() {
    window.download = function(onLoad, onError) {
        var xhr = new XMLHttpRequest();
        var url = 'https://js.dump.academy/kekstagram/data';

        xhr.responseType = 'json';
        xhr.timeout = 1000 * 10; //10s

        xhr.addEventListener('load', function() {
            onLoad(xhr.response);
        });

        xhr.addEventListener('error', function() {
            onError('Произошла ошибка с кодом' + xhr.status + ', ' + xhr.statusText);
        });

        xhr.addEventListener('timeout', function() {
            onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс.');
        });

        xhr.open('GET', url);
        xhr.send();
    };

    window.upload = function(data, onLoad, onError) {
        var xhr = new XMLHttpRequest();
        var url = 'https://js.dump.academy/kekstagram';

        xhr.responseType = 'json';
        xhr.timeout = 1000 * 10; //10s

        xhr.addEventListener('load', function() {
            onLoad(xhr.response);
        });

        xhr.addEventListener('error', function() {
            onError('Произошла ошибка с кодом ' + xhr.status + ', ' + xhr.statusText);
        });

        xhr.addEventListener('timeout', function() {
            onError('Запрос не успел выполнться за ' + xhr.timeout + 'мс.');
        });

        xhr.open('POST', url);
        xhr.send(data);
    };
})();