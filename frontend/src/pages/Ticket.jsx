import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Modal from 'react-modal'
import { FaPlus } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { getTicket, closeTicket } from '../features/tickets/ticketSlice'
import { useParams, useNavigate } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'

const customStyles = {
	content: {
		width: '600px',
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		position: 'relative',
	},
}

Modal.setAppElement('#root')

function Ticket() {
	const [modalIsOpen, setModalIsOpen] = useState(false)
	const [noteText, setNoteText] = useState('')

	const { isLoading, isSuccess, isError, message, ticket } = useSelector(
		state => state.tickets
	)

	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { ticketId } = useParams()

	useEffect(() => {
		if (isError) {
			toast.error(message)
		}

		dispatch(getTicket(ticketId))
	}, [ticketId, isError, message])

	const onTicketClose = () => {
		dispatch(closeTicket(ticketId))
		toast.success('Ticket Closed')
		navigate('/tickets')
	}

	const onNoteSubmit = e => {
		e.preventDefault()
	}

	const openModal = () => setModalIsOpen(true)
	const closeModal = () => setModalIsOpen(false)

	if (!ticket) {
		return <Spinner />
	}

	return (
		<div className='ticket-page'>
			<header className='ticket-header'>
				<BackButton />
				<h2>
					Ticket ID: {ticket._id}
					<span className={`status status-${ticket.status}`}>
						{ticket.status}
					</span>
				</h2>
				<h3>
					Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}
				</h3>
				<h3>Product: {ticket.product}</h3>
				<hr />
				<div className='ticket-desc'>
					<h3>Description of Issue</h3>
					<p>{ticket.description}</p>
				</div>
				<h2>Notes</h2>
			</header>

			{ticket.status !== 'closed' && (
				<button
					onClick={openModal}
					className='btn'>
					<FaPlus /> Add Note
				</button>
			)}

			<Modal
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
				style={customStyles}
				contentLabel='Add Note'>
				<h2>Add Note</h2>
				<button
					className='btn-close'
					onClick={closeModal}>
					X
				</button>
				<form onSubmit={onNoteSubmit}>
					<div className='form-group'>
						<textarea
							name='noteText'
							id='noteText'
							className='form-control'
							placeholder='Note text'
							value={noteText}
							onChange={e => setNoteText(e.target.value)}></textarea>
					</div>
					<div className='form-group'>
						<button
							className='btn'
							type='submit'>
							Submit
						</button>
					</div>
				</form>
			</Modal>

			{ticket.status !== 'closed' && (
				<button
					onClick={onTicketClose}
					className='btn btn-block btn-danger'>
					Close Ticket
				</button>
			)}
		</div>
	)
}

export default Ticket