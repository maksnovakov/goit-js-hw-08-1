// Add imports above this line
import { galleryItems } from "./gallery-items";
// Change code below this line
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const container = document.querySelector(".gallery ");
const imageGallery = createImageCards(galleryItems);

container.insertAdjacentHTML("beforeend", imageGallery);
// container.addEventListener("click", imgClick);

function createImageCards(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
      <a class="gallery__item" href="${original}">
        <img
          class="gallery__image"
          src="${preview}"
          alt="${description}"
        />
      </a>
    `;
    })
    .join("");
}

let lightbox = new SimpleLightbox(".gallery a", {
  nav: true,
  close: true,
  captions: true,
  captionsData: "alt",
  captionPosition: "bottom",
  captionDelay: 250,
});

console.log(galleryItems);
