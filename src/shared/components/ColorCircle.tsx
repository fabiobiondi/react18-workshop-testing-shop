type Props = {
  color: string;
};

export function ColorCircle({ color }: Props) {
  return (
    <div
      data-testid="color-circle"
      aria-hidden="true"
      style={{ backgroundColor: color }}
      className={"h-8 w-8 border border-black border-opacity-10 rounded-full"}
    />
  );
}
