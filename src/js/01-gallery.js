// Add imports above this line
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { galleryItems } from './gallery-items';
// Change code below this line

const galleryContainerEl = document.querySelector('.gallery');

function createGalleryItemsMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
               <a class="gallery__item" href="${original}" data-caption="${description}">
                    <img class="gallery__image" src="${preview}" alt="${description}" />
                </a>
             </div>`;
    })
    .join('');
}
const gallerysMarkup = createGalleryItemsMarkup(galleryItems);
galleryContainerEl.insertAdjacentHTML('beforeend', gallerysMarkup);

let gallery = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionsData: 'alt',
});
