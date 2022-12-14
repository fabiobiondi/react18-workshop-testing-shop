import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import clsx from "clsx";
import { Fragment } from "react";

export interface DropDownProps {
  defaultLabel: string;
  items: {
    label: string;
    action: () => void;
    Icon: React.FC;
  }[];
}

export default function DropDown(props: DropDownProps) {
  return (
    <Menu as="div" className="relative inline-block text-left ">
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
              {props.defaultLabel}
              <ChevronDownIcon
                className="-mr-1 ml-2 h-5 w-5"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>

          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              static
              className="origin-top-right absolute  z-50 right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
            >
              {props.items.map((item, index) => {
                const { Icon } = item;
                return (
                  <div className="py-1" key={index}>
                    <Menu.Item>
                      {({ active }) => (
                        <div
                          onClick={item.action}
                          className={clsx("group flex items-center px-4 py-2 text-sm", {
                            "bg-gray-100 text-gray-900": active,
                            "text-gray-700": !active,
                          })}
                        >
                          <Icon />
                          {item.label}
                        </div>
                      )}
                    </Menu.Item>
                  </div>
                );
              })}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
}
