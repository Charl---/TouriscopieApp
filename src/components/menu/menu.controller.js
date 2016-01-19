import menuData from './menu.json';

class MenuController {
  constructor() {
    'ngInject';
    this.name = 'menu';
    this.menuItems = menuData;
  }
}

export default MenuController;
