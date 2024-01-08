
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Divider from '../Divider';

describe('Divider describe', () => {
    test('Divider component', () => {

        render(<Divider>Divider</Divider>);
        const buttonElement = screen.getByText('Divider');
        expect(buttonElement).toBeInTheDocument();
    });
});
