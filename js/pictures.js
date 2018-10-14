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

fillContainer(photosContainer, photos);

bigPicture.classList.remove('hidden');
bigPicture.querySelector('.gallery-overlay-image').src = photos[0].url;
bigPicture.querySelector('.likes-count').textContent = photos[0].likes;
bigPicture.querySelector('.comments-count').textContent = comments.length;


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
document.querySelector('.social__caption').textContent = photos[0].description;