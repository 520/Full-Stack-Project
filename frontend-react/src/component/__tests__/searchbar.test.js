
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import SearchBar from '../SearchBar';
import {Provider} from "react-redux";
import store from '../../redux/store';

describe('SearchBar describe', () => {
    test('SearchBar component', () => {

        render(<Provider store={store}><SearchBar/></Provider>);
        const inputElement = screen.getByPlaceholderText('Enter your search');
        expect(inputElement).toBeInTheDocument();

        const buttonElement = screen.getByText('Search');
        expect(buttonElement).toBeInTheDocument();

        fireEvent.change(inputElement, {target: {value: 'programming'}});
        expect(inputElement).toHaveValue('programming');
    });
});

