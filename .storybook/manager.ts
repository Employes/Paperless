import { addons } from '@storybook/manager-api';
import employes from './theme';

import './storybook.css';

addons.setConfig({
	theme: employes,
	showPanel: false,
});
