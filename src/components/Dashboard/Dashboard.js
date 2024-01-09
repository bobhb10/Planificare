import { DashboardContext } from "../../store/dashboard-open-context";
import { BsArrowLeftShort } from "react-icons/bs";
import { useState, useEffect } from "react";
import logo from '../../Items/logo.jpg'
import Menu from "./Menu";
import MaterialeForm from "../FormElements/MaterialeForm";
import DisponibilitateForm from "../FormElements/DisponibilitateForm";
import Articole from "../Pages/Articole";
import Categorii from "../Pages/Categorii";
import FratiDisponibili from "../Pages/FratiDisponibili";



const Dashboard = () => {
  const [open, setOpen] = useState(true);
  const [selectedMenuItem, setSelectedMenuItem] = useState(5);


  const handleMenuClick = (itemIndex) => {
    setSelectedMenuItem(itemIndex);
  };
  const menuTitles = ["Introducere Materiale", "Disponibilitate", "Categorii noi", "Articole", "Fratii disponibili", "Planificare"];

  return (
    <DashboardContext.Provider value={open}>
      <div className="flex">
        <div className={`bg-dark-purple h-screen p-5 pt-8 ${open ? "w-72" : "w-20"} duration-200 relative`}>
          <BsArrowLeftShort
            className={`bg-white text-dark-purple text-3xl rounded-full absolute -right-3 top-9 border border-dark-purple cursor-pointer ${!open && "rotate-180"}`}
            onClick={() => {
              setOpen(!open);
            }}
          />
          <div className="inline-flex ">
            <img
              src={logo}
              alt="Logo"
              className={`text-4xl rounded cursor-pointer block flaot-left h-8 w-8 mr-2 duration-300 ${open && "rotate-[360deg]"}`}
            />
            <h1 className={`text-white origin-left font-medium text-2xl duration-300 ${!open && "scale-0"}`}>Optiuni</h1>
          </div>
          <Menu onMenuClick={handleMenuClick} />
        </div>

        <div className="p-7  transition-all duration-500">
          <h1 className="text-2xl font-semibold">
            {selectedMenuItem !== null ? menuTitles[selectedMenuItem] : "Optiuni"}
          </h1>
          {selectedMenuItem === 0 && <MaterialeForm />}
          {selectedMenuItem === 1 && <DisponibilitateForm />}
          {selectedMenuItem === 2 && <Categorii />}
          {selectedMenuItem === 3 && <Articole />}
          {selectedMenuItem === 4 && <FratiDisponibili />}
        </div>
      </div>
    </DashboardContext.Provider>
  );
};

export default Dashboard;
