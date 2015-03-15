(function(){

    var $parallaxImages = document.querySelectorAll('.img-spacer__img');

    var setContainerHeight = function() {
        [].forEach.call($parallaxImages, function($parallaxImage) {
            $parallaxImage.$container.style.height = (Math.ceil(window.innerHeight * 0.75 / 25) * 25) + 'px';
        });
    };

    var scroll = function() {
        [].forEach.call($parallaxImages, function($parallaxImage, i) {
            var scrolledTo = ($parallaxImage.$container.offsetTop - window.innerHeight) <= window.scrollY;
            var scrolledPast = ($parallaxImage.$container.offsetTop + $parallaxImage.$container.offsetHeight) < window.scrollY;

            if (scrolledTo && !scrolledPast) {
                var yPos = Math.round(0.25 * ($parallaxImage.$container.offsetTop - window.scrollY));

                $parallaxImage.style.transform = 'translate3d(0,' + yPos + 'px,0)';

                var scrolledHalfTo = ($parallaxImage.$container.offsetTop - window.innerHeight / 2) <= window.scrollY;
                var scrolledHalfPast = ($parallaxImage.$container.offsetTop + $parallaxImage.$container.offsetHeight - window.innerHeight / 2) < window.scrollY;

                var zIndex = -1;
                if (scrolledHalfTo) {
                    zIndex = 0;
                }
                if (scrolledHalfPast) {
                    zIndex = -1 * i;
                }
                $parallaxImage.style.zIndex = zIndex;
                $parallaxImage.style.visibility = 'visible';
            } else {
                $parallaxImage.style.visibility = 'hidden';
            }
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