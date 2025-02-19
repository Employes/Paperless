import { addons } from '@storybook/addons';
import employes from './theme';

import './storybook.css';

addons.setConfig({
	theme: employes,
	showPanel: false,
});
