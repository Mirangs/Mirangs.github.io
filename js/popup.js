(function() {
    var findElement = function(elem, list) {
        var srcValue = elem.attributes.src.nodeValue;
        for (var key in list) {
            if (list[key].url === srcValue) {
                showBigPicture(bigPicture, list[key]);
                return;
            }  
        }
    };

    var bigPicture = document.querySelector('.gallery-overlay');
    var bigPictureClose = bigPicture.querySelector('.gallery-overlay-close');

    var showBigPicture = function(bigPicture, picture) {
        var socialCommentsList = document.createElement('ul');
        var commentFragment = document.createDocumentFragment();
        var socialContainer = document.querySelector('.social__comments');
        var bigPicturePreview = bigPicture.querySelector('.gallery-overlay-prewiev');

        var closeModal = function() {
            bigPicture.classList.add('hidden');
            socialCommentsList.parentNode.removeChild(socialCommentsList);
        }

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
            socialText.textContent = picture.comments[i].message;
        
            socialComment.appendChild(socialText);
        
            socialCommentsList.appendChild(socialComment);
        }
    
        bigPictureClose.addEventListener('click', function(evt) {
            if (evt.target !== bigPicturePreview) {
                closeModal();
            }
        });
        
        bigPicture.addEventListener('click', function() {
            bigPicture.classList.add('hidden');
            socialCommentsList.parentNode.removeChild(socialCommentsList);
        });

        document.addEventListener('keydown', function(evt) {
            if (evt.keyCode === 27) {
                closeModal();
            }
        });
    };

    var photosContainer = document.querySelector('.pictures');
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