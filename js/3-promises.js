import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchForm = document.querySelector('.search-form');
const galleryContainer = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

// PIXABAY API KEY
const API_KEY = '50859004-e3d58e032296fbe353afffef6';
const BASE_URL = 'https://pixabay.com/api/';

let lightbox; // Змінна для екземпляра SimpleLightbox

// Ініціалізація SimpleLightbox
document.addEventListener('DOMContentLoaded', () => {
    lightbox = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionDelay: 250,
    });
});

searchForm.addEventListener('submit', onSearch);

function onSearch(event) {
    event.preventDefault();
    const searchQuery = event.currentTarget.elements.searchQuery.value.trim();

    if (searchQuery === '') {
        iziToast.warning({
            title: 'Warning',
            message: 'Please enter a search query!',
            position: 'topRight',
        });
        return;
    }

    galleryContainer.innerHTML = ''; // Очищаємо галерею перед новим пошуком
    showLoader();

    fetchImages(searchQuery)
        .then(data => {
            if (data.hits.length === 0) {
                iziToast.info({
                    title: 'No Results',
                    message: 'Sorry, there are no images matching your search query. Please try again!',
                    position: 'topRight',
                });
            } else {
                renderGallery(data.hits);
            }
        })
        .catch(error => {
            iziToast.error({
                title: 'Error',
                message: `Something went wrong: ${error.message}`,
                position: 'topRight',
            });
            console.error('Fetch error:', error);
        })
        .finally(() => {
            hideLoader();
            searchForm.reset(); // Очищаємо поле вводу
        });
}

function fetchImages(query) {
    const params = new URLSearchParams({
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
    });
    return fetch(`${BASE_URL}?${params}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        });
}

function renderGallery(images) {
    const markup = images.map(image => {
        return `
            <div class="gallery-item">
                <a href="${image.largeImageURL}" class="gallery-link">
                    <img class="gallery-image" src="${image.webformatURL}" alt="${image.tags}" />
                </a>
                <div class="image-info">
                    <p class="info-item"><b>Likes</b><span>${image.likes}</span></p>
                    <p class="info-item"><b>Views</b><span>${image.views}</span></p>
                    <p class="info-item"><b>Comments</b><span>${image.comments}</span></p>
                    <p class="info-item"><b>Downloads</b><span>${image.downloads}</span></p>
                </div>
            </div>
        `;
    }).join('');

    galleryContainer.innerHTML = markup; // Додаємо розмітку за одну операцію
    lightbox.refresh(); // Оновлюємо SimpleLightbox після додавання нових елементів
}

function showLoader() {
    loader.classList.remove('is-hidden');
}

function hideLoader() {
    loader.classList.add('is-hidden');
}
