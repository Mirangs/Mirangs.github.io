'use strict';

(function() {
    var generateRandom = function(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    };

    window.addEventListener('load', function() {
        window.download(fillContainer, function(msg) {
            console.error(msg);
        });
    });

    var pictureTemplate = document.querySelector('#picture-template')
    .content
    .querySelector('.picture');
    
    var createPicture = function(template, photo) {
        var pictureElement = template.cloneNode(true);
        pictureElement.querySelector('img').src = photo.url;
        pictureElement.querySelector('.picture-likes').textContent = photo.likes;
        pictureElement.querySelector('.picture-comments').textContent = photo.comments;
        return pictureElement;
    };
    
    var fillContainer = function(photosList) {
        var fragment = document.createDocumentFragment();
    
        for (var i = 0; i < photosList.length; i++) {
            fragment.appendChild(createPicture(pictureTemplate, photosList[i]));
        }
        photosContainer.appendChild(fragment);
    }
    
    var uploadFile = document.querySelector('#upload-file');
    var uploadOverlay = document.querySelector('.upload-overlay');
    var uploadForm = document.querySelector('.upload-form');
    var uploadFormClose = uploadOverlay.querySelector('#upload-cancel');
    
    uploadFile.addEventListener('change', function() {
        uploadOverlay.classList.remove('hidden');
    
        uploadFormClose.addEventListener('click', function() {
            uploadOverlay.classList.add('hidden');
            uploadFile.value = null;
        });
    });
    
    var filters = {
        none: {
            class: 'picture-filter--none'
        },
        chrome: {
            class: 'picture-filter--chrome',
            css: 'grayscale',
            min: 0,
            max: 1
        },
        sepia: {
            class: 'picture-filter--sepia',
            css: 'sepia',
            max: 1,
            min: 0
        },
        marvin: {
            class: 'picture-filter--marvin',
            css: 'invert',
            max: 100,
            min: 0,
            fraction: '%'
        },
        phobos: {
            class: 'picture-filter--phobos',
            css: 'blur',
            max: 3,
            min: 0,
            fraction: 'px'
        },
        heat: {
            class: 'picture-filter--heat',
            css: 'brightness',
            max: 3,
            min: 1
        }
    };
    
    var getFilterValue = function(filter, pinPosition, lineWidth) {
        if (filters[filter].fraction === undefined) {
            return pinPosition / lineWidth * filters[filter].max;
        } else {
            return pinPosition / lineWidth * filters[filter].max + filters[filter].fraction;
        }
    };
    
    var previewContainer = uploadOverlay.querySelector('.img-upload__preview');
    var effectControls = uploadOverlay.querySelector('.upload-effect-controls');
    var effectContainer = uploadOverlay.querySelector('.upload-effect-level');
    var filterEffectPin = uploadOverlay.querySelector('.upload-effect-level-pin');
    var filterEffectLevel = uploadOverlay.querySelector('.upload-effect-level-val');
    var lineWidth = 455;
    var value;

    effectContainer.style = 'display: none';
    
    effectControls.addEventListener('click', function(evt) {
        if (evt.target.tagName === 'INPUT') {    
            value = evt.target.attributes['value'].value;
    
            if (value === 'none') {
                effectContainer.style = 'display: none;';
            } else {
                effectContainer.removeAttribute('style');
            }
    
            filterEffectPin.style.left = 20 * lineWidth / 100 + 'px';
            filterEffectLevel.style.width = filterEffectPin.style.left;
            previewContainer.classList = 'img-upload__preview';
            previewContainer.removeAttribute('style');
            previewContainer.classList.add(filters[value].class);
            previewContainer.style = '' + 'filter: ' + filters[value].css + '(' + getFilterValue(value, parseInt(filterEffectPin.style.left), lineWidth) + ');';
        }
    });

    filterEffectPin.addEventListener('mousedown', function(evt) {
        evt.preventDefault();
        var startPosition = evt.clientX;
    
        var onMouseMove = function(moveEvt) {
            moveEvt.preventDefault();
    
            
            var shift = startPosition - moveEvt.clientX;
            startPosition = moveEvt.clientX;
            if (filterEffectPin.offsetLeft - shift <= 0) {
                filterEffectPin.style.left = '0';
            } else if (filterEffectPin.offsetLeft - shift >= lineWidth) {
                filterEffectPin.style.left = lineWidth + 'px';
            } else {
                filterEffectPin.style.left = (filterEffectPin.offsetLeft - shift) + 'px';
            }
            filterEffectLevel.style.width = filterEffectPin.style.left;
            previewContainer.style = '' + 'filter: ' + filters[value].css + '(' + getFilterValue(value, parseInt(filterEffectPin.style.left), lineWidth) +');';
        }

        var onMouseUp = function(upEvt) {
            upEvt.preventDefault();
            effectContainer.removeEventListener('mousemove', onMouseMove);
            effectContainer.removeEventListener('mouseup', onMouseUp);
        };

        effectContainer.addEventListener('mousemove', onMouseMove);
        effectContainer.addEventListener('mouseup', onMouseUp);
    });

    uploadForm.addEventListener('submit', function(evt) {
        evt.preventDefault();
        window.upload(new FormData(uploadForm),
            function(response) {
                console.log(response);
                uploadOverlay.classList.add('hidden');
            },
            function(msg) {
                console.error(msg);
            });
    });

    //Open big Photo
    
    var findElement = function(elem, list) {
        var srcValue = elem.attributes.src.nodeValue;
        for (var key in list) {
            if (list[key].url === srcValue) {
                break;
            }  
        }
        showBigPicture(bigPicture, list[key]);
    };

    var photosContainer = document.querySelector('.pictures');
    var bigPicture = document.querySelector('.gallery-overlay');
    var bigPictureClose = bigPicture.querySelector('.gallery-overlay-close');

    var showBigPicture = function(bigPicture, picture) {
        var socialCommentsList = document.createElement('ul');
        var commentFragment = document.createDocumentFragment();
        var socialContainer = document.querySelector('.social__comments');

        bigPicture.classList.remove('hidden');
        bigPicture.querySelector('.gallery-overlay-image').src = picture.url;
        bigPicture.querySelector('.likes-count').textContent = picture.likes;
        bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
        bigPicture.querySelector('.social__caption').textContent = picture.description;

        socialCommentsList.classList.add('social__comments-list');
        
        commentFragment.appendChild(socialCommentsList);
        socialContainer.appendChild(commentFragment);

        for (var i = 0; i < picture.comments.length; i++) {
            var socialComment = document.createElement('li');
            socialComment.classList.add('social__comment', 'social__comment--text');
        
            var socialPicture = document.createElement('img');
            socialPicture.src = 'photos/' + generateRandom(1, 7) + '.jpg';
            socialPicture.alt = 'Аватар комментатора фотографии';
            socialPicture.width = '35';
            socialPicture.height = '35';
            
            socialComment.appendChild(socialPicture);
        
            var socialText = document.createElement('p');
            socialText.classList.add('social__text');
            socialText.textContent = picture.comments[i];
            console.log(i);
        
            socialComment.appendChild(socialText);
        
            socialCommentsList.appendChild(socialComment);
        }
    
        bigPictureClose.addEventListener('click', function() {
            bigPicture.classList.add('hidden');
            socialCommentsList.parentNode.removeChild(socialCommentsList);
        });
    };
    
    photosContainer.addEventListener('click', function(evt) {
        evt.preventDefault();
        if (evt.target.parentNode.classList.contains('picture') || evt.target === 'img') {
            window.download(
                function(photos) {
                    findElement(evt.target, photos);
                },
                function(msg) {
                    console.error(msg);
                }
            );
        }
    });
})();