let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');
let carouselDom = document.querySelector('.page4 .carousel');
let listItemDom = document.querySelector('.page4 .carousel .list');
let thumbnailDom = document.querySelector('.page4 .carousel .thumbnail');


nextDom.onclick = function () {
    showSlider('next');
}
prevDom.onclick = function () {
    showSlider('prev');
}
let timeRunning = 2000;
let runTimeOut;
function showSlider(type) {
    let itemSlider = document.querySelectorAll('.page4 .carousel .list .item');
    let itemThumbnail = document.querySelectorAll('.page4 .carousel .thumbnail .item');
    void carouselDom.offsetWidth;
    if (type == 'next') {

        listItemDom.appendChild(itemSlider[0]);
        thumbnailDom.appendChild(itemThumbnail[0]);
        carouselDom.classList.add('next');
    } else {
        listItemDom.prepend(itemSlider[itemSlider.length - 1]);
        thumbnailDom.prepend(itemThumbnail[itemSlider.length - 1]);
        carouselDom.classList.add('prev');
    }

    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
    }, timeRunning)
}
