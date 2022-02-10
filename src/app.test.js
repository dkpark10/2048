import React from 'react';
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import App from './app';

describe("2048", () => {

  it("test", async () => {
    const { container, findAllByRole, getByText } = render(<App />);
  });
});
