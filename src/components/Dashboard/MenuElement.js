import { BsFillCaretRightFill } from "react-icons/bs";
import { useContext } from "react";
import { DashboardContext, ElementSelected } from "../../store/dashboard-open-context";

const MenuElement = (props) => {
  const value = useContext(DashboardContext);

  const handleItemClick = () => {
    if (props.onClick) {
      props.onClick(props.index);
    }
  };

  return (
    <div>
      <li
        key={props.index}
        className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md"
        onClick={handleItemClick}
      >
        <span className="text-2xl block float-left">
          <BsFillCaretRightFill />
        </span>
        <span className={`text-base font-medium flex-1 duration-200 ${!value && "hidden"}`}>
          {props.title}
        </span>
      </li>
    </div>
  );
};

export default MenuElement;