// seedHospitals.js
const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://22csec15_db_user:policycare@cluster0.30lj2xn.mongodb.net/policycare?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const hospitalData = [
  // Aravind Eye Hospital
  {
    hospitalName: "Aravind Eye Hospital",
    hospitalId: "aravind",     // ✅ added
    password: "12345",         // ✅ added
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

  // Government Rajaji Hospital
  {
    hospitalName: "Government Rajaji Hospital",
    hospitalId: "rajaji",      // ✅ added
    password: "12345",         // ✅ added
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
      "Cornea Treatment",
      "General Medicine",
      "General Surgery",
      "Cardiology",
      "Neurology",
      "Neurosurgery",
      "Orthopedics",
      "Pediatrics",
      "Neonatal Care",
      "Obstetrics",
      "Gynecology",
      "Normal Delivery",
      "Cesarean Section",
      "ENT Treatment",
      "Dental Care",
      "Dermatology",
      "Psychiatry",
      "Pulmonology",
      "TB Treatment",
      "Dialysis",
      "ICU Care",
      "Critical Care",
      "Infectious Disease Treatment",
      "Cardiology",
      "Emergency Eye Care",
      "Heart Treatment"
    ]
  },

  // Apollo Hospital
  {
    hospitalName: "Apollo Hospital Madurai",
    hospitalId: "apollo",      // ✅ added
    password: "12345",         // ✅ added
    address: "NH44, Mattuthavani, Madurai, Tamil Nadu",
    location: { type: "Point", coordinates: [78.1235, 9.9231] },
    acceptedInsurance: [
      "Star Health",
      "HDFC ERGO",
      "ICICI Lombard",
      "Cornea Treatment",
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
      "Cornea Treatment",
      "Heart Surgery",
      "Emergency Eye Care",
      "Angioplasty",
      "Neurology",
      "Neurosurgery",
      "Orthopedics",
      "Joint Replacement",
      "Spine Surgery",
      "Oncology",
      "Chemotherapy",
      "Radiation Therapy",
      "Gastroenterology",
      "Liver Treatment",
      "Urology",
      "Kidney Stone Treatment",
      "Dialysis",
      "Maternity Care",
      "Normal Delivery",
      "Cesarean Section",
      "Neonatal ICU",
      "Pulmonology",
      "Diabetes Care",
      "General Surgery",
      "Laparoscopic Surgery",
      "Health Checkups"
    ]
  },

  // Velammal Hospital
  {
    hospitalName: "Velammal Hospital",
    hospitalId: "velammal",    // ✅ added
    password: "12345",         // ✅ added
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
      "General Surgery",
      "Emergency Eye Care",
      "Cornea Treatment",
      "Orthopedics",
      "Fracture Treatment",
      "Joint Replacement",
      "Cardiology",
      "Neurology",
      "Neurosurgery",
      "Pediatrics",
      "Neonatal Care",
      "Gynecology",
      "Obstetrics",
      "Normal Delivery",
      "Cesarean Section",
      "ENT Treatment",
      "Dermatology",
      "Pulmonology",
      "ICU Care",
      "Critical Care",
      "Diagnostics",
      "Cardiology",
      "Heart Treatment",
      "Radiology",
      "Laboratory Services"
    ]
  },

  // Rajamani Hospital
  {
    hospitalName: "Rajamani Hospital",
    hospitalId: "rajamani",    // ✅ added
    password: "12345",         // ✅ added
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
      "General Surgery",
      "Orthopedics",
      "Fracture Treatment",
      "Cardiology",
      "Diabetes Treatment",
      "Hypertension Treatment",
      "Pediatrics",
      "ENT Treatment",
      "Gynecology",
      "Normal Delivery",
      "Minor Surgeries",
      "Dialysis",
      "ICU Care",
      "Diagnostics",
      "Health Checkups",
      "Cardiology",
      "Heart Treatment"
    ]
  }
];

async function seed() {
  try {
    await client.connect();
    const db = client.db("policycare");
    const collection = db.collection("hospitals");

    await collection.deleteMany({});
    const result = await collection.insertMany(hospitalData);

    // ✅ CREATE GEO INDEX
    await collection.createIndex({ location: "2dsphere" });

    console.log(`✅ Inserted ${result.insertedCount} hospital records successfully`);
    console.log("✅ 2dsphere index created successfully");
  } catch (err) {
    console.error("❌ Error seeding hospitals:", err);
  } finally {
    await client.close();
  }
}

seed();