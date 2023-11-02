import {
  Facebook,
  Twitter,
  Instagram,
  MailOutline,
  Phone,
  Room,
} from '@material-ui/icons';

// objects footer

export const e = [
  {
    id: 21,
    route: '/products/medicines',
    name: 'Medicines',
  },
  {
    id: 22,
    route: '/cart',
    name: 'My Cart',
  },

  {
    id: 24,
    route: '/',
    name: 'My Account',
  },

  {
    id: 26,
    route: '/',
    name: 'Privacy Policy',
  },

  {
    id: 27,
    route: '/',
    name: 'Home',
  },
  {
    id: 28,
    route: '/',
    name: 'Terms',
  },
];

export const social = [
  {
    id: 31,
    icon: <Facebook />,
    platform: 'Facebook',
    color: '3B5999',
    link: 'https://www.facebook.com',
  },
  {
    id: 32,
    icon: <Twitter />,
    platform: 'Tiwtter',
    color: '55ACEE',
    link: 'https://www.twitter.com',
  },
  {
    id: 33,
    icon: <Instagram />,
    platform: 'Instagram',
    color: 'E4405F',
    link: 'https://www.instagram.com',
  },
];

export const contact = [
  {
    id: 331,
    icon: <Room style={{ marginRight: '10px' }} />,
    text: '333 Maja, Lublin',
    url: 'https://osm.org/go/N2AIN--?m=',
  },
  {
    id: 332,
    icon: <Phone style={{ marginRight: '10px' }} />,
    text: '+48 666 777 888',
    url: '',
  },
  {
    id: 333,
    icon: <MailOutline style={{ marginRight: '10px' }} />,
    text: 'eaptekasup@eapteka.com',
    url: 'mailto:eaptekasup@eapteka.com',
  },
];
