import { ICart } from "./product.interface";

export interface ICartState {
	cart: ICart | null;
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
	error: string | null | unknown;
}