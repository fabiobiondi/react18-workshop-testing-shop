import { PropsWithChildren } from "react";

interface PanelProps {
  title?: string;
}

export function Panel(props: PropsWithChildren<PanelProps>) {
  return (
    <div className="p-5 rounded-lg bg-gradient-to-r  from-slate-600 to-slate-700 text-white">
      <div className="flex justify-between items-center">
        <div className="text-xl">{props.title}</div>
      </div>
      <div>{props.children}</div>
    </div>
  );
}
