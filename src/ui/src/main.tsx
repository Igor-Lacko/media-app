import { createRoot } from 'react-dom/client';
import HomePage from 'pages/home/home-page';
import { ReactNode } from 'react';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(<HomePage /> as ReactNode);