<h1>Knowledge Rockets Front-End Specification</h1>

```env
# REACT_APP_SERVER: Environment Variable for the Hosted Location of the server in heroku
# Ensure there is no trailing '/' at the end of the URL.
REACT_APP_SERVER=https://urlofserver.com
```

<h2>Description</h2>

<p>This is the specification for the Knowledge Rockets front-end client. Click here to see the specification for the back-end. Click here to see the project's general information.</p>

<h2>Getting Started</h2>
<p>These instructions will get you a copy of the project on your local machine for development and testing purposes.</p>

<h3>Prerequisites</h3>
<p>The following are the dependencies you will need: </p>

```
@material-ui/core
@material-ui/icons
axios
dotenv
enzyme
enzyme-adapter-react-16
firebase
formik
jest
material-ui
moment
moment-timezone
papaparse
react
react-dom
react-redux
react-router-dom
react-scripts
react-stripe-elements
react-test-renderer
redux
redux-logger
redux-thunk
styled-components
yup
```

<h3>Installation</h3>
<p>Use yarn or npm to install all the development dependencies used in this project.</p>

`yarn install` or `npm install`

<p>Check to see the project has compiled successfully:</p>

`yarn start`

<p>Open the project locally with the url described as Local</p>

<h2>Tests</h2>
<p>This project uses the jest and enzyme testing suites. All client-side tests can be found in the tests directory.</p>

<p>Run all tests within client/tests using: </p>

`yarn test` or `jest`

<h2>Front-End Routes</h2>

```
'/' is the Home Page
'/forgot' is the page to reset the password for an account
'/question/:cohort/:question/:student' is the endpoint for students to respond
'/question/thankyou' thanks user for their submission after completing a response rocket
'/rocket' passes the NavBar to all further routes.
'/rocket' includes the Rocket list component
'/rocket/auth' includes the Auth component which allows the user to sign in/up
'/rocket/billing' includes the Billing Form used for Account Upgrades
'/rocket/classes' includes the Cohort list component
'/rocket/classform/:id' views a single cohort
'/rocket/new' is the form for adding a new rocket to the Rocket list
'/rocket/newclass' is the form for adding a new cohort to the Cohort list
'/rocket/results' is the page for viewing Individual Knowledge Rocket results
'/rocket/settings' is the settings page for the application
'/rocket/view/:id' views a single rocket
```

<h2>Styled Component Notes</h2>

<h3>.env Variables And You</h3>

```
REACT_APP_FIRE_API= Firebase Api Key
REACT_APP_FIRE_AUTH_DOMAIN = Firebase Auth Domain for the Project
REACT_APP_FIRE_DB_URL = Firebase Database Url that holds Users
REACT_APP_FIRE_PROJECT_ID = Firebase Project ID
REACT_APP_FIRE_SENDER_ID = Firebase Sender ID
REACT_APP_FIRE_STORAGE_BUCKET = Firebase Storage Bucket
REACT_APP_PUBLIC_KEY = Stripe Public Key
REACT_APP_SERVER = Deployed Url for the Project
REACT_APP_Stripe_Url = Stripe endpoint for Billing
```
