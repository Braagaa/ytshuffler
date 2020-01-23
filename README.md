# YTShuffler

A React app that allows you to search your favourite music channels and plays music from them. It collects the 100 most recent songs uploaded or the 100 most popular (most viewed) songs on the channel, depending on your choice. The songs are then used to create a **random infinite playlist** shuffler and other more features which include:

- Randomly shuffle and play all channels
- Randomly shuffle and play a selected channel
- Randomly shuffle and play all genres found in your channels
- Play individual songs found in your channels
- Find individual artists in all your channels and randomly shuffle all their music
- Favourite channels
- Custom settings included

### Registration

This app requires a login and password, which can be created with the app. With that being said, **MongoDB is required for this app to run!**

### Channel Updates

Channels are updated in 2 ways:

1. Every time a user logs in, all channels are checked and updated if needed
2. When a channel playlist mode is changed the channel is updated to that playlist

Update dates are found in each individual channel view page.

### Player

The Player is found in the bottom right corner as a music note. You can click on it to open or close it anytime. The Player contains basic features found on most music players. Some note worthy features include:

- The channel name is displayed as well as the artist and the song name
- The video from YouTube is displayed and played on top when the Player is open
- There is no back button to go the previous song
- Seeking and skipping is available

### NOTES

This app was meant to find and play music channels on YouTube. It will play other channels not associated with music, but display naming of videos and artists may look odd.

------------------------------------------------------------------------------------------------------

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
