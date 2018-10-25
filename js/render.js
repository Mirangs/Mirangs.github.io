(function() {
    var photosContainer = document.querySelector('.pictures');
    var pictureTemplate = document.querySelector('#picture-template')
    .content
    .querySelector('.picture');

    var createPicture = function(template, photo) {
        var pictureElement = template.cloneNode(true);
        pictureElement.querySelector('img').src = photo.url;
        pictureElement.querySelector('.picture-likes').textContent = photo.likes;
        pictureElement.querySelector('.picture-comments').textContent = photo.comments.length;
        return pictureElement;
    };

    window.fillContainer = function(photosList) {
        var fragment = document.createDocumentFragment();
        photosContainer.innerHTML = '';
    
        for (var i = 0; i < photosList.length; i++) {
            fragment.appendChild(createPicture(pictureTemplate, photosList[i]));
        }
        photosContainer.appendChild(fragment);
    }

    var onSuccess = function(photos) {
        window.fillContainer(photos);
    }

    var onError = function(msg) {
        console.error(msg);
    }

    window.download(onSuccess, onError);
})();