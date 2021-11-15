export { 
    authUser,
    newUser
} from './login.service'
export {
    addNumber,
    addNames,
    modifyEmail,
    addCreditCard,
    modifyPassword,
    getUser,
    setUser,
    getCart,
    addCard,
    modifyCreditCard
} from './account.service'
export {
    spent,
    newSale
} from './sales.service'
export {
    getStore,
    getCategory,
    getItemsCart,
    addItemToCart
} from './shopping.service'
export {
    confirmPaid
} from './stripe.service'
export {
    getUsers,
    getUserById
} from './users.service'