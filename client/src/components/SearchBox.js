import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Form from 'react-bootstrap/Form'
import { useNavigate } from 'react-router-dom'

export default function SearchBox() {
	const navigate = useNavigate()
	const [query, setQuery] = useState('')
	const submitHandler = e => {
		e.preventDefault()
		navigate(query ? `/search/?query=${query}` : '/search')
	}

	return (
		<Form onSubmit={submitHandler} className='dis_none'>
			<InputGroup>
				<FormControl
					type='text'
					name='q'
					id='q'
					onChange={e => setQuery(e.target.value)}
					placeholder='search products...'
					aria-label='Search Products'
					aria-describedby='button-search'
				></FormControl>
				<Button
					variant='outline-light search-btn'
					type='submit'
					id='button-search'
					className='search__btn'
				>
					<i className='fas fa-search search_icon'></i>
				</Button>
			</InputGroup>
		</Form>
	)
}
