import { RootState } from '../../redux/store'
import { FC } from 'react'
import { useSelector } from 'react-redux'
import CartItem from './cart-item/CartItem'
import { Row } from 'antd'
import Title from 'antd/es/typography/Title'
import Text from 'antd/es/typography/Text'

const Cart: FC = () => {
	const cartItems = useSelector((state: RootState) => state.cart.cart?.products)

	if (cartItems)
		return (
			<>
				<Title level={3}>Корзина товаров</Title>
				<Row gutter={[16, 16]} wrap={true}>
					{cartItems.length ? (
						cartItems.map(product => (
							<CartItem product={product} key={product.id} />
						))
					) : (
						<Text className='ml-2'>Корзина пустая</Text>
					)}
				</Row>
			</>
		)
}

export default Cart
