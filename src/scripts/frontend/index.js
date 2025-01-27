import { createRoot } from '@wordpress/element';
import SpinWheel from './components/SpinWheel';
import '../../styles/frontend.css';

const container = document.getElementById('wpadminbar');
const root = createRoot(container);
root.render(<SpinWheel />); 