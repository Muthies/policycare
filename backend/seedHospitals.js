// seedHospitals.js
const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://22csec03_db_user:IPPqLpSUe0LurJkk@cluster0.30lj2xn.mongodb.net/policycare?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const hospitalData = [
  // ------------------ Government Rajaji Hospital (GRH) ------------------
  {
    hospitalName: "Government Rajaji Hospital",
    address: "Panagal Road, Madurai, Tamil Nadu",
    location: { type: "Point", coordinates: [78.1304, 9.9269] },
    insuranceProvider: "Tamil Nadu Government Health Scheme",
    policyName: "Chief Minister's Comprehensive Health Insurance Scheme (CMCHIS)",
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
    ],
    specialSchemes: [
      "Chief Minister's Comprehensive Health Insurance Scheme (CMCHIS)",
      "Innuyir Kappom – Nammai Kakkum 48",
      "Janani Shishu Suraksha Karyakram (JSSK)",
      "Rashtriya Bal Swasthya Karyakram (RBSK)",
      "Anemia Mukt Bharat"
    ]
  },

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
    ],
    acceptedInsurance: [
      "HDFC ERGO",
      "ICICI Lombard",
      "Star Health",
      "SBI General",
      "IFFCO Tokio",
      "Kotak Mahindra",
      "TATA AIG",
      "New India Assurance",
      "United India Insurance",
      "ManipalCigna",
      "Max Bupa (Niva Bupa)",
      "Bajaj Allianz",
      "Medi Assist",
      "MD India",
      "FHPL",
      "Paramount"
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
    ],
    acceptedInsurance: [
      "Acko Health Insurance",
      "Aditya Birla Health Insurance",
      "Bajaj Allianz",
      "Bharti AXA Health Insurance",
      "Care Health Insurance",
      "Future Generali India Insurance",
      "IFFCO TOKIO",
      "ICICI Lombard",
      "Medi Assist TPA Pvt. Ltd.",
      "Vidal Health Insurance TPA Pvt. Ltd.",
      "Niva Bupa",
      "Medsave Healthcare"
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

  // ------------------ Rajamani Hospital ------------------
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
    ],
    acceptedInsurance: [
      "MD India",
      "ICICI Lombard",
      "Star Health",
      "Aditya Birla",
      "SBI General",
      "IFFCO Tokio",
      "HDFC ERGO",
      "Niva Bupa",
      "Digit Insurance",
      "Personal & Caring Insurance"
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
  }
];

async function seed() {
  try {
    await client.connect();
    const db = client.db("policycare");
    const collection = db.collection("hospitals");

    await collection.deleteMany({});
    const result = await collection.insertMany(hospitalData);
    console.log(`✅ Inserted ${result.insertedCount} hospital records successfully`);
  } catch (err) {
    console.error("❌ Error seeding hospitals:", err);
  } finally {
    await client.close();
  }
}

seed();
