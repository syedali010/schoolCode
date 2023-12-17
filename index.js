const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/schoolDB', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Check for Database errors
db.on('error', (err) => {
  console.log(err);
});


app.use(bodyParser.json());

// MongoDB Schema
const schoolSchema = new mongoose.Schema({
  name: String,
  status: String,
  startTime: String,
  endTime: String,
  shift: String,
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address'
  },
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization'
  },
  hasProjector: Boolean,
  hasLaptop: Boolean
});

const addressSchema = new mongoose.Schema({
  town: String,
  tehsil: String,
  district: String,
  state: String,
  address: String,
  latitude: Number,
  longitude: Number
});

const organizationSchema = new mongoose.Schema({
  name: String
});

// MongoDB Models
const School = mongoose.model('School', schoolSchema);
const Address = mongoose.model('Address', addressSchema);
const Organization = mongoose.model('Organization', organizationSchema);

// POST endpoint to save JSON document
app.post('/api/school', async (req, res) => {
  try {
    const { name, status, startTime, endTime, shift, address, hasProjector, hasLaptop, organization } = req.body;

    
    const savedAddress = await new Address(address).save();

   
    const savedOrganization = await new Organization(organization).save();

    // Save school with references to address and organization
    const savedSchool = await new School({
      name,
      status,
      startTime,
      endTime,
      shift,
      address: savedAddress._id,
      organization: savedOrganization._id,
      hasProjector,
      hasLaptop
    }).save();

    // Update the School document with address and org IDs
    savedSchool.address = savedAddress._id;
    savedSchool.organization = savedOrganization._id;
    await savedSchool.save();

    res.json(savedSchool);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.put('/api/school/:id', async (req, res) => {
  try {
    const { name, status, startTime, endTime, shift, hasProjector, hasLaptop } = req.body;
    const schoolId = req.params.id;

    // Find school by ID
    const school = await School.findById(schoolId);

    // Update fields
    school.name = name;
    school.status = status;
    school.startTime = startTime;
    school.endTime = endTime;
    school.shift = shift;
    school.hasProjector = hasProjector;
    school.hasLaptop = hasLaptop;


    const updatedSchool = await school.save();

    res.json(updatedSchool);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// GET endpoint to get the JSON document by ID
app.get('/api/school/:id', async (req, res) => {
  try {
    const schoolId = req.params.id;
    const school = await School.findById(schoolId).populate('address organization');
    res.json(school);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// GET endpoint to get a list of all schools
app.get('/api/schools', async (req, res) => {
  try {
    const schools = await School.find().populate('address organization');
    res.json(schools);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// DELETE endpoint to delete the school document by ID
app.delete('/api/school/:id', async (req, res) => {
  try {
    const schoolId = req.params.id;
    await School.findByIdAndDelete(schoolId);
    res.send('School deleted successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Server start
app.listen(port, () => {
  console.log(`The Server is running on port ${port}`);
});
