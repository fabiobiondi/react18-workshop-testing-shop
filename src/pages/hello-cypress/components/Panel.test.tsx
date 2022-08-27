import React from "react";
import { render, screen } from "@testing-library/react";
import { Panel } from "./Panel";

test("render title bar", () => {
  render(<Panel title="ciao" />);
  expect(screen.getByText("ciao")).toBeInTheDocument();
});

test("render children", () => {
  render(<Panel title="hello">lorem ipsum</Panel>);
  expect(screen.getByText("lorem ipsum")).toBeInTheDocument();
});
