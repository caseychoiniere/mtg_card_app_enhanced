import { observable, action } from 'mobx';
import api from '../api';
import { checkStatus } from '../util/fetchUtil';

export class MainStore {
    @observable anchorElements;
    @observable cards;
    @observable loading;
    @observable orderBy;
    @observable page;
    @observable query;
    @observable searching;
    @observable searchBy;
    @observable windowWidth;

    constructor() {
        this.anchorElements = observable.map();
        this.cards = [];
        this.loading = false;
        this.orderBy = 'name';
        this.page = 1;
        this.query = null;
        this.searching = false;
        this.searchBy = 'name';
        this.windowWidth = 0;
    }

    @action setAnchorElement(anchorEl, i) {
        let a = this.anchorElements;
        !a.has(i) ? a.set(i, anchorEl) : a.delete(i);
        this.anchorElements = a;
    }

    @action generateUuid() {
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        )
    }

    @action getCards(page, query, orderBy, searchBy) {
        if(!this.loading) this.toggleLoading();
        api.getCards(page, query, orderBy, searchBy)
            .then(checkStatus)
            .then(res => res.json())
            .then((json) => {
                this.query = query;
                this.page++;
                this.cards = [...this.cards, ...json.cards];
                this.toggleLoading();
            })
            .catch(er => {
                this.toggleLoading();
                this.handleErrors(er)
            })
    }

    @action handleErrors(er) {
        this.loading = false;
        if (er.status === 401) localStorage.setItem('redirectUrl', window.location.href); // Todo: fix this function. No auth
    }

    @action setSearchState() {
        this.cards = [];
        this.page = 1;
        this.searching = !this.searching;
    }

    @action setSortByValue(sortValue) {
        this.cards = [];
        this.orderBy = sortValue;
        this.page = 1;
        const { page, query, orderBy, searchBy } = this;
        this.getCards(page, query, orderBy, searchBy);
    }

    @action setSearchByValue(searchValue) {
        this.searchBy = searchValue;
    }

    @action setWindowWidth() {
        this.windowWidth = window.innerWidth;
    }

    @action toggleDrawer(key) {
        !this.drawers.has(key) ? this.drawers.set(key, true) : this.drawers.delete(key);
    }

    @action toggleLoading() {
        this.loading = !this.loading;
    }

}

const mainStore = new MainStore();

export default mainStore;