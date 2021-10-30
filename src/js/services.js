import refs from "./refs";
import cardImageTemplate from '../templates/cardImageTemplate.hbs'
import { alert, notice, info, success, error, Stack } from '@pnotify/core';
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import * as Confirm from "@pnotify/confirm";
import "@pnotify/confirm/dist/PNotifyConfirm.css";

const { inputEl, ulEl, loadMoreBtn} = refs;

export class pixabayImg {
    constructor() {
        this.base_url = `https://pixabay.com/api/`;        
        this.API_KEY = `&key=24097500-b1b25815474c0bcb76303e859`;
        this.end_point = `?image_type=photo&orientation=horizontal`;
        this._pageNum = 1;
        this._inputValue = '';

    }

    get pageNum() {
        return this._pageNum
     };
    set pageNum(value) {
        return (this._pageNum += value)
    };

    get inputValue() {
        return this._inputValue
    };
    set inputValue(value) {
        return (this._inputValue = value)

    };



    getFetch() {
        let query_params = `&q=${this.inputValue}`
        let pageNumber = `&page=${this.pageNum}&per_page=12`;
        const url = this.base_url + this.end_point + query_params + pageNumber + this.API_KEY;
        // console.log('what we get', this.pageNum, this.inputValue)
        const myStack = new Stack({
                    delay: 1000,
                    dir1: 'down',
                    dir2: 'left',
                    mode: 'light',
                    firstpos1: 25,
                    firstpos2: 25,
                    spacing1: 36,
                    spacing2: 36,
                    push: 'top',
                    context: document.body,
                    positioned: true,
                    maxStrategy: 'close'                    
                });
        
        fetch(url)
        .then((result) => {
            // console.log("result", result)
            return result.json()
        })
        .then((data) => {
        if (data.total == 0) {
            // console.log("total", 0)
            const myError = error({
                title: 'Error',
                text: 'Invalid input value.',
                stack: myStack,
            });
        }
        console.log(data)
        let imgMarkup = cardImageTemplate(data.hits);
        // console.log(imgMarkup)
        ulEl.insertAdjacentHTML('beforeend', imgMarkup)
        return data
    })
        .catch((error) => {
            console.log('err', error)

        })
    }

    getImage(e) {
        ulEl.innerHTML = '';
        console.log(e.target.value)
        let inputValue = e.target.value;
        this.getFetch(inputValue);
    }


}

// export function getImage(e) {
//     ulEl.innerHTML = '';
//     console.log(e.target.value)
//     const inputValue = e.target.value;
//     getFetch(inputValue);
// }

// export function loadMoreImg(e) {
//     console.log(e.target.value)
// }
