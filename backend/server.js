const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const admin = require('firebase-admin');

const serviceAccount = require('./config/fir-c72dd-firebase-adminsdk-yynpl-13936e073c.json'); 
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const auth = admin.auth();


app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
   
    const userRecord = await auth.getUserByEmail(email, password);
    res.json({ message: 'Login successful', user: userRecord });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(401).json({ message: 'Invalid credentials' });
  }
});


app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
   
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: name,
    });
    res.json({ message: 'Successfully registered', user: userRecord });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Failed to create user' });
  }
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});





