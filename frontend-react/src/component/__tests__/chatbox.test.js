
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ChatBox from '../ChatBox';

describe('ChatBox describe', () => {
    test('ChatBox component', () => {
        render(<ChatBox />);
        const buttonElement = screen.getByText("Send");
        expect(buttonElement).toBeInTheDocument();
        const inputElement = screen.getByPlaceholderText('Type your message');
        expect(inputElement).toBeInTheDocument();
        fireEvent.change(inputElement, {target: {value: 'hi'}});
        expect(inputElement).toHaveValue('hi');
    });

});
