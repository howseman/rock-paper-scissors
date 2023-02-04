# Rock, Paper, Scissors Game
This app consists of a monorepo with 3 main packages:
- client
- server
- shared

## Client

* React application with TypeScript
* Flat architecture used since serving a single domain: "The Game". For a bigger scope, a more domain oriented architecture could be used.

## Server

* Node.JS + Express API Server
* Realtime powered by socket.io library

* Next: Add TypeScript

## Shared

* Here will live all shared models and constants that are shared between client and server, tRPC could also be used.

* Not yet implemented

## Available features

* Two simultaneous players at a time in same room
* Pause / Resume game
* Best of N rounds (configurable when start the game)

## Coming features

* Multiple rooms
* Statistics
* Replay

## Nice to have

* LocalStorage could be a good option to store/sync the **game state** to not lose it on a window refresh
