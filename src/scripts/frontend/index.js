import { createRoot } from '@wordpress/element';
import SpinWheel from './components/SpinWheel';
import '../../styles/frontend.scss';

const container = document.getElementById('spin-the-wheel-frontend');
const root = createRoot(container);
root.render(<SpinWheel />);