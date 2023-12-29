
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Alert from '../Alert';

describe('Alert describe', () => {
    test('Alert success component', () => {
        render(<Alert display="true" success="ok" type="success"/>);
        const alert = screen.getByText("ok");
        expect(alert).toBeInTheDocument();
    });

    test('Alert failure component', () => {
        render(<Alert display="true" failure="error" type="failure"/>);
        const alert = screen.getByText("error");
        expect(alert).toBeInTheDocument();
    });

});
