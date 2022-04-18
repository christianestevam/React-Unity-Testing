import { render, waitFor, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import List from './List' 

describe('List Component', () => {
  it('should render list items', async () => {
    const { getByText, queryByText, rerender, unmount } = render(<List initialItems={['Christian', 'Caio Lucas', 'Calebe']} />)

    expect(getByText('Christian')).toBeInTheDocument()
    expect(getByText('Caio Lucas')).toBeInTheDocument()
    expect(getByText('Calebe')).toBeInTheDocument()

    unmount()
    rerender(<List initialItems={['Faker']} />)

    expect(getByText('Faker')).toBeInTheDocument()
    expect(queryByText('Caio Lucas')).not.toBeInTheDocument()
  });

  it('should be able to add new item to the list', async () => {
    const { getByText, getByPlaceholderText, findByText } = render(<List initialItems={[]} />)

    const inputElement = getByPlaceholderText('Novo item');
    const addButton = getByText('Adicionar');

    userEvent.type(inputElement, 'Novo');
    userEvent.click(addButton);

    await waitFor(() => {
      expect(getByText('Novo')).toBeInTheDocument()
    })
  });

  it('should be able to add remove item from the list', async () => {
    const { getAllByText, queryByText } = render(<List initialItems={['Christian']} />)

    const removeButtons = getAllByText('Remover');

    userEvent.click(removeButtons[0]);

    await waitFor(() => {
      expect(queryByText('CHristian')).not.toBeInTheDocument()
    })
  });
});