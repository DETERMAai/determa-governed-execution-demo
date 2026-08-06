import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import App from "../App";
it("renders explicit synthetic truth boundary", () => { render(<App />); expect(screen.getByText("Synthetic Environment — No Production Access")).toBeInTheDocument(); expect(screen.getByRole("button", {name:"Evaluate Execution Authority"})).toBeEnabled(); });
