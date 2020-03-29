"use strict";

import gallery from "./gallery-items.js";

const range = document.querySelector(".gallery");
const lightBox = document.querySelector(".lightbox");
const modalPictures = document.querySelector(".lightbox___image");
const closeBtn = document.querySelector("button[data-action=close-lightbox]");
const overlay = document.querySelector(".lightbox__overlay");

const collection = gallery.reduce((acc, img) => {
  img = `<li class="gallery__item">
            <a class="gallery__link" href="${img.original}">
                <img class="gallery__image" src="${img.preview}" data-source="${img.original}" alt="${img.description}"/>
            </a>
        </li>`;
  return (acc += img);
}, "");

range.insertAdjacentHTML("afterbegin", collection);

const openModal = event => {
  if (event.target === event.currentTarget) {
    return;
  }
  event.preventDefault();
  lightBox.classList.add("is-open");
  modalPictures.setAttribute("src", event.target.dataset.source);
};

const closeModal = e => {
  if (e.target.nodeName !== "IMG") {
    lightBox.classList.remove("is-open");
    modalPictures.src = '';
  }
};

const closeEsc = event => {
  if (event.keyCode === 27) {
    lightBox.classList.remove("is-open");
  }
};


range.addEventListener("click", openModal);

closeBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
document.addEventListener("keydown", closeEsc);

