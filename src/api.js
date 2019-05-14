import { config } from './config';
import { getFetchParams } from './util/fetchUtil';

const api = {

    getCards: (page, query, orderBy, searchBy) => {
        let search = query ? `&${searchBy}=${encodeURIComponent(query)}` : '';
        return fetch(`${config.API_URL}contains=imageUrl${search}&page=${page}&pageSize=20&types=creature&orderBy=${orderBy}`, getFetchParams('get'))
    },

};

export default api;