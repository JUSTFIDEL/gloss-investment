import Spinner from 'react-bootstrap/Spinner'

const LoadingBox = () => {
	return (
		<Spinner animation='border' role='status' id='text--color'>
			<span className='visually-hidden'>Loading...</span>
		</Spinner>
	)
}

export default LoadingBox
