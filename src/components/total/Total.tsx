import Title from 'antd/es/typography/Title'
import { RootState } from '../../redux/store'
import { FC } from 'react'
import { useSelector } from 'react-redux'
import Paragraph from 'antd/es/typography/Paragraph'

const Total: FC = () => {
	const cartItems = useSelector((state: RootState) => state.cart.cart?.products)

	const total = cartItems?.reduce(
		(acc, item) => acc + item.quantity * item.price,
		0
	)
	return (
		<div className='text-center '>
			<div>
				<Title level={2}>Итог</Title>
				<Paragraph className='text-[20px]'>Сумма: {total} &#8381;</Paragraph>
			</div>
		</div>
	)
}

export default Total
