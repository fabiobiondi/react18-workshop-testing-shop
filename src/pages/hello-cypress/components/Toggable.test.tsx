import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Toggable } from "./Togglable";

test("should display title bar", () => {
  render(<Toggable title="ciao" />);
  expect(screen.getByText("ciao")).toBeInTheDocument();
});

test("should not display children when component is mounted", () => {
  render(<Toggable title="hello">lorem ipsum</Toggable>);
  expect(screen.getByText("lorem ipsum")).toBeInTheDocument();
});

test("should display children when opened attribute is set", () => {
  render(
    <Toggable title="hello" open>
      lorem ipsum
    </Toggable>
  );
  expect(screen.getByText("lorem ipsum")).toBeInTheDocument();
});

test("should toggle children when title bar is clicked", () => {
  render(<Toggable title="hello">lorem ipsum</Toggable>);

  fireEvent.click(screen.queryByText("hello") as HTMLElement);
  expect(screen.queryByText("lorem ipsum")).not.toBeInTheDocument();

  fireEvent.click(screen.queryByText("hello") as HTMLElement);
  expect(screen.getByText("lorem ipsum")).toBeInTheDocument();
});

test("should invoke callback when icon is clicked", () => {
  const fn = jest.fn();
  render(
    <Toggable title="hello" icon="💩" onIconClick={fn}>
      lorem ipsum
    </Toggable>
  );
  fireEvent.click(screen.queryByText("💩") as HTMLElement);
  expect(fn).toHaveBeenCalled();
});
