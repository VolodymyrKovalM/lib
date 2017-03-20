var carousel = {
    slideIndex: 1,
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
                console.log(parseInt(sl[1]));

                var active = carousel.slider.querySelector('li.active');
                active.classList.remove('active');
                carousel.slides[parseInt(sl[1]) - 1].classList.add('active');

                var pgActive = carousel.pagination.querySelector('a.active');
                pgActive.classList.remove('active');

                this.classList.add('active');
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
            }
        } else if (options.target == '+=1') {
            link.onclick = function(event) {
                event.preventDefault();
                carousel.changeSlide(+1);
            }
        } else {
            console.log('Error');
        }
    }  
};