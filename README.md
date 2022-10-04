# [My Steam List](https://my-steam-list.netlify.app/)



## About

React webapp for gamers/steam users to track the status of the games in their library. Users will be able to import their list of games upon signup. Each game can be marked as:
  - Current
  - Completed
  - Dropped
  - Planning

However, on initial sign-up all games will be marked as 'Planning' by default.

## [Link to App](https://my-steam-list.netlify.app/)
*Hosted on Netlify*

## APIs Used
[Steam Web API](https://steamcommunity.com/dev), [PlayerDB](https://playerdb.co/), and [ElephantSQL](https://www.elephantsql.com/)

## Setup

For each folder, ```client``` and ```server```, run:
```sh
npm i
```

Create an `.env` file and enter the necessary credentials.

## NPM Commands
## Starting the front-end client

Within the ``client`` folder run:
```sh
npm start
```

## Starting the back-end server
Within the ``server`` folder run:
```sh
npm start
```

## Tech Stack
- PostgreSQL
- Express
- React
- Node

## Gallery
Logging In
![Logging in](https://github.com/Enired/my-steam/blob/master/docs/demonstration-gallery/login.gif)
Browsing Lists
![Browsing lists](https://github.com/Enired/my-steam/blob/master/docs/demonstration-gallery/browsing-lists.gif)
Updating List Entries
![Updating list entries](https://github.com/Enired/my-steam/blob/master/docs/demonstration-gallery/updating-list-items.gif)
Creating an account
![Signing-up](https://github.com/Enired/my-steam/blob/master/docs/demonstration-gallery/new-user-signup.gif)
Error messages
![Error messages](https://github.com/Enired/my-steam/blob/master/docs/demonstration-gallery/error-messages-and-misc.gif)




## Future Goals
  - Style app for desktop views. (Currently targeted towards mobile.)
  - Would like to be able to be able to have a page for every game on the Steam store so that users would be able to add games they do not own to thier list.
  - Add a way to reimport a user's steam list so that games they have purchased after they signed up for My Steam List will be added automatically
  - Add more stats to the profile page for individual users
  - Add ability for user's to log their game completion times
  - Add user credential encryption
  - Add ability to share a user's lists with others.

