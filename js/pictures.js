'use strict';

var generateRandom = function(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
};

var comments = [
    'Всё отлично!',
    'В целом все неплохо. Но не всё',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var descriptions = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'
];

var photos = [];

for (var i = 0; i < 26; i++) {
    photos[i] = {
        url: 'photos/' + (i + 1) + '.jpg',
        likes: generateRandom(15, 201),
        comments: generateRandom(0, 2) === 0 ? comments[generateRandom(0, 6)] : comments[generateRandom(0, 6)] + comments[generateRandom(0, 6)],
        description: descriptions[generateRandom(0, 6)]
    }
}

var createPicture = function(template, photosList, index) {
    var pictureElement = template.cloneNode(true);
    pictureElement.querySelector('img').src = photosList[index].url;
    pictureElement.querySelector('.picture-likes').textContent = photosList[index].likes;
    pictureElement.querySelector('.picture-comments').textContent = photosList[index].comments;
    return pictureElement;
};

var fillContainer = function(container, photosList) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < photosList.length; i++) {
        fragment.appendChild(createPicture(pictureTemplate, photos, i));
    }

    container.appendChild(fragment);
}

var pictureTemplate = document.querySelector('#picture-template')
                            .content
                            .querySelector('.picture');
var photosContainer = document.querySelector('.pictures');
var bigPicture = document.querySelector('.gallery-overlay');
var bigPictureClose = bigPicture.querySelector('.gallery-overlay-close');

fillContainer(photosContainer, photos);

var showBigPicture = function(bigPicture, src, comments, description, likes) {
    bigPicture.classList.remove('hidden');
    bigPicture.querySelector('.gallery-overlay-image').src = src;
    bigPicture.querySelector('.likes-count').textContent = likes;
    bigPicture.querySelector('.comments-count').textContent = comments.length;
    bigPicture.querySelector('.social__caption').textContent = description;

    bigPictureClose.addEventListener('click', function() {
        bigPicture.classList.add('hidden');
    });
}

var uploadFile = document.querySelector('#upload-file');
var uploadForm = document.querySelector('.upload-overlay');
var uploadFormClose = uploadForm.querySelector('#upload-cancel');

uploadFile.addEventListener('change', function() {
    uploadForm.classList.remove('hidden');

    uploadFormClose.addEventListener('click', function() {
        uploadForm.classList.add('hidden');
        uploadFile.value = null;
    });
});

var getFilterValue = function(filter) {
    var lineWidth = filterEffectLine.offsetWidth;
    var pinPosition = parseInt(getComputedStyle(filterEffectPin).left);
    return pinPosition / lineWidth * filters[filter].max + filters[filter].min;
}

var filterEffectLine = uploadForm.querySelector('.upload-effect-level-line');
var filterEffectPin = uploadForm.querySelector('.upload-effect-level-pin');
var filterEffectLevel = uploadForm.querySelector('.upload-effect-level-val');

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
        max: 100,
        min: 0,
        fraction: '%'
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
        max: 20,
        min: 0,
        fraction: 'px'
    },
    heat: {
        class: 'picture-filter--heat',
        css: 'brightness',
        max: 300,
        min: 100,
        fraction: '%'
    }
};

var filterNone = uploadForm.querySelector('[for="upload-effect-none"]');
var filterChrome = uploadForm.querySelector('[for="upload-effect-chrome"]');
var filterSepia = uploadForm.querySelector('[for="upload-effect-sepia"]');
var filterMarvin = uploadForm.querySelector('[for="upload-effect-marvin"]');
var filterPhobos = uploadForm.querySelector('[for="upload-effect-phobos"]');
var filterHeat = uploadForm.querySelector('[for="upload-effect-heat"]');
var previewContainer = uploadForm.querySelector('.img-upload__preview');

filterNone.addEventListener('click', function() {
    previewContainer.classList = 'img-upload__preview';
    previewContainer.removeAttribute('style');
    previewContainer.classList.add(filters.none.class);
});

filterChrome.addEventListener('click', function() {
    previewContainer.classList = 'img-upload__preview';
    previewContainer.removeAttribute('style');
    previewContainer.classList.add(filters.chrome.class);
    previewContainer.style = '' + 'filter: ' + filters.chrome.css + '(' + getFilterValue('chrome') + ');';
});

filterSepia.addEventListener('click', function() {
    previewContainer.classList = 'img-upload__preview';
    previewContainer.removeAttribute('style');
    previewContainer.classList.add(filters.sepia.class);
    previewContainer.style = 'filter: ' + filters.sepia.css + '(' + getFilterValue('sepia') + filters.sepia.fraction + ');';
});

filterMarvin.addEventListener('click', function() {
    previewContainer.classList = 'img-upload__preview';
    previewContainer.removeAttribute('style');
    previewContainer.classList.add(filters.marvin.class);
    previewContainer.style ='filter: ' + filters.marvin.css + '(' + getFilterValue('marvin') + filters.marvin.fraction + ');';
});

filterPhobos.addEventListener('click', function() {
    previewContainer.classList = 'img-upload__preview';
    previewContainer.removeAttribute('style');
    previewContainer.classList.add(filters.phobos.class);
    previewContainer.style ='filter: ' + filters.phobos.css + '(' + getFilterValue('phobos') + filters.phobos.fraction + ');';
});

filterHeat.addEventListener('click', function() {
    previewContainer.classList = 'img-upload__preview';
    previewContainer.removeAttribute('style');
    previewContainer.classList.add(filters.heat.class);
    previewContainer.style ='filter: ' + filters.heat.css + '(' + getFilterValue('heat') + filters.heat.fraction + ');';
});

var commentFragment = document.createDocumentFragment();
var socialContainer = document.querySelector('.social__comments');

var socialCommentsList = document.createElement('ul');
socialCommentsList.classList.add('social__comments-list');

for (var i = 0; i < comments.length; i++) {
    var socialComment = document.createElement('li');
    socialComment.classList.add('social__comment', 'social__comment--text');

    var socialPicture = document.createElement('img');
    socialPicture.src = 'photos/' + generateRandom(1, 7) + '.jpg';
    socialPicture.alt = 'Аватар комментатора фотографии'
    socialPicture.width = '35';
    socialPicture.height = '35';
    
    socialComment.appendChild(socialPicture);

    var socialText = document.createElement('p');
    socialText.classList.add('social__text');
    socialText.textContent = comments[i];

    socialComment.appendChild(socialText);

    socialCommentsList.appendChild(socialComment);
}

commentFragment.appendChild(socialCommentsList);
socialContainer.appendChild(commentFragment);

var findElement = function(evt) {
    var srcValue = evt.target.attributes.src.nodeValue;
    for (var key in photos) {
        if (photos[key].url === srcValue) {
            console.log(photos[key]);
            return photos[key];
        }
    }
}

photosContainer.addEventListener('click', function(evt) {
    evt.preventDefault();
    if (evt.target.parentNode.classList.contains('picture') || evt.target === 'img') {
        var object = findElement(evt);
        showBigPicture(bigPicture, object.url, object.comments, object.description, object.likes);
    }
});