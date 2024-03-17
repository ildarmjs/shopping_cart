import { FC } from 'react'
import { IProduct } from '../../../interfaces/product.interface'
import { useDispatch } from 'react-redux'
import { removeItem, updateQuantity } from '../../../redux/cartSlice/cartSlice'
import { Button, Card, Col, Flex, Image } from 'antd'
import Title from 'antd/es/typography/Title'

interface ICartItem {
	product: IProduct
}

const CartItem: FC<ICartItem> = ({ product }) => {
	const dispatch = useDispatch()
	const handleRemoveItem = (itemId: number) => {
		dispatch(removeItem(itemId))
	}

	const handleUpdateQuantity = (itemId: number, quantity: number) => {
		dispatch(updateQuantity({ id: itemId, quantity: quantity }))
	}
	return (
		<Col
			xs={{ flex: '0 1 100%' }}
			sm={{ flex: '0 1 50%' }}
			md={{ flex: '0 1 50%' }}
			lg={{ flex: '0 1 33.333%' }}
			xl={{ flex: '0 1 25%' }}
		>
			<Card>
				<div className='overflow-hidden h-[250px] md:h-[240px] lg:h-[270px]'>
					<Image className=' w-full object-cover' src={product.thumbnail} />
				</div>

				<Title className='h-[35px] md:h-[50px]' level={5}>
					Название: {product.title}
				</Title>
				<Title mark level={4}>
					Цена: {product.price} &#8381;
				</Title>
				<Title level={5}>Количество: {product.quantity}</Title>
				<Flex gap='20px' className='mb-5'>
					<Button
						size='large'
						onClick={() =>
							handleUpdateQuantity(product.id, product.quantity + 1)
						}
						disabled={product.quantity === 10}
					>
						+
					</Button>
					<Button
						size='large'
						onClick={() =>
							handleUpdateQuantity(product.id, product.quantity - 1)
						}
						disabled={product.quantity === 1}
					>
						-
					</Button>
				</Flex>
				<Button
					danger
					type='primary'
					onClick={() => handleRemoveItem(product.id)}
				>
					Удалить товар
				</Button>
			</Card>
		</Col>
	)
}

export default CartItem
