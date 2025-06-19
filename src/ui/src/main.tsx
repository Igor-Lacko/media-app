import { createRoot } from 'react-dom/client';
import { ReactNode } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import 'typeface-lobster';

import './index.css';
import MainPage from 'pages/main/main-page';
import HomePage from 'pages/home/home-page';
import MoviePage from 'pages/movies/movie-page';
import TvShowPage from 'pages/tv-shows/tv-show-page';
import LecturePage from 'pages/lectures/lecture-page';
import SettingsPage from 'pages/settings/settings-page';

const root = createRoot(document.getElementById('root') as HTMLElement);

// Todo other routes
const rootContainer : ReactNode = (
    <HashRouter>
        <Route path="/" element={<MainPage />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/movies" element={<MoviePage />} />
            <Route path="/tv-shows" element={<TvShowPage />} />
            <Route path="/lectures" element={<LecturePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route index element={<HomePage />} />
        </Route>
    </HashRouter>
)

root.render(<HashRouter> <MainPage/></HashRouter>);