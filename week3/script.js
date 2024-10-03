
let thumbnails = document.querySelectorAll('.thumbnail');
let largeImage = document.getElementById('largeImage');


thumbnails.forEach(function(thumbnail) {
    thumbnail.addEventListener('click', function() {
        
        largeImage.src = thumbnail.src;
    });
});