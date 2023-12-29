
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import PopUp from '../PopUp';

describe('PopUp describe', () => {
    test('PopUp component', () => {

        render(<PopUp><div>this is popup</div></PopUp>);
        const buttonElement = screen.getByText('this is popup');
        expect(buttonElement).toBeInTheDocument();
    });
});
