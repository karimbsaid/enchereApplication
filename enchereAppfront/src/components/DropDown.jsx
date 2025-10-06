import {
  useState,
  useEffect,
  useRef,
  createContext,
  useContext,
  useCallback,
  cloneElement,
} from "react";
import { HiCheck, HiChevronDown } from "react-icons/hi2";
import Button from "./Button";

const DropDownContext = createContext();

const useDropDown = () => {
  const context = useContext(DropDownContext);
  if (!context) {
    throw new Error("DropDown components must be wrapped in <DropDown>");
  }
  return context;
};

const DropDown = ({ value, onValueChange, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState([]);
  const dropdownRef = useRef(null);

  const selectedItem = items.find((item) => item.value === value);

  const registerItem = useCallback((value, optionText) => {
    setItems((prev) => [...prev, { value, optionText }]);
    return () => {
      setItems((prev) => prev.filter((item) => item.value !== value));
    };
  }, []);

  const handleSelect = (value) => {
    setIsOpen(false);
    onValueChange(value);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const contextValue = {
    isOpen,
    setIsOpen,
    selectedItem,
    handleSelect,
    registerItem,
  };

  return (
    <DropDownContext.Provider value={contextValue}>
      <div className="relative inline-block w-[200px]" ref={dropdownRef}>
        {children}
      </div>
    </DropDownContext.Provider>
  );
};

const Trigger = ({ children }) => {
  const { isOpen, setIsOpen } = useDropDown();

  return cloneElement(children, { onClick: () => setIsOpen(!isOpen) });
};

const Window = ({ children }) => {
  const { isOpen } = useDropDown();

  if (!isOpen) return null;

  return (
    <div className="absolute mt-2 w-full top-8 bg-white border rounded-b-lg shadow-md z-2000">
      {children}
    </div>
  );
};

const Item = ({ value, children }) => {
  const { handleSelect } = useDropDown();

  return (
    <div
      className="px-4 py-2 hover:bg-gray-200 cursor-pointer flex items-center"
      onClick={() => handleSelect(value)}
    >
      {children}
    </div>
  );
};

DropDown.Trigger = Trigger;
DropDown.Window = Window;
DropDown.Item = Item;

export default DropDown;
