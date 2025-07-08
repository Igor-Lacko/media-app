import { createRoot } from 'react-dom/client';
import { ReactNode } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'typeface-lobster';
import '@fontsource/roboto';

import './index.css';
import 'data/axios-config';
import MainPage from 'layouts/main-page-layout';
import HomePage from 'pages/index/home-page';
import MoviePage from 'pages/index/movie-page';
import TvShowPage from 'pages/index/tv-show-page';
import SubjectPage from 'pages/index/subject-page';
import SettingsPage from 'pages/index/settings-page';
import AddMoviePage from 'pages/forms/add-movie-page';
import AddTvShowPage from 'pages/forms/add-tv-show-page';
import AddSubjectPage from 'pages/forms/add-subject-page';
import MovieDetail from 'pages/detail/movie-detail';
import TvShowDetail from 'pages/detail/tv-show-detail';
import SubjectDetail from 'pages/detail/subject-detail';
import AddSeasonPage from 'pages/forms/add-season-page';
import AddLecturePage from 'pages/forms/add-lecture-page';
import SeasonDetail from 'pages/detail/season-detail';
import AddEpisodePage from 'pages/forms/add-episode-page';
import EpisodeDetail from 'pages/detail/episode-detail';
import LectureDetail from 'pages/detail/lecture-detail';
import LectureVideo from 'pages/video/lecture-video';
import EpisodeVideo from 'pages/video/episode-video';
import MovieVideo from 'pages/video/movie-video';

// React-query
const queryClient = new QueryClient();

const root = createRoot(document.getElementById('root') as HTMLElement);


const rootContainer: ReactNode = (
    <QueryClientProvider client={queryClient}>
        <HashRouter>
            <Routes>
                <Route path="/" element={<MainPage />}>
                    <Route index element={<HomePage />} />
                    <Route path="movies/*">
                        <Route index element={<MoviePage />} />
                        <Route path="add" element={<AddMoviePage />} />
                        <Route path=":id" element={<MovieDetail />} />
                        <Route path=":id/edit" element={<AddMoviePage />} />
                        <Route path=":id/play" element={<MovieVideo />} />
                    </Route>
                    <Route path="tv-shows/*">
                        <Route index element={<TvShowPage />} />
                        <Route path="add" element={<AddTvShowPage />} />
                        <Route path=":id" element={<TvShowDetail />} />
                        <Route path=":id/edit" element={<AddTvShowPage />} />
                        <Route path=":id/add" element={<AddSeasonPage />} />
                        <Route path=":id/:seasonId" element={<SeasonDetail />} />
                        <Route path=":id/:seasonId/edit" element={<AddSeasonPage />} />
                        <Route path=":id/:seasonId/add" element={<AddEpisodePage />} />
                        <Route path=":id/:seasonId/:episodeId" element={<EpisodeDetail />} />
                        <Route path=":id/:seasonId/:episodeId/edit" element={<AddEpisodePage />} />
                        <Route path=":id/:seasonId/:episodeId/play" element={<EpisodeVideo />} />
                    </Route>
                    <Route path="subjects/*">
                        <Route index element={<SubjectPage />} />
                        <Route path="add" element={<AddSubjectPage />} />
                        <Route path=":id" element={<SubjectDetail />} />
                        <Route path=":id/edit" element={<AddSubjectPage />} />
                        <Route path=":id/add" element={<AddLecturePage />} />
                        <Route path=":id/:lectureId" element={<LectureDetail />} />
                        <Route path=":id/:lectureId/edit" element={<AddLecturePage />} />
                        <Route path=":id/:lectureId/play" element={<LectureVideo />} />
                    </Route>
                    <Route path="settings/*" element={<SettingsPage />} />
                </Route>
            </Routes>
        </HashRouter>
    </QueryClientProvider>
)

root.render(rootContainer);