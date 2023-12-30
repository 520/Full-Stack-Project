
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Pagination from '../Pagination';

describe('Pagination describe', () => {
    test('Pagination component', () => {
        const num = 4;
        const handlePageChange = jest.fn(n=>n);
        render(<Pagination totalPages={num} onPageChange={handlePageChange}/>);
        for(let i=1;i<=num;i++) {
            const page = screen.getByText(""+i);
            expect(page).toBeInTheDocument();
            const returnValue = fireEvent.click(page);
            expect(returnValue).toBe(true);
        }
        expect(handlePageChange).toHaveBeenCalledTimes(num);
    });
});
