import ReactDOM from 'react-dom/client';

// on importe le composant racine
import App from './components/App/App';

// le CSS global du projet
import './styles/index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
