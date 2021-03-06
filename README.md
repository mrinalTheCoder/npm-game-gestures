# game-gestures
Game gestures is an npm package for detecting hacks and slashes (using a hand tracking AI) for use by game developers.
## Usage
First, you must add the package as a dependency to a project.
* Using npm: `$ npm i game-gestures`
* Using yarn: `$ yarn add game-gestures`

Then, import the module in the code: `import * as gestures from "game-gestures";`

Load the model upon initialization: `const model = await gestures.loadModel();`
Also initialize an empty array to detect the slash: `let history = [];`

We must call the model in a loop to get the real-time location of the hand. (NOTE: Only 1 hand can be tracked at a time.)
`this.history = await gestures.makeDetection(net, video, this.history, true, 3);`

`gestures.makeDetection` take 5 inputs:
 - Model: the model loaded earlier
 - video: An HTML image or video object
 - history: The history array, tracking the last few positions of the hand.
 - flipImage: A boolean saying whether to flip the image horizontally.
 - maxHistory: An int specifying how many frames to keep in the history.
It returns the updated history object with the latest hand position. The hand position is an object with 2 properties, `x` and `y`.

`gestured.detectSlash` is a function to detect a slash motion, taking the history as an input. If a slash is detected, it returns an array `[true, slashStart, slashEnd]`. If there is no slash it returns an array `[false]`.

