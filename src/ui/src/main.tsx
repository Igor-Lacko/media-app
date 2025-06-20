import { createRoot } from 'react-dom/client';
import { ReactNode } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import 'typeface-lobster';

import './index.css';
import MainPage from 'pages/main-page';
import HomePage from 'pages/home-page';
import MoviePage from 'pages/movie-page';
import TvShowPage from 'pages/tv-show-page';
import LecturePage from 'pages/lecture-page';
import SettingsPage from 'pages/settings-page';

const root = createRoot(document.getElementById('root') as HTMLElement);

const rootContainer : ReactNode = (
    <HashRouter>
        <Routes>
            <Route path="/" element={<MainPage />}>
                <Route index path="home" element={<HomePage />} />
                <Route path="movies" element={<MoviePage />} />
                <Route path="tv-shows" element={<TvShowPage />} />
                <Route path="lectures" element={<LecturePage />} />
                <Route path="settings" element={<SettingsPage />} />
            </Route>
        </Routes>
    </HashRouter>
)

root.render(rootContainer);