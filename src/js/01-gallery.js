// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { galleryItems } from './gallery-items.js'

const galleryContainer = document.querySelector('.gallery');

function markup(galleryItems) {
    return galleryItems.map(({ preview, original, description }) => {
        return `
            <a class="gallery__item" href="${original}">
            <img class="gallery__image" src="${preview}" alt="${description}" />
            </a>
        `;
    })
    .join('');
}

galleryContainer.innerHTML = markup(galleryItems);
const gallery = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250 });