let thumbnails = document.querySelectorAll(".thumbnail");
let largeImage = document.getElementById("largeImage");

thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener("click", function() {
        // 将大图的 src 改为点击缩略图对应的图片
        largeImage.src = `images/panda${index + 1}.jpg`;
    });
});