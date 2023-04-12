import { Listbox, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { HiChevronUpDown } from "react-icons/hi2";

export interface Option {
  name: string;
  value: string;
}

export interface SelectProps {
  options: Option[];
  onChange?: (value: string) => void;
  placeholder?: string;
  defaultValue?: string;
  errorMessage?: string;
  label?: string;
}

const ErrorField = ({ errorMessage }: { errorMessage?: string }) => {
  return <p className="pt-2 text-md text-red-400">{errorMessage}</p>;
};

export const Select: React.FC<SelectProps> = ({
  defaultValue,
  onChange,
  options,
  placeholder,
  label,
}) => {
  const [selected, setSelected] = useState(defaultValue || "");

  const handleOnChange = (value: string) => {
    setSelected(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className="group">
      <p className="block mb-2 text-sm font-medium text-white">{label}</p>
      <div className="w-full">
        <Listbox
          as="div"
          className="bg-white rounded-lg z-50  w-full shadow  dark:bg-gray-700"
          value={selected}
          onChange={handleOnChange}
        >
          <div className="relative mt-1 w-full">
            <Listbox.Button className="relative placeholder-gray-400 w-full cursor-default rounded-lg py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
              <span className="block truncate">
                {selected ? selected : placeholder}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <HiChevronUpDown
                  className="h-5 w-5 placeholder-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="z-50 my-2 w-full flex flex-col p-2 absolute text-sm text-gray-200 bg-gray-700 overflow-y-scroll max-h-28">
                {options.map((option, index) => (
                  <Listbox.Option
                    className="flex cursor-pointer rounded gap-x-2 py-2 px-2 items-center w-full text-sm text-gray-300 hover:bg-black/20 hover:text-white"
                    key={index}
                    value={option.value}
                  >
                    {option.name}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
    </div>
  );
};
