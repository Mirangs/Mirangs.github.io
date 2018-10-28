'use strict';

(function() {
    var IMAGE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

    var uploadForm = document.querySelector('.upload-form');
    var imagePreview = uploadForm.querySelector('.effect-image-preview');
    var imageUpload = document.querySelector('.upload-input');
    var filters = uploadForm.querySelectorAll('.upload-effect-preview');

    imageUpload.addEventListener('change', function() {
        var file = imageUpload.files[0];
        var fileName = file.name.toLowerCase();

        var matches = IMAGE_TYPES.some(function(it) {
            return fileName.endsWith(it);
        });

        if (matches) {
            var reader = new FileReader();

            reader.addEventListener('load', function() {
                imagePreview.src = reader.result;
                for (var i = 0; i < filters.length; i++) {
                    filters[i].style = 'background-image: url(' + reader.result + ');';
                }
            });

            reader.readAsDataURL(file);
        }
    });
})();