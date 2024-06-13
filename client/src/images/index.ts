// src/assets/images.ts

// Define the type for your images object
type Images = {
  [key: string]: string;
};

// Use TypeScript import syntax for better type safety
import logo from './logo.svg';
import zektorlogo from './zektor2logo.jpg'
import intro_desktop from './image-intro-desktop.jpg';
import intro_mobile from './image-intro-mobile.jpg';
import intro_left from './bg-pattern-intro-left-desktop.svg';
import intro_left_mobile from './bg-pattern-intro-left-mobile.svg';
import intro_right from './bg-pattern-intro-right-desktop.svg';
import intro_right_mobile from './bg-pattern-intro-right-mobile.svg';
import monitor from './1.jpg';
import capture from './2.jpg';
import ai from './3.jpg';
import ui from './4.jpg';

import works_desktop from './bg-pattern-how-we-work-desktop.svg';
import works_mobile from './bg-pattern-how-we-work-mobile.svg';
import fb from './icon-facebook.svg';
import twitter from './icon-twitter.svg';
import pinterest from './icon-pinterest.svg';
import insta from './icon-instagram.svg';
import footer from './bg-pattern-footer-desktop.svg';
import footer_mob from './bg-pattern-footer-mobile.svg';
import hamburger from './icon-hamburger.svg';

export const images: Images = {
  logo,
  zektorlogo,
  intro_desktop,
  intro_mobile,
  intro_left,
  intro_left_mobile,
  intro_right,
  intro_right_mobile,
  monitor,
  capture,
  ai,
  ui,
  works_desktop,
  works_mobile,
  fb,
  twitter,
  pinterest,
  insta,
  footer,
  footer_mob,
  hamburger,
};
