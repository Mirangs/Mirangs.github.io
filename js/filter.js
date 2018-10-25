(function() {
    var filters = document.querySelector('.filters');
    var filterPopular = filters.querySelector('label[for="filter-popular"]');
    var filterNew = filters.querySelector('label[for="filter-new"]');
    var filterDiscussed = filters.querySelector('label[for="filter-discussed"]');
    var filterRandom = filters.querySelector('label[for="filter-random"]');

    var photosList = [];
    
    filters.addEventListener('click', function(evt) {
        if (evt.target === filterPopular) {

            window.fillContainer(photosList);

        } else if (evt.target === filterNew) {

            var newPhotos = photosList.slice();
            newPhotos.sort(function() {
                return Math.random() - 0.5;
            });
            for (var i = newPhotos.length - 1; i >= 10; i--) {
                newPhotos.pop();
            }
            window.fillContainer(newPhotos);

        } else if (evt.target === filterDiscussed) {

            var discussedPhotos = photosList.slice();
            discussedPhotos.sort(function(left, right) {
                return right.comments.length - left.comments.length;
            });
            window.fillContainer(discussedPhotos);

        } else if (evt.target === filterRandom) {

            var randomPhotos = photosList.slice();
            randomPhotos.sort(function() {
                return Math.random() - 0.5;
            });
            window.fillContainer(randomPhotos);

        }
    });

        var onSuccess = function(photos) {
            photosList = photos;
        }
    
        var onError = function(msg) {
            console.error(msg);
        }

        window.download(onSuccess, onError);
})();