import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import JobForm from '../JobForm'
import type { JobApplication } from '../../types/jobs'

describe('JobForm', () => {
  const mockAddApplication = jest.fn()

  beforeEach(() => {
    mockAddApplication.mockClear()
  })

  it('renders the form with inputs, select, and button', () => {
    render(<JobForm addApplication={mockAddApplication} />)

    expect(screen.getByPlaceholderText('company')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('role')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Applied')).toBeInTheDocument() // status select
    expect(screen.getByPlaceholderText('date')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /add application/i })).toBeInTheDocument()
  })

  it('updates company input value', async () => {
    const user = userEvent.setup()
    render(<JobForm addApplication={mockAddApplication} />)

    const companyInput = screen.getByPlaceholderText('company')
    await user.type(companyInput, 'Test Company')

    expect(companyInput).toHaveValue('Test Company')
  })

  it('updates role input value', async () => {
    const user = userEvent.setup()
    render(<JobForm addApplication={mockAddApplication} />)

    const roleInput = screen.getByPlaceholderText('role')
    await user.type(roleInput, 'Test Role')

    expect(roleInput).toHaveValue('Test Role')
  })

  it('updates status select value', async () => {
    const user = userEvent.setup()
    render(<JobForm addApplication={mockAddApplication} />)

    const statusSelect = screen.getByDisplayValue('Applied')
    await user.selectOptions(statusSelect, 'Interviewing')

    expect(statusSelect).toHaveValue('Interviewing')
  })

  it('updates date input value', async () => {
    const user = userEvent.setup()
    render(<JobForm addApplication={mockAddApplication} />)

    const dateInput = screen.getByPlaceholderText('date')
    await user.type(dateInput, '2023-10-01')

    expect(dateInput).toHaveValue('2023-10-01')
  })

  it('calls addApplication with correct data on form submit', async () => {
    const user = userEvent.setup()
    render(<JobForm addApplication={mockAddApplication} />)

    const companyInput = screen.getByPlaceholderText('company')
    const roleInput = screen.getByPlaceholderText('role')
    const dateInput = screen.getByPlaceholderText('date')
    const submitButton = screen.getByRole('button', { name: /add application/i })

    await user.type(companyInput, 'Test Company')
    await user.type(roleInput, 'Test Role')
    await user.type(dateInput, '2023-10-01')
    await user.click(submitButton)

    expect(mockAddApplication).toHaveBeenCalledTimes(1)
    const calledWith = mockAddApplication.mock.calls[0][0] as JobApplication
    expect(calledWith.company).toBe('Test Company')
    expect(calledWith.role).toBe('Test Role')
    expect(calledWith.status).toBe('Applied')
    expect(calledWith.dateApplied).toBe('2023-10-01')
    expect(typeof calledWith.id).toBe('number')
  })

  it('clears inputs after form submit', async () => {
    const user = userEvent.setup()
    render(<JobForm addApplication={mockAddApplication} />)

    const companyInput = screen.getByPlaceholderText('company')
    const roleInput = screen.getByPlaceholderText('role')
    const statusSelect = screen.getByDisplayValue('Applied')
    const dateInput = screen.getByPlaceholderText('date')
    const submitButton = screen.getByRole('button', { name: /add application/i })

    await user.type(companyInput, 'Test Company')
    await user.type(roleInput, 'Test Role')
    await user.selectOptions(statusSelect, 'Interviewing')
    await user.type(dateInput, '2023-10-01')
    await user.click(submitButton)

    expect(companyInput).toHaveValue('')
    expect(roleInput).toHaveValue('')
    expect(statusSelect).toHaveValue('Applied')
    expect(dateInput).toHaveValue('')
  })
})