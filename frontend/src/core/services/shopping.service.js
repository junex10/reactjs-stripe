import { api, HTTP_OPTIONS } from '../../commons/config';

export const getItemsCart = JSON.parse(window.localStorage.getItem('cart'));
export const addItemToCart = (email, item) => {
    let newCart = [];
    const actualItemsCart = JSON.parse(window.localStorage.getItem('cart'));
    if (actualItemsCart !== null) {
        actualItemsCart.forEach(value => {
            if (value.product === item.product) value.many += 1;
        })
        newCart = [...actualItemsCart];
    } else newCart.push(item)
    api.post('users/addCart', {
        email: email,
        cart: newCart
    })
    .then(() => 
        window.localStorage.setItem('cart', JSON.stringify(newCart))
    )
}
export const getStore = category => api.get(`store/getStock/category/${category}`)
export const getCategory = () => api.get('store/getCategory')
export const getAllStore = () => api.get(`store/getStock`)
export const registerStock = (
    product,
    price,
    stock,
    category,
    image
) => api.post(`store/registerStock`, {
    product: product,
    price: price,
    stock: stock,
    category: category,
    image: image
}, HTTP_OPTIONS)