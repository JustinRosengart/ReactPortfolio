import React from 'react';
import {render, screen} from '@testing-library/react';
import App from './App';

test('renders the application successfully', () => {
    render(<App/>);

    // Check that the app renders without crashing
    // by looking for at least one navigation element that should be unique
    const navigation = screen.getByRole('navigation');
    expect(navigation).toBeInTheDocument();
});
