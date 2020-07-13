# SHOPPING APP

## ABOUT

This app was created as a full practice exercise of the React Native tutorial of Acedemind.com.
The tutorial provided a 10mn video explaining the expected outcome of this app. I developped it based on this video, on my own (without watching the solution suggested in the rest of the module), to practice what I learned earlier in the tutorial.

## STRUCTURE

The App.js component calls an AppContainer component, because I needed to use the store to set the dimension and orientation of the whole app (and the Provider surrounds what is returned by App.js, so I couldn't use the store in App.js).