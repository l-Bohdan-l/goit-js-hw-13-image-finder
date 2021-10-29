import refs from "./refs";
import cardImageTemplate from '../templates/cardImageTemplate.hbs'

const { inputEl, ulEl} = refs;

inputEl.addEventListener('change', getImage);

function getImage(e) {
    console.log(e.target.value)
    const inputValue = e.target.value;
    fetchImage(inputValue, 1);
}

function fetchImage(inputValue, pageNum) {
    const base_url = `https://pixabay.com/api/`;
    let end_point = `?image_type=photo&orientation=horizontal`
    let query_params = `&q=${inputValue}`
    let pageNumber = `&page=${pageNum}&per_page=12`;
    const API_KEY = `&key=24097500-b1b25815474c0bcb76303e859`;
    const url = base_url + end_point + query_params + pageNumber + API_KEY;
    // https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=что_искать&page=номер_страницы&per_page=12&key=твой_ключ

    const option = {
        method: `GET`,
        headers: {
            Authorization: API_KEY,
        }
    }

    fetch(url)
        .then((result) => {
            if (result.status === 404) {
                const myError = error({
                    title: '404',
                    text: 'Not Found.',
                    stack: myStack,
                });
            }
            console.log("result", result)
            return result.json()
        })
        .then((data) => {
            console.log(data)
            let imgMarkup = cardImageTemplate(data.hits);
            console.log(imgMarkup)
            ulEl.insertAdjacentHTML('beforeend', imgMarkup)
            return data
        })
        .catch((error) => {
            console.log('err', error)           

        })
}