// seedHospitals.js

require("dotenv").config();
const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");

const uri = process.env.MONGO_URI;

if (!uri) {
  console.error("❌ MONGO_URI not found in .env file");
  process.exit(1);
}

const client = new MongoClient(uri);

const hospitalData = [
  {
    hospitalName: "Aravind Eye Hospital",
    hospitalUsername: "aravind",
    password: "12345",
    address: "Anna Nagar, Madurai, Tamil Nadu",
    location: { type: "Point", coordinates: [78.1304, 9.9269] },
    acceptedInsurance: [
      "Star Health",
      "HDFC ERGO",
      "Bajaj Allianz",
      "Apollo Munich",
      "IFFCO Tokio",
      "Universal Sompo",
      "Ayushman Bharat (PMJAY)"
    ],
    policyName: "Multi-Insurance & Government Schemes",
    coverageType: "Family Floater",
    claimProcessTime: 7,
    treatmentsCovered: [
      "Cataract Surgery",
      "Glaucoma Treatment",
      "Retina Services",
      "Diabetic Retinopathy",
      "Eye Diagnostics",
      "LASIK",
      "Refractive Surgery",
      "Cornea Treatment",
      "Pediatric Ophthalmology",
      "Oculoplasty",
      "Eye Infection Treatment",
      "Vision Correction",
      "Low Vision Care",
      "Emergency Eye Care"
    ]
  },
  {
    hospitalName: "Government Rajaji Hospital",
    hospitalUsername: "rajaji",
    password: "12345",
    address: "Panagal Road, Madurai, Tamil Nadu",
    location: { type: "Point", coordinates: [78.1190, 9.9312] },
    acceptedInsurance: [
      "Star Health",
      "Ayushman Bharat (PMJAY)",
      "CMCHIS (State Govt Scheme)"
    ],
    policyName: "Government Schemes",
    coverageType: "Family Floater",
    claimProcessTime: 7,
    treatmentsCovered: [
      "Emergency Care",
      "Trauma Care",
      "General Medicine",
      "General Surgery",
      "Cardiology",
      "Neurology",
      "Orthopedics",
      "ICU Care",
      "Emergency Eye Care",
      "Heart Treatment"
    ]
  },
  {
    hospitalName: "Apollo Hospital Madurai",
    hospitalUsername: "apollo",
    password: "12345",
    address: "NH44, Mattuthavani, Madurai, Tamil Nadu",
    location: { type: "Point", coordinates: [78.1235, 9.9231] },
    acceptedInsurance: [
      "Star Health",
      "HDFC ERGO",
      "ICICI Lombard",
      "SBI General",
      "Bajaj Allianz",
      "IFFCO Tokio",
      "United India Insurance"
    ],
    policyName: "Multi-Insurance",
    coverageType: "Family Floater",
    claimProcessTime: 7,
    treatmentsCovered: [
      "Emergency Services",
      "Critical Care",
      "ICU Care",
      "Cardiology",
      "Heart Surgery",
      "Neurology",
      "Orthopedics",
      "Oncology",
      "Dialysis",
      "Maternity Care",
      "Health Checkups"
    ]
  },
  {
    hospitalName: "Velammal Hospital",
    hospitalUsername: "velammal",
    password: "12345",
    address: "Alagar Koil Road, Madurai, Tamil Nadu",
    location: { type: "Point", coordinates: [78.1102, 9.9400] },
    acceptedInsurance: [
      "Star Health",
      "ICICI Lombard",
      "HDFC ERGO",
      "SBI General",
      "Bajaj Allianz"
    ],
    policyName: "Multi-Insurance",
    coverageType: "Family Floater",
    claimProcessTime: 6,
    treatmentsCovered: [
      "Emergency Services",
      "Trauma Care",
      "General Medicine",
      "Orthopedics",
      "Cardiology",
      "Gynecology",
      "ICU Care",
      "Diagnostics"
    ]
  },
  {
    hospitalName: "Rajamani Hospital",
    hospitalUsername: "rajamani",
    password: "12345",
    address: "North Veli Street, Madurai, Tamil Nadu",
    location: { type: "Point", coordinates: [78.1195, 9.9305] },
    acceptedInsurance: [
      "Star Health",
      "ICICI Lombard",
      "HDFC ERGO",
      "SBI General",
      "Bajaj Allianz"
    ],
    policyName: "Multi-Insurance",
    coverageType: "Individual",
    claimProcessTime: 7,
    treatmentsCovered: [
      "Emergency Care",
      "General Medicine",
      "Orthopedics",
      "Cardiology",
      "Dialysis",
      "ICU Care",
      "Diagnostics"
    ]
  }
];

async function seed() {
  try {
    console.log("🔄 Connecting to MongoDB...");
    await client.connect();

    const db = client.db("policycare");
    const collection = db.collection("hospitals");

    console.log("🗑 Deleting old hospital records...");
    await collection.deleteMany({});

    console.log("🔐 Hashing passwords...");
    for (let hospital of hospitalData) {
      hospital.password = await bcrypt.hash(hospital.password, 10);
    }

    console.log("📥 Inserting hospital records...");
    const result = await collection.insertMany(hospitalData);

    console.log("📍 Creating 2dsphere index...");
    await collection.createIndex({ location: "2dsphere" });

    console.log(`✅ Inserted ${result.insertedCount} hospital records successfully`);
  } catch (err) {
    console.error("❌ Error seeding hospitals:", err);
  } finally {
    await client.close();
    console.log("🔒 MongoDB connection closed");
  }
}

seed();