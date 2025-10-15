// seedHospitals.js
const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://22csec03_db_user:IPPqLpSUe0LurJkk@cluster0.30lj2xn.mongodb.net/policycare?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const hospitalData = [
  // ------------------ Apollo Hospital Madurai ------------------
  {
    hospitalName: "Apollo Hospital Madurai",
    address: "NH44, Mattuthavani, Madurai, Tamil Nadu",
    location: { type: "Point", coordinates: [78.1235, 9.9231] },
    insuranceProvider: "Star Health",
    policyName: "Family Health Optima",
    coverageType: "Family Floater",
    cashlessAvailable: "Yes",
    maxClaimAmount: 500000,
    claimProcessTime: 7,
    treatmentsCovered: [
      "Appendectomy",
      "Cardiology Surgery",
      "Knee Replacement",
      "Chemotherapy",
      "Maternity Care",
      "General Surgery",
      "Dialysis",
      "X-ray",
      "Orthopedic Surgery",
      "Bariatric Surgery",
      "Plastic Surgery",
      "Kidney Treatment",
      "Pregnancy Care",
      "Skin Treatment",
      "Brain Surgery",
      "Neurology",
      "Dental",
      "Eye",
      "ENT",
      "Emergency Surgery"
    ]
  },
  {
    hospitalName: "Apollo Hospital Madurai",
    address: "NH44, Mattuthavani, Madurai, Tamil Nadu",
    location: { type: "Point", coordinates: [78.1235, 9.9231] },
    insuranceProvider: "ICICI Lombard",
    policyName: "Health Protect",
    coverageType: "Individual",
    cashlessAvailable: "Yes",
    maxClaimAmount: 300000,
    claimProcessTime: 5,
    treatmentsCovered: [
      "Appendectomy",
      "Emergency Surgery",
      "Dialysis",
      "X-ray",
      "Minor Surgery",
      "Cardiology",
      "Orthopedics",
      "Neurology",
      "Dental",
      "Eye",
      "ENT",
      "Pregnancy Care",
      "Skin Treatment",
      "Brain Surgery",
      "Kidney Treatment"
    ]
  },

  // ------------------ Velammal Hospital Madurai ------------------
  {
    hospitalName: "Velammal Hospital",
    address: "Alagar Koil Rd, Madurai, Tamil Nadu",
    location: { type: "Point", coordinates: [78.1102, 9.9400] },
    insuranceProvider: "Star Health",
    policyName: "Family Health Optima",
    coverageType: "Family Floater",
    cashlessAvailable: "Yes",
    maxClaimAmount: 400000,
    claimProcessTime: 6,
    treatmentsCovered: [
      "Appendectomy",
      "Physiotherapy",
      "Maternity Care",
      "Dental Surgery",
      "General Surgery",
      "Emergency Surgery",
      "Cardiology",
      "Neurology",
      "Orthopedics",
      "Pediatric Care",
      "Kidney Treatment",
      "Pregnancy Care",
      "Skin Treatment",
      "Eye",
      "ENT",
      "Dialysis",
      "X-ray",
      "Brain Surgery"
    ]
  },
  {
    hospitalName: "Velammal Hospital",
    address: "Alagar Koil Rd, Madurai, Tamil Nadu",
    location: { type: "Point", coordinates: [78.1102, 9.9400] },
    insuranceProvider: "SBI General",
    policyName: "Arogya Supreme",
    coverageType: "Individual",
    cashlessAvailable: "Yes",
    maxClaimAmount: 250000,
    claimProcessTime: 5,
    treatmentsCovered: [
      "Appendectomy",
      "Emergency Surgery",
      "X-ray",
      "Minor Surgery",
      "Dialysis",
      "Cardiology",
      "Orthopedics",
      "Neurology",
      "Dental",
      "Eye",
      "ENT",
      "Pregnancy Care",
      "Skin Treatment",
      "Brain Surgery",
      "Kidney Treatment"
    ]
  },

  // ------------------ Rajamani Hospital Madurai ------------------
  {
    hospitalName: "Rajamani Hospital",
    address: "North Veli St, Madurai, Tamil Nadu",
    location: { type: "Point", coordinates: [78.1190, 9.9312] },
    insuranceProvider: "Star Health",
    policyName: "Family Health Optima",
    coverageType: "Family Floater",
    cashlessAvailable: "Yes",
    maxClaimAmount: 450000,
    claimProcessTime: 7,
    treatmentsCovered: [
      "Appendectomy",
      "Emergency Surgery",
      "General Surgery",
      "X-ray",
      "Dialysis",
      "Maternity Care",
      "Cardiology",
      "Orthopedics",
      "Neurology",
      "Dental",
      "Eye",
      "ENT",
      "Pregnancy Care",
      "Skin Treatment",
      "Brain Surgery",
      "Kidney Treatment"
    ]
  },
  {
    hospitalName: "Rajamani Hospital",
    address: "North Veli St, Madurai, Tamil Nadu",
    location: { type: "Point", coordinates: [78.1190, 9.9312] },
    insuranceProvider: "HDFC ERGO",
    policyName: "My Health Suraksha",
    coverageType: "Individual",
    cashlessAvailable: "Yes",
    maxClaimAmount: 300000,
    claimProcessTime: 6,
    treatmentsCovered: [
      "Appendectomy",
      "Maternity Care",
      "Dental Surgery",
      "Minor Surgery",
      "Cardiology",
      "Orthopedics",
      "Neurology",
      "Dental",
      "Eye",
      "ENT",
      "Pregnancy Care",
      "Skin Treatment",
      "Brain Surgery",
      "Kidney Treatment",
      "Emergency Surgery"
    ]
  },

  // ------------------ Government Rajaji Hospital Madurai ------------------
  {
    hospitalName: "Government Rajaji Hospital",
    address: "Panagal Road, Madurai, Tamil Nadu",
    location: { type: "Point", coordinates: [78.1304, 9.9269] },
    insuranceProvider: "Tamil Nadu Government Health Scheme",
    policyName: "Chief Minister's Comprehensive Health Insurance Scheme",
    coverageType: "Family Floater",
    cashlessAvailable: "Yes",
    maxClaimAmount: 500000,
    claimProcessTime: 7,
    treatmentsCovered: [
      "General Surgery",
      "Orthopedic Surgery",
      "Cardiology",
      "Neurology",
      "Pediatrics",
      "Obstetrics and Gynecology",
      "Emergency Medicine",
      "Dialysis",
      "Cancer Treatment",
      "Plastic Surgery",
      "Burns Care",
      "Trauma Care",
      "Mental Health Services",
      "Transgender Health Services",
      "Kidney Treatment",
      "Pregnancy Care",
      "Skin Treatment",
      "Brain Surgery",
      "Dental",
      "Eye",
      "ENT",
      "Emergency Surgery"
    ]
  }
];

async function seed() {
  try {
    await client.connect();
    const db = client.db("policycare");
    const collection = db.collection("hospitals");

    await collection.deleteMany({}); // clear old data
    const result = await collection.insertMany(hospitalData);

    console.log(`Inserted ${result.insertedCount} hospital records`);
    await client.close();
  } catch (err) {
    console.error(err);
  }
}

seed();
