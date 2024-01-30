import {
    createSlice 
} from "@reduxjs/toolkit";

const initialState = {
    cart: [],
    totalPrice: 0,
    totalQuantity: 0,
    user: {}
};

const usersSlice = createSlice({
    initialState,
    name: "user",
    reducers: {
        addToCart: (state, {
            payload 
        }) => {
            const check = state.cart.findIndex((el) => el._id === payload._id);

            if (check >= 0) 
                state.cart[check].cartQuantity += 1;
      
            else {
                state.cart.push({
                    ...payload,
                    cartQuantity: 1
                });
            }

            state.totalQuantity += 1;
        },
        
        clearCart: (state) => {
            state.cart = [];
            state.totalQuantity = 0;
        },
        
        loginUser: (state, action) => {
            state.user = action.payload;
            // console.log(action.payload, ">>>");
        },

        // eslint-disable-next-line no-unused-vars
        logoutUser: (state, action) => {
            state.user = {};
        },
        remove: (state, {
            payload 
        }) => {
            state.cart = state.cart.filter((el) => el._id !== payload._id);
        },
        removeFromCart: (state, {
            payload 
        }) => {
            const check = state.cart.findIndex((el) => el._id === payload._id);

            if (state.cart[check].cartQuantity > 1) 
                state.cart[check].cartQuantity -= 1;
            else 
                state.cart = state.cart.filter((el) => el._id !== payload._id);

            state.totalQuantity -= 1;
        }
    }
});

export const {
    loginUser,
    logoutUser,
    addToCart,
    clearCart,
    removeFromCart,
    remove
} = usersSlice.actions;

export default usersSlice;
