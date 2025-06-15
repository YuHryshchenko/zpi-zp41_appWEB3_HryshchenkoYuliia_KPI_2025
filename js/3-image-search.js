import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// Приклад для css-loader. Вам потрібно буде додати відповідні стилі CSS.
// import 'path/to/css-loader.css'; // 

const searchForm = document.querySelector('.search-form'); // 
const gallery = document.querySelector('.gallery'); // 
const loader = document.querySelector('.loader'); // 

const API_KEY = '50859004-e3d58e032296fbe353afffef6'; //  Замініть на свій Pixabay API ключ

let lightbox; // Змінна для SimpleLightbox

searchForm.addEventListener('submit', async (event) => { // 
    event.preventDefault();
    const searchQuery = event.currentTarget.elements.searchQuery.value.trim();

    if (searchQuery === '') { // 
        iziToast.error({
            title: 'Error',
            message: 'Search field cannot be empty!',
            position: 'topRight'
        });
        return;
    }

    gallery.innerHTML = ''; //  Очищення галереї перед новим пошуком
    loader.style.display = 'block'; //  Показати індикатор завантаження

    try {
        const response = await fetch(`https://pixabay.com/api/?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true`); // 
        if (!response.ok) {
            throw new Error(response.status);
        }
        const data = await response.json();

        if (data.hits.length === 0) { // 
            iziToast.info({ // 
                title: 'Info',
                message: 'Sorry, there are no images matching your search query. Please try again!', // 
                position: 'topRight'
            });
        } else {
            renderImages(data.hits); // 
        }
    } catch (error) { //
        iziToast.error({
            title: 'Error',
            message: `Something went wrong: ${error.message}`,
            position: 'topRight'
        });
    } finally {
        loader.style.display = 'none'; //  Сховати індикатор завантаження
    }

    searchForm.reset(); // Очистити поле введення
});

function renderImages(images) {
    const markup = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => { // 
        return `
            <a class="gallery-item" href="${largeImageURL}"> <img src="${webformatURL}" alt="${tags}" loading="lazy" /> <div class="info">
                    <p class="info-item"><b>Likes</b> ${likes}</p>
                    <p class="info-item"><b>Views</b> ${views}</p>
                    <p class="info-item"><b>Comments</b> ${comments}</p>
                    <p class="info-item"><b>Downloads</b> ${downloads}</p>
                </div>
            </a>
        `;
    }).join(''); //

    gallery.insertAdjacentHTML('beforeend', markup); //

    if (lightbox) {
        lightbox.refresh(); // 
    } else {
        lightbox = new SimpleLightbox('.gallery a', { // 
            captionsData: 'alt',
            captionDelay: 250,
        });
    }
}
