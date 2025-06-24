import { createRoot } from 'react-dom/client';
import { ReactNode } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'typeface-lobster';

import './index.css';
import 'data/axios-config';
import MainPage from 'pages/main-page';
import HomePage from 'pages/home-page';
import MoviePage from 'pages/movie-page';
import TvShowPage from 'pages/tv-show-page';
import LecturePage from 'pages/lecture-page';
import SettingsPage from 'pages/settings-page';
import AddMoviePage from 'pages/forms/add-movie-page';
import AddTvShowPage from 'pages/forms/add-tv-show-page';
import AddSubjectPage from 'pages/forms/add-subject-page';

// React-query
const queryClient = new QueryClient();

const root = createRoot(document.getElementById('root') as HTMLElement);


const rootContainer : ReactNode = (
    <QueryClientProvider client={queryClient}>
        <HashRouter>
            <Routes>
                <Route path="/" element={<MainPage />}>
                    <Route index element={<HomePage />} />
                    <Route path="movies">
                        <Route index element={<MoviePage />} />
                        <Route path="add" element={<AddMoviePage />} />
                    </Route>
                    <Route path="tv-shows">
                        <Route index element={<TvShowPage />} />
                        <Route path="add" element={<AddTvShowPage />} />
                    </Route>
                    <Route path="lectures">
                        <Route index element={<LecturePage />} />
                        <Route path="add" element={<AddSubjectPage />} />
                    </Route>
                    <Route path="settings" element={<SettingsPage />} />
                </Route>
            </Routes>
        </HashRouter>
    </QueryClientProvider>
)

root.render(rootContainer);