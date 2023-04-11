import {IMAGES} from '../Images';

interface DataMenu {
  value: string;
  icon: string;
  color: SVGFESpecularLightingElement;
}
export const dataMenu: DataMenu[] = [
  {
    value: 'water',
    icon: IMAGES.menuWater,
    color: '#2498D1',
  },
  {
    value: 'beer',
    icon: IMAGES.menuBeer,
    color: '#44CD40',
  },
  {
    value: 'coffee',
    icon: IMAGES.menuCoffee,
    color: '#404FCD',
  },
  {
    value: 'milkTea',
    icon: IMAGES.menuMilkTea,
    color: '#EBD22F',
  },
  {
    value: 'juice',
    icon: IMAGES.menuJuice,
    color: '#2F89A7',
  },
  {
    value: 'soda',
    icon: IMAGES.menuSoda,
    color: '#7E2FA7',
  },
  {
    value: 'milk',
    icon: IMAGES.menuMilk,
    color: '#7D3519',
  },
  {
    value: 'tea',
    icon: IMAGES.menuTea,
    color: '#F1B75B',
  },
  {
    value: 'wine',
    icon: IMAGES.menuWine,
    color: '#D1C2A9',
  },
  {
    value: 'coconut',
    icon: IMAGES.menuCoconut,
    color: '#7DC04C',
  },
];
