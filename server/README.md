<h1>Knowledge Rockets Back-End Specification</h1>

<h2>Description</h2>
<p>This is the specification for the Knowledge Rockets back-end client.</p>

<h2>Getting Started</h2>
<p>These instructions will get you a copy of the project on your local machine for development and testing purposes.</p>

<h3>Prerequisites</h3>
<p>The following are the dependencies you will need: </p>

```
@sendgrid/mail
cors
cross-env
date-fns
dotenv
express
firebase
firebase-admin
helmet
jest
mongoose
mongoose-autopopulate
papaparse
stripe
supertest
yup
```

<h3>Installation</h3>
<p>Use yarn or npm to install all the development dependencies used in this project.</p>

`yarn install` or `npm install`

<p>Check to see the project has compiled successfully:</p>

`yarn start` or `npm start`

<p>Open the project locally with the url described as Database_Url in env</p>

<h2>Tests</h2>
<p>This project uses the jest and supertest testing suites. All server-side tests can be found in the tests directory.</p>

`yarn test` or `npm test`

<h3>.env Variables And You</h3>

```
Database_Url = MongoDB URL
TestDB_Url = Database used for Testing Back-End Functionality
Secret_Key = Stripe Secret Key
BASE_URL = Deployed Url for the Project
REACT_APP_PUBLIC_KEY = Stripe Public Key
REACT_APP_Stripe_Url = Stripe endpoint for Billing
REACT_APP_FIRE_API= Firebase Api Key
REACT_APP_FIRE_AUTH_DOMAIN = Firebase Auth Domain for the Project
REACT_APP_FIRE_DB_URL = Firebase Database Url that holds Users
REACT_APP_FIRE_PROJECT_ID = Firebase Project ID
REACT_APP_FIRE_SENDER_ID = Firebase Sender ID
REACT_APP_FIRE_STORAGE_BUCKET = Firebase Storage Bucket
SERVER_FIRE_CLIENT_EMAIL = Firebase Email for Client
SERVER_FIRE_PRIVATE_KEY = Firebase Private Key
SG_API_KEY = Sendgrid API Key
SG_TEMPLATE_ID = Sendgrid Template ID
TZ = Etc/UTC
```
