function Carousel(slider) {
    this.slideIndex = 1;
    this.isPaused = false;
    this.slider = slider;
    this.slides = this.slider.querySelectorAll('li');
    this.pagination = this.slider.querySelector('.jcarousel-pagination');
    var self = this;

    var touchStart;
    var touchEnd;

    this.onLoad = function () {
        console.log(this.slides);
        this.slides[this.slideIndex - 1].classList.add('active');

        this.makePagination();
    };

    this.makePagination = function() {
        for(var i = 0; i < this.slides.length; i++) {
            var pagItem = document.createElement('a');
            pagItem.setAttribute('href', '#' + (i + 1));
            this.pagination.appendChild(pagItem);
        }

        this.paginationItems = this.pagination.querySelectorAll('a');
        this.paginationItems[this.slideIndex - 1].classList.add('active');

        for(var a = 0; a < this.paginationItems.length; a++) {
            this.paginationItems[a].onclick = function() {
                var sl = this.getAttribute('href');
                self.slideIndex = parseInt(sl[1]);
                console.log(self.slideIndex);

                var active = self.slider.querySelector('li.active');
                active.classList.remove('active');
                self.slides[parseInt(sl[1]) - 1].classList.add('active');

                var pgActive = self.pagination.querySelector('a.active');
                pgActive.classList.remove('active');

                this.classList.add('active');

                if(!self.isPaused) {
                    pauseSlider();
                }
            }
        }
    };

    this.showSlide = function(index) {
        if (index > this.slides.length) {
            this.slideIndex = 1;
        }

        if (index < 1) {
            this.slideIndex = this.slides.length;
        }
        var active = this.slider.querySelector('li.active');
        active.classList.remove('active');
        this.slides[this.slideIndex - 1].classList.add('active');

        var pgActive = this.pagination.querySelector('a.active');
        pgActive.classList.remove('active');
        this.paginationItems[this.slideIndex - 1].classList.add('active');
    };

    this.changeSlide = function (n) {
        this.showSlide(this.slideIndex += n);
    };

    this.control = function (options) {
        var link = options.element;

        if(options.target == '-=1') {
            link.onclick = function(event) {
                event.preventDefault();
                self.changeSlide(-1);
                if(!self.isPaused) {
                    pauseSlider();
                }
            }
        } else if (options.target == '+=1') {
            link.onclick = function(event) {
                event.preventDefault();
                self.changeSlide(+1);
                if(!self.isPaused) {
                    pauseSlider();
                }
            }
        } else {
            console.log('Error');
        }
    };

    function pauseSlider() {
        self.isPaused = true;
        console.log(self);
        console.log('start ' + self.isPaused);
        setTimeout(function() {
            self.isPaused = false;
            console.log('not paused ' + self.isPaused);
        }, 15000);
    }

    this.autoScroll = function (options) {
        var auto = setInterval(function() {
            if (!self.isPaused) {
                self.changeSlide(+1);
            }

        }, options.interval);
    };

    this.onKeyControl = function () {
        document.onkeyup = function (e) {
            var key = e.which || e.keyChar || e.keyCode;
            if (key == 37)  {
                self.changeSlide(-1);
                if(!self.isPaused) {
                    pauseSlider();
                }
            } else if (key == 39) {
                self.changeSlide(+1);
                if(!self.isPaused) {
                    pauseSlider();
                }
            }
        };
    };

    this.onTouchControl = function () {
        this.slider.addEventListener('touchstart', function (event) {
            self.touchStart = event.changedTouches[0].clientX;
            console.log(self.touchStart);
        });

        this.slider.addEventListener('touchend', function (event) {
            self.touchEnd = event.changedTouches[0].clientX;
            console.log(self.touchEnd);
            var diff = self.touchEnd - self.touchStart;
            console.log(Math.abs(diff));
            if (diff > 0 && Math.abs(diff) > 85) {
                self.changeSlide(-1);
            } else if (diff < 0 && Math.abs(diff) > 85) {
                self.changeSlide(+1);
            }
            if(!self.isPaused) {
                pauseSlider();
            }
        });
    };

    this.turnAllFeaturesOn = function (interv) {
        this.autoScroll({ interval: interv });
        this.onKeyControl();
        this.onTouchControl();
    };
}





/*var carousel = {
    slideIndex: 1,
    isPaused: false,

    onLoad: function(slider) {
        this.slider = slider;
        this.slides = this.slider.querySelectorAll('li');
        console.log(this.slides);
        this.slides[this.slideIndex - 1].classList.add('active');

        this.makePagination();
        console.log(this);
    },

    makePagination: function() {
        this.pagination = this.slider.querySelector('.jcarousel-pagination');
        console.log(this.slides);

        for(var i = 0; i < this.slides.length; i++) {
            var pagItem = document.createElement('a');
            pagItem.setAttribute('href', '#' + (i + 1));
            this.pagination.appendChild(pagItem);
        }

        this.paginationItems = this.pagination.querySelectorAll('a');
        this.paginationItems[this.slideIndex - 1].classList.add('active');

        for(var a = 0; a < this.paginationItems.length; a++) {
            this.paginationItems[a].onclick = function() {
                var sl = this.getAttribute('href');
                carousel.slideIndex = parseInt(sl[1]);
                console.log(carousel.slideIndex);

                var active = carousel.slider.querySelector('li.active');
                active.classList.remove('active');
                carousel.slides[parseInt(sl[1]) - 1].classList.add('active');

                var pgActive = carousel.pagination.querySelector('a.active');
                pgActive.classList.remove('active');

                this.classList.add('active');

                if(!carousel.isPaused) {
                    carousel.pauseSlider();
                }
            }
        }
    },

    showSlide: function(index) {
        if (index > this.slides.length) {
            this.slideIndex = 1;
        }

        if (index < 1) {
            this.slideIndex = this.slides.length;
        }
        var active = this.slider.querySelector('li.active');
        active.classList.remove('active');
        this.slides[this.slideIndex - 1].classList.add('active');

        var pgActive = this.pagination.querySelector('a.active');
        pgActive.classList.remove('active');
        this.paginationItems[this.slideIndex - 1].classList.add('active');
    },

    changeSlide: function(n) {
        this.showSlide(this.slideIndex += n);
    },

    control: function(options) {
        var link = options.element;     

        if(options.target == '-=1') {
            link.onclick = function(event) {
                event.preventDefault();
                carousel.changeSlide(-1);
                if(!carousel.isPaused) {
                    carousel.pauseSlider();
                }
            }
        } else if (options.target == '+=1') {
            link.onclick = function(event) {
                event.preventDefault();
                carousel.changeSlide(+1);
                if(!carousel.isPaused) {
                    carousel.pauseSlider();
                }
            }
        } else {
            console.log('Error');
        }
    },

    pauseSlider: function() {
        this.isPaused = true;
        console.log('start ' + this.isPaused);
        setTimeout(function() {
            carousel.isPaused = false;
            console.log('not paused ' + carousel.isPaused);
        }, 15000);
    },

    autoScroll: function(options) {

        var auto = setInterval(function() {
            if (!carousel.isPaused) {
                carousel.changeSlide(+1);
            }

        }, options.interval);
    }  
};*/

