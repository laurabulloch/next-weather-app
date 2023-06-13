import Home from "./index";
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import {act} from "react-dom/test-utils";

describe('Weather App', () => {
    it('should have a title', () => {
        render(<Home />)

        expect(screen.getByText('Your Weather')).toBeInTheDocument();
    })

    it('should display user instruction', () => {
        render(<Home />)

        expect(screen.getByText('Get started by typing a town into the search box below')).toBeInTheDocument()
    })

    it('should display input box', () => {
        render(<Home />)

        expect(screen.getByRole('textbox')).toBeInTheDocument()
    })

    it('should display button', () => {
        render(<Home />)

        expect(screen.getByRole('button')).toBeInTheDocument()
    })


    it('should display entered town when button pressed', async () => {

        render(<Home/>)

        await act(() => {
            userEvent.type(screen.getByPlaceholderText('textbox'), 'a');
            userEvent.click(screen.getByText('Go'));
        });

        expect(screen.getByText("a")).toBeInTheDocument();
    })

});