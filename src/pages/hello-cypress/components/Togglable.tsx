import { PropsWithChildren, useEffect, useState } from "react";

interface PanelProps {
  title: string;
  open?: boolean;
  icon?: string;
  onIconClick?: () => void;
}

export function Toggable(props: PropsWithChildren<PanelProps>) {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  useEffect(() => {
    setIsOpen(!!props.open);
  }, [props.open]);

  function iconClickHandler(e: React.MouseEvent<HTMLElement>) {
    e.stopPropagation();
    props.onIconClick!();
  }

  return (
    <div className="p-5 rounded-lg bg-gradient-to-r  from-green-500 to-sky-300 text-white">
      <div
        className="flex justify-between items-center"
        onClick={() => setIsOpen((o) => !o)}
      >
        <div className="text-xl">{props.title}</div>
        {props.icon && <div onClick={iconClickHandler}>{props.icon}</div>}
      </div>
      {isOpen && <div>{props.children}</div>}
    </div>
  );
}
