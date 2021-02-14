/////////////// headerNav
const headerLinks = document.documentElement.querySelectorAll('.header__link');
const header = document.documentElement.querySelector('.header');

headerLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        let prevLink = document.documentElement.querySelector('.header__link_active');
        if (prevLink !== null) {
            prevLink.classList.remove('header__link_active');
        }

        link.classList.add('header__link_active');

        const activeBlockId = link.getAttribute('href').substring(1);
        const activeBlock = document.documentElement.querySelector(`#${activeBlockId}`);

        const topOffset = header.offsetHeight;
        const activeBlockPosition = activeBlock.getBoundingClientRect().top;
        const offsetPosition = activeBlockPosition - topOffset;

        window.scrollBy({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});

const intro = document.documentElement.querySelector('.intro');

window.addEventListener('scroll', showHeader);

function showHeader() {
    if (isBlockScrolled(intro)) {
        header.classList.add('fixed');
    } else {
        header.classList.remove('fixed');
    }
}

function isBlockScrolled(block) {
    return window.scrollY > block.offsetHeight;
}


/////////////// burgerMenu
const burgerMenu = document.documentElement.querySelector('.burger-menu');
const headerNav = document.documentElement.querySelector('.header__nav');

burgerMenu.addEventListener('click', () => {
    burgerMenu.classList.toggle('active');
    headerNav.classList.toggle('active');
})

const accordionItems = document.documentElement.querySelectorAll('.accordion__item');
accordionItems.forEach(item => {
    item.addEventListener('click', () => {
        let activeItem = document.documentElement.querySelector('.accordion__item_active');
        if (activeItem !== null && activeItem !== item) {
            activeItem.classList.remove('accordion__item_active');
        }
        item.classList.toggle('accordion__item_active');
    })
});


/////////////// sliders
new Swiper('.swiper-container', {
    speed: 700,
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

/////////////// lazy load images
const images = document.documentElement.querySelectorAll('img');

const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

function handleImage(images, observer) {
    images.forEach(image => {
        if (image.intersectionRatio > 0) {
            loadImage(image.target);
        }
    })
}

function loadImage(image) {
    image.src = image.getAttribute('data-src');
}

const imgObserver = new IntersectionObserver(handleImage, options);

images.forEach(img => {
    imgObserver.observe(img);
});

showHeader();