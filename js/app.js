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

/////////////// Fixed header
const intro = document.documentElement.querySelector('.intro');

window.addEventListener('scroll', showHeader);

function showHeader() {
    if (isBlockPartlyScrolled(intro)) {
        header.classList.add('fixed');
        header.classList.remove('initial');
    } else {
        header.classList.remove('fixed');
        header.classList.add('initial');
    }
}

function isBlockPartlyScrolled(block) {
    return window.scrollY > block.offsetHeight * 0.8;
}

/////////////// Active header nav
let blocks = [];

for (let i = 0; i < headerLinks.length - 2; ++i) {
    blocks[i] = document.documentElement.querySelector(`#${headerLinks[i].getAttribute('href').substring(1)}`);
}

const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
};

function changeActiveLink(blocks) {
    blocks.forEach(block => {
        if (block.intersectionRatio > 0) {
            const activeLinkHref = block.target.getAttribute('id');
            const activeLink = document.documentElement.querySelector(`a[href='#${activeLinkHref}']`);

            let prevLink = document.documentElement.querySelector('.header__link_active');
            if (prevLink !== null) {
                prevLink.classList.remove('header__link_active');
            }

            activeLink.classList.add('header__link_active');
        }
    })
}

const activeBlockObserver = new IntersectionObserver(changeActiveLink, options);

blocks.forEach(block => activeBlockObserver.observe(block));

/////////////// Logo
const logo = document.documentElement.querySelector('.header__logo');

logo.addEventListener('click', event => {
    event.preventDefault();
    window.scrollBy({
        top: -scrollY,
        behavior: 'smooth'
    });
});

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

const imgOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
};

function handleImage(images) {
    images.forEach(image => {
        if (image.intersectionRatio > 0) {
            loadImage(image.target);
        }
    })
}

function loadImage(image) {
    image.src = image.getAttribute('data-src');
}

const imgObserver = new IntersectionObserver(handleImage, imgOptions);

images.forEach(img => {
    imgObserver.observe(img);
});

showHeader();