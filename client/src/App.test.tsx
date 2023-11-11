import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import "@testing-library/jest-dom";
import App from "./App";

describe("App component", () => {
  it("renders navbar", () => {
    render(<App />);
    const navbar = screen.getByRole("navigation");
    expect(navbar).toBeInTheDocument();
  });

  it("renders Visitors per day,    Vistiors per Country, Trends components correctly", async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("Visitors per Day")).toBeInTheDocument();
      expect(screen.getByText("Vistiors per Country")).toBeInTheDocument();
      expect(screen.getByText("Trends")).toBeInTheDocument();
    });
  });
});
