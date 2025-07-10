// === BACKEND (Express + MongoDB) ===
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// === Middleware ===
app.use(cors({
  origin: [
    'http://localhost:5173',               // ← ADD THIS LINE
    'http://localhost:5176',              // local dev
    'https://job-portal-9e7ab.web.app' ,
      'https://job-portal-9e7ab.firebaseapp.com'
  ],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// === JWT Middleware ===
const verifyJWT = (req, res, next) => {
  const token = req.cookies.jobToken;
  if (!token) return res.status(401).send({ message: 'Unauthorized: No token provided' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).send({ message: 'Forbidden: Invalid token' });
    req.user = decoded;
    next();
  });
};

// === MongoDB ===
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.efufbxu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
});

async function run() {
  try {
    await client.connect();
    const db = client.db('jobportaldb');
    const jobsCollection = db.collection('jobs');
    const jobApplicationCollection = db.collection('job_applications');

    app.get('/', (req, res) => res.send('Jobs are falling from the sky ☁️💼'));

    // === AUTH ===
    app.post('/jwt', (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.cookie('jobToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite:  process.env.NODE_ENV === "production" ? "none" : "strict"
      }).send({ success: true });
    });

    app.post('/logout', (req, res) => {
      res.clearCookie('jobToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite:  process.env.NODE_ENV === "production" ? "none" : "strict"
      }).send({ success: true, message: 'Logged out' });
    });

    // === JOB ROUTES ===
    app.get('/jobs', async (req, res) => {
      try {
        const jobs = await jobsCollection.find().toArray();
        res.send(jobs);
      } catch (err) {
        res.status(500).send({ message: 'Failed to fetch jobs', error: err.message });
      }
    });

    app.get('/jobs/:id', async (req, res) => {
      try {
        const job = await jobsCollection.findOne({ _id: new ObjectId(req.params.id) });
        res.send(job);
      } catch (err) {
        res.status(500).send({ message: 'Failed to fetch job', error: err.message });
      }
    });

    app.post('/jobs', verifyJWT, async (req, res) => {
      try {
        const job = req.body;
        const result = await jobsCollection.insertOne(job);
        res.send(result);
      } catch (err) {
        res.status(500).send({ message: 'Failed to add job', error: err.message });
      }
    });

    app.get('/jobs-by-hr', verifyJWT, async (req, res) => {
      const email = req.user.email;
      try {
        const jobs = await jobsCollection.find({ hr_email: email }).toArray();
        res.send(jobs);
      } catch (err) {
        res.status(500).send({ message: 'Failed to fetch HR jobs', error: err.message });
      }
    });

    // === JOB APPLICATION ROUTES ===
    app.post('/job-applications', verifyJWT, async (req, res) => {
      try {
        const { job_id, github, linkedin, cv_link } = req.body;
        const applicant_email = req.user.email;

        if (!job_id || !github || !linkedin || !cv_link) {
          return res.status(400).send({ message: 'Missing required fields.' });
        }

        const application = {
          job_id,
          applicant_email,
          github,
          linkedin,
          cv_link,
          applied_at: new Date()
        };

        const result = await jobApplicationCollection.insertOne(application);
        res.send(result);
      } catch (err) {
        res.status(500).send({ message: 'Failed to submit application', error: err.message });
      }
    });

    app.get('/job-applications', verifyJWT, async (req, res) => {
      try {
        const email = req.user.email;
        const { jobId } = req.query;
        const query = { applicant_email: email };
        if (jobId) query.job_id = jobId;

        const result = await jobApplicationCollection.find(query).toArray();
        res.send(result);
      } catch (err) {
        res.status(500).send({ message: 'Failed to fetch applications', error: err.message });
      }
    });

    app.get('/job-applications-count', verifyJWT, async (req, res) => {
      try {
        const pipeline = [
          { $group: { _id: '$job_id', count: { $sum: 1 } } }
        ];
        const result = await jobApplicationCollection.aggregate(pipeline).toArray();
        res.send(result);
      } catch (err) {
        res.status(500).send({ message: 'Failed to get application counts', error: err.message });
      }
    });

  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  }
}

run().catch(console.dir);
app.listen(port, () => {
  console.log(`🌐 Server running at http://localhost:${port}`);
});
