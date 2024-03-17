import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { ICart, IProduct } from '../../interfaces/product.interface';
import { ICartState } from '../../interfaces/cart-state.interface';




const initialState: ICartState = {
	cart: null,
	status: 'idle',
	error: null,
};

export const fetchCart: any = createAsyncThunk<ICart, void, { rejectValue: string }>('cart/fetchCart', async (_, { rejectWithValue }) => {
	try {
		const response = await axios.get<ICart>('https://dummyjson.com/carts/1');
		return response.data;
	} catch (error: unknown) {
		if (error instanceof Error) {
			return rejectWithValue(error.message);
		} else {
			return rejectWithValue('Произошла ошибка при загрузке данных о корзине');
		}
	}

});


// Функция для пересчета общей стоимости корзины
const recalculateTotal = (state: any) => {
	if (state.cart) {
		state.cart.total = state.cart.products.reduce((total: number, product: IProduct) => total + product.total, 0);
	}
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		updateQuantity(state, action: PayloadAction<{ id: number, quantity: number }>) {
			if (state.cart) {
				const product = state.cart.products.find(p => p.id === action.payload.id);
				if (product) {
					product.quantity = action.payload.quantity;
					product.total = product.price * product.quantity; // Обновляем total для измененного товара
					recalculateTotal(state); // Вызываем функцию для пересчета общей стоимости корзины
				}
			}
		},
		removeItem(state, action: PayloadAction<number>) {
			if (state.cart) {
				state.cart.products = state.cart.products.filter(p => p.id !== action.payload);
				recalculateTotal(state)
			}
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCart.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchCart.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.cart = action.payload;
			})
			.addCase(fetchCart.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
	},
});

export const { updateQuantity, removeItem } = cartSlice.actions;

export default cartSlice.reducer;