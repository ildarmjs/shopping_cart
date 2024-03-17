import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCart } from './redux/cartSlice/cartSlice'
import Cart from './components/cart/Cart'
import Total from './components/total/Total'
import { Col, Row, Spin } from 'antd'
import { RootState } from './redux/store'
import Text from 'antd/es/typography/Text'

function App() {
	const dispatch = useDispatch()
	const { status, error } = useSelector((state: RootState) => state.cart)

	useEffect(() => {
		dispatch(fetchCart())
	}, [dispatch])
	const rowStyle: React.CSSProperties = {
		padding: 10
	}

	return (
		<>
			{status === 'loading' && (
				<Spin className='mt-[200px]' tip='Loading' size='large'>
					<div className='content' />
				</Spin>
			)}
			{error && (
				<Text type='danger' className='text-[24px]'>
					Упс, ошибка!!!
				</Text>
			)}
			<Row style={rowStyle}>
				<Col md={16} lg={18} xl={20}>
					<Cart />
				</Col>
				<Col md={8} lg={6} xl={4}>
					<Total />
				</Col>
			</Row>
		</>
	)
}

export default App
