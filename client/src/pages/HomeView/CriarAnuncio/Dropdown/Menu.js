import { menuItems } from '../../../../utilities/menuItems';
import { teste } from '../../../../utilities/teste';
import MenuItems from './MenuItems';

const Menu = () => {
    return (
      <nav>
        <ul className="menus">
          {menuItems.map((menu, index) => {
            const depthLevel = 0;
            return <MenuItems items={menu} key={index} depthLevel={depthLevel} />;
          })}
        </ul>
      </nav>
    );
};
  
export default Menu;