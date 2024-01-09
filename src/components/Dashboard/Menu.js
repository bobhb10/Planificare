import MenuElement from './MenuElement'
import { useState } from "react";

const Menu = ({ onMenuClick }) => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);

  const handleItemClick = (index) => {
    setSelectedItemIndex(index);
    if (onMenuClick) {
      onMenuClick(index);
    }
  };

  return (
    <ul>
      <MenuElement title="Introducere Materiale" index={0} onClick={() => handleItemClick(0)} />
      <MenuElement title="Disponibilitate" index={1} onClick={() => handleItemClick(1)} />
      <MenuElement title="Categorii noi" index={2} onClick={() => handleItemClick(2)} />
      <MenuElement title="Articole" index={3} onClick={() => handleItemClick(3)} />
      <MenuElement title="Fratii disponibili" index={4} onClick={() => handleItemClick(4)} />
      <MenuElement title="Planificare" index={5} onClick={() => handleItemClick(5)} />
    </ul>
  );
};

export default Menu;