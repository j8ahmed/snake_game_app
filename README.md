# Vim Snake Game App

Practice your Vim navigation by playing this classic snake game using the Vim movement key bindings instead of the traditional arrow keys:

- `"k"` = Up
- `"j"` = Down
- `"l"` = Right
- `"h"` = Left

## Features

```
[x] Start screen
[x] Score board (current score, high score)

[x] Game Loop

    1. Set an interval using a ref (NOT a state variable) that moves the snake head whenever the snake direction or speed is changed
    2. Construct the main game loop that runs the collision detection and updates things accordingly whenever the snake's head position is updated
    3. Start loop once game state has changed from start to "game"

[x] Collision Detection

    1. Construct a function that runs all of the collision detection:
        - Collision with the walls
        - Collision with the food 
            - New food spawn after collision
            - update score
            - grow snake
        - Collision with the segments

[x] keyboard movement

    1. Establish the starting position of the snake
    2. Add event listeners for keypress events matching vim keybindings :)
    3. Add interval to keep track of direction and forces constant movement

[x] snake growth

    1. Construct an array to hold the positions of all the snake segments
    2. Iterate through the array to display each segment
    3. Add segments if the head collides with food. Add the segment to the front rather than the back so that there is no chance of a collision with a boundary or new food position.

[x] Random food spanning
    
    1. Use random number generation within the range of the twenty units both on x and y axes to place food on the board.
    
[x] incrementing game speed (increased difficulty)

    1. Increment game speed whenever food is picked up
    2. Potential improvement could also increment the game speed at set intervals but for now I will stick with just step #1.

```

## Bugs / Fixes

### Component rendering twice

This is caused by working in `StrictMode` in development. Each component is rendered twice to check for and notify the user of bugs. This does not persist in production. - [Reference answer - StackOverflow](https://stackoverflow.com/questions/60618844/react-hooks-useeffect-is-called-twice-even-if-an-empty-array-is-used-as-an-ar)

### Repeated state updates

this happened because I did not follow the rules of immutability. Be sure to copy the `segments` array into a new variable before performing operations on it like `push`, `pop`, `unshift`, etc. which change the Array itself rather than returning a new Array. I was doing this and that lead to wonky updates where I was adding one value to the `segments` array but whenever I updated the state it would get two new values.

Example of what not to do:

```js
setSegments(segments => {
    segments.push(segments[segments.length - 1])        // Add a filler piece to negate the removal of the tail with each snake movement
    return [...segments]
})
```

This is what you should be doing instead:

```js
setSegments(segments => {
    const newSegments = [...segments]
    newSegments.push(segments[segments.length - 1])        // Add a filler piece to negate the removal of the tail with each snake movement
    return newSegments
})
```
--- 

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


---

## Meta Data

Started On: 2023-12-20

### References:

- [Vanilla JavaScript Snake Game Tutorial Video - YouTube](https://youtu.be/uyhzCBEGaBY?feature=shared)
- []()
- []()
- []()
