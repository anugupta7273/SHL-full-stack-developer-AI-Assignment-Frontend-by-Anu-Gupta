import axios from 'axios'
const instance = axios.create({
    baseURL: 'https://getprojects-glrmm4x3xa-uc.a.run.app/'
});

export default {
    getProjectsList: async function () {
        try {
            const response = await instance.get('getProjects')
            // console.log(response)
            return response;
        } catch (error) {
            return error.response;
        }
    },
}