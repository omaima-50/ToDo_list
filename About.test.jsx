import '@testing-library/jest-dom';  // Import jest-dom for custom matchers
import { describe, it, expect } from 'vitest';  // Import expect from Vitest
import { render, screen } from '@testing-library/react';  // Import rendering utilities
import About from '../src/Components/About';  
import React from 'react';  
 
 
describe("About", () => {
//Test Case 1
  it("should render the About component", () => {
    render(<About />);  // Render the About component
   
    //Assertion: check if there is an h1 element
    const aboutElement = screen.getByRole('heading', {level: 1})
    expect(aboutElement).toBeInTheDocument();
  });
 
//Test Case 2
    it("should have the text about", () => {
      render(<About />);
      const text = screen.queryByText(/about/i);
      expect(text).toBeInTheDocument();
  });  
 
//Test Case 3
it("should have the image", () => {
  render(<About />);
  const image = screen.getByAltText('devimage')
  expect(image).toHaveClass('UserImage');
});  
});
 
// Test Case 4
it("should contain a paragraph with description text", () => {
  render(<About />);
  const paragraph = screen.getByText(/(Developer|Rawida And 2 Omima|about me|I am)/i);  // Use a broad match depending on your content
  expect(paragraph).toBeInTheDocument();
});
 
// Test Case 5
it("should render a container with class 'aboutContainer'", () => {
  render(<About />);
  const container = screen.getByTestId('about-container'); // Add data-testid="about-container" in your component
  expect(container).toHaveClass('aboutContainer');
});
 
// Test Case 6
 
 
it("should render the user's email", () => {
  render(<About />);
  const emailElement = screen.getByText(/@/i); // Adjust regex based on how it's displayed
  expect(emailElement).toBeInTheDocument();
});