import { getTripHandler, saveTripHandler } from './js/app';
import { getTripBtn, tripFormEle } from './js/domElements';
import './styles/main.scss';

//either button submit or form submit
getTripBtn.addEventListener('submit', getTripHandler);
tripFormEle.addEventListener('submit', getTripHandler);
