import api from './api';

export default class ProductService {
    static getProducts = async () => {
        return await api.get('products');
    }

    static getProductById = async (id) => {
        return await api.get(`products/${id}`);
    }

    static addProduct = async (product) => {
        return await api.post('products', product);
    }

    static editProduct = async (id, product) => {
        return await api.put(`products/${id}`, product);
    }

    static removeProduct = async (id) => {
        return await api.delete(`products/${id}`);
    }
}