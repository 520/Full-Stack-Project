
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Comment from '../Comment';

describe('Comment describe', () => {
    test('Comment component', () => {
        render(<Comment />);
        const buttonElement = screen.getByText("Submit");
        expect(buttonElement).toBeInTheDocument();
        const inputElement = screen.getByPlaceholderText('Write your comment...');
        expect(inputElement).toBeInTheDocument();
        fireEvent.change(inputElement, {target: {value: 'This is good book'}});
        expect(inputElement).toHaveValue('This is good book');
    });

});
