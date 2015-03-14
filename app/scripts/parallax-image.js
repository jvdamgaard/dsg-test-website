(function(){

    var $parallaxImages = document.querySelectorAll('.img-spacer__img');

    var setContainerHeight = function() {
        [].forEach.call($parallaxImages, function($parallaxImage) {
            $parallaxImage.$container.height = Math.ceil(window.innerHeight * 0.75 / 25) * 25;
        });
    };

    var scroll = function() {
        [].forEach.call($parallaxImages, function($parallaxImage, i) {
            var diff = $parallaxImage.$container.offsetTop - window.scrollY;
            var yPos = Math.round(0.5 * diff) - Math.round(window.innerHeight * 0.125)
            
            $parallaxImage.style.transform = 'translate3d(0,' + yPos + 'px,0)';
            $parallaxImage.style.zIndex = (diff + $parallaxImage.$container.height <= 0 ) ? -1 : 0;
        });
        window.requestAnimationFrame(scroll);
    };


    [].forEach.call($parallaxImages, function($parallaxImage) {
        $parallaxImage.$container = document.querySelector($parallaxImage.dataset.container);
    });
    
    window.requestAnimationFrame(scroll);

    setContainerHeight();
    window.addEventListener('resize', setContainerHeight);
    
}());