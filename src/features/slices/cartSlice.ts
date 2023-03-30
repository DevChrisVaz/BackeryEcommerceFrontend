import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store";
import { HYDRATE } from "next-redux-wrapper";
import Product from "@/domain/entities/Product";

interface Item {
    product: Product,
    qty: number
}

export interface CartState {
    products: Item[];
}

const initialState: CartState = {
    products: []
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem(state, action) {
            state.products.push({
                product: action.payload,
                qty: 1
            });
        },
        removeItem(state, action) {
            state.products = state.products.filter(p => p.product.uuid !== action.payload);
        },
        increaseProductQty(state, action) {
            state.products = state.products.map(p => {
                if (p.product.uuid === action.payload) {
                    p.qty += 1
                }
                return p;
            });
        },
        decreaseProductQty(state, action) {
            state.products = state.products.map(p => {
                if (p.product.uuid === action.payload) {
                    if (p.qty > 1) {
                        p.qty -= 1
                    }
                }
                return p;
            });
        },
        clearCart(state) {
            state.products = [];
        }
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.cart
            }
        }
    }
});

export const { addItem, removeItem, increaseProductQty, decreaseProductQty, clearCart } = cartSlice.actions;

export const selectCartState = (state: AppState) => state.cart.products;

export default cartSlice.reducer;