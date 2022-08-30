import { render, screen } from "@testing-library/react";
import { ColorCircle } from "./ColorCircle";

describe("ColorCircle", () => {
  test.each`
    color       | expected
    ${"red"}    | ${"red"}
    ${"blue"}   | ${"blue"}
    ${"green"}  | ${"green"}
    ${"yellow"} | ${"yellow"}
  `(`should be of color $color`, ({ color, expected }) => {
    render(<ColorCircle color={color} />);

    const el = screen.getByTestId("color-circle");

    expect(el.style.backgroundColor).toBe(expected);
  });

  test.each`
    color       | expected
    ${"red"}    | ${"red"}
    ${"blue"}   | ${"blue"}
    ${"green"}  | ${"green"}
    ${"yellow"} | ${"yellow"}
  `(`should be of color $color`, ({ color, expected }) => {
    render(<ColorCircle color={color} />);

    expect(screen).toMatchSnapshot();
  });
});
