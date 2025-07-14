# Media App

## Overview

This is an application for storing a movie, tv show and course library. It allows you to store metadata about these items, including local images and videos and play them. I made this because i watch something all the time (movies and tv shows during the holiday, and lecture replayes during the school year) so i wanted to keep track of it. The app is written in
TypeScript and uses Node for the (self hosted) backend and React + Electron for the frontend.

## Table of contents

1. [Requirements and usage](#requirements-and-usage)
   - [Requirements](#requirements)
   - [Usage](#usage)
2. [Features](#features)
   - [Movies](#movies)
   - [TV shows](#tv-shows)
   - [Courses](#courses)

## Requirements and usage

### Requirements

To use this app, you need:
1. [NPM and Node.js](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
2. [Docker compose](https://docs.docker.com/compose/install/) to build the server and client containers.

### Usage

1. Clone this repository: `git clone https://github.com/Igor-Lacko/media-player`.
2. In it's root folder, run `bash build-containers.sh` to build docker containers.
3. Run `bash media-app.sh` to run the app.<br>

*Note: You may need to set `sudo sysctl -w kernel.apparmor_restrict_unprivileged_userns=0` if you are using Ubuntu 24.04+ (https://github.com/electron/electron/issues/42510#issuecomment-2171583086). You can also run the app with `bash media-app.sh --no-sandbox instead` to disable chrome sandboxing.*

## Features
