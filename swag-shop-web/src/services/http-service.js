import 'whatwg-fetch';

class httpService {
    getProducts = () => {
        var promise = new Promise((resolve, reject) => {
            fetch('http://localhost:3000/api/products')
            .then(response => response.json())
            .then(products => resolve(products))
            .catch(error => reject(error));
        });
        return promise;
    }
}
export default httpService;