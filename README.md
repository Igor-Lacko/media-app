# Media App

## Overview

This is an application for storing a movie, tv show and course library. It allows you to store metadata about these items, including local images and videos and play them. I made this because i watch something all the time (movies and tv shows during the holiday, and lecture replayes during the school year) so i wanted to keep track of it. The app is written in
TypeScript and uses Node for the (self hosted) backend and React (with Tailwind CSS) + Electron for the frontend.

## Table of contents

1. [Requirements and usage](#requirements-and-usage)
    - [Requirements](#requirements)
    - [Usage](#usage)
2. [Features](#features)
    - [Movies](#movies)
    - [TV shows](#tv-shows)
    - [Courses](#courses)
    - [Other](#other)
3. [Notes](#notes)

## Requirements and usage

### Requirements

To use this app, you need [NPM and Node.js](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

### Usage

1. Clone this repository: `git clone https://github.com/Igor-Lacko/media-player`.
2. In it's root folder, run `bash scripts/install-packages.sh` and then `bash scripts/build.sh` to build the application.
3. Run the app either using `media-app` (or whatever name you gave the symlink), or manually through the `media-app` executable in the `src/electron/out/media-app.../` folder.
4. Alternatively, don't run the build script at all and run the app in dev mode using `npm run dev` (which will not use the same DB, if you have already ran it packaged) in the root folder of the repository.

_NOTE: If you are running on Ubuntu 24.04+ and you get the SUID error from electron, you may need to set `sudo sysctl -w kernel.apparmor_restrict_unprivileged_userns=0` for electron (https://github.com/electron/electron/issues/42510#issuecomment-2171583086). Alternatively you can run electron without the chromium sandbox with `npm run dev:no-sandbox`. This error was observed in dev mode, unsure whether it appears when the app is packaged as well._

### Updating

The app provides backup loading/storing in settings. To update, just backup to a JSON file, reclone the repo/rebuild the app and then load it.

## Features

### Movies

The app provides a interface to manage your movie library. Movies can be displayed/sorted/filtered, their metadata edited or added to favorites or to a to-watch list. Movies can be added manually or through the [OMDb API](https://www.omdbapi.com/) (requires a key which can be inputted in settings, otherwise the option will not be shown). You can add video files (or thumbnail images) to movies if you have them stored locally and play them directly in the app.

### Tv Shows

A similiar interface is provided for tv shows. Their seasons/episodes are separate models that can be edited/added. They can also be added manually or from an API, in this case the public [TVMaze API](https://www.tvmaze.com/api) which does not require a key. Video files can be added to individual episodes.

### Courses

Courses and their models are another models that can be added. You can also add notes to lectures, either when displaying their pages or when playing their video file. The note editor components have markdown support and the notes are displayed in markdown. If you add a note when playing a video file, it has a timestamp associated with it (the current video position when you added the note). The video can be set to that specific timestamp when clicked on it in the video player.

### Other

The app displays your currently watching movies/tv shows on the home page and plan-to-watch movies/tv shows. It also displays your favorite movies and tv shows and your last watched videos. The app also has dark mode (can be toggled in settings --> Dark Mode).

## Notes

- The repo contains a separate README.md with screenshots in _Screenshots/_<br>
- The app is limited when it comes video codecs to electron (chromium)'s support. See https://www.chromium.org/audio-video/ to display supported codecs.<br>
