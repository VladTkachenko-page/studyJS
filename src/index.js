'use strict'

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import tabs from './modules/tabs';
import slider from './modules/slider';
import team from './modules/team';
import calc from './modules/calc';
import sendForm from './modules/sendForm';

//timer
countTimer('31 december 2020');
//menu
toggleMenu();
//popup
togglePopUp();
//tabs
tabs();
//slider
slider();
//team
team();
//calc
calc(100);
//send-ajax-form
sendForm();