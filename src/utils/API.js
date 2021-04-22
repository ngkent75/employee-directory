import axios from 'axios';

const Url = 'https://randomuser.me/api/?results=30';

const search = {
    getAllUsers: () => axios.get(Url).then(({ data }) => data.results)
};

export default search;