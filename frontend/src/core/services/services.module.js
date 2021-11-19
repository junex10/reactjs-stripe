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
    newSale,
    getSaleByEmail,
    getSales
} from './sales.service'
export {
    getStore,
    getCategory,
    getItemsCart,
    addItemToCart,
    getAllStore,
    registerStock
} from './shopping.service'
export {
    confirmPaid
} from './stripe.service'
export {
    getUsers,
    getUserById,
    registerUser
} from './users.service'