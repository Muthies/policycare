// seedHospitals.js
const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://22csec03_db_user:IPPqLpSUe0LurJkk@cluster0.30lj2xn.mongodb.net/policycare?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const hospitalData = [
  // ------------------ Rajamani Hospital ------------------
  { hospitalName: "Rajamani Hospital", insuranceProvider: "Star Health", policyName: "Family Health Optima", coverageType: "Family Floater", cashlessAvailable: "Yes", claimProcessTime: 7, treatmentsCovered: ["ECG", "Cancer Treatment", "Surgery", "Maternity"] },
  { hospitalName: "Rajamani Hospital", insuranceProvider: "ICICI Lombard", policyName: "Health Protect", coverageType: "Individual", cashlessAvailable: "Yes", claimProcessTime: 5, treatmentsCovered: ["ECG", "Dental", "Vaccination", "General Checkup"] },
  { hospitalName: "Rajamani Hospital", insuranceProvider: "SBI General", policyName: "Arogya Supreme", coverageType: "Family", cashlessAvailable: "Yes", claimProcessTime: 6, treatmentsCovered: ["Surgery", "Cancer Treatment", "Maternity", "Physiotherapy"] },
  { hospitalName: "Rajamani Hospital", insuranceProvider: "HDFC ERGO", policyName: "My Health Suraksha", coverageType: "Individual", cashlessAvailable: "Yes", claimProcessTime: 4, treatmentsCovered: ["ECG", "General Checkup", "Vaccination"] },
  { hospitalName: "Rajamani Hospital", insuranceProvider: "Aditya Birla Health", policyName: "Activ Health Platinum", coverageType: "Family", cashlessAvailable: "Yes", claimProcessTime: 7, treatmentsCovered: ["Surgery", "Cancer Treatment", "Maternity", "Dental"] },
  { hospitalName: "Rajamani Hospital", insuranceProvider: "IFFCO Tokio", policyName: "Health Protector Plus", coverageType: "Individual", cashlessAvailable: "Yes", claimProcessTime: 5, treatmentsCovered: ["ECG", "Vaccination", "Dental"] },
  { hospitalName: "Rajamani Hospital", insuranceProvider: "Niva Bupa", policyName: "ReAssure 2.0", coverageType: "Family", cashlessAvailable: "Yes", claimProcessTime: 6, treatmentsCovered: ["Cancer Treatment", "Surgery", "Maternity"] },
  { hospitalName: "Rajamani Hospital", insuranceProvider: "Digit Insurance", policyName: "Health Care Plus", coverageType: "Family", cashlessAvailable: "Yes", claimProcessTime: 4, treatmentsCovered: ["ECG", "General Checkup"] },
  { hospitalName: "Rajamani Hospital", insuranceProvider: "Bajaj Allianz", policyName: "Health Guard", coverageType: "Family", cashlessAvailable: "Yes", claimProcessTime: 5, treatmentsCovered: ["Surgery", "Cancer Treatment"] },
  { hospitalName: "Rajamani Hospital", insuranceProvider: "Reliance Health", policyName: "Health Gain Plus", coverageType: "Individual", cashlessAvailable: "Yes", claimProcessTime: 6, treatmentsCovered: ["ECG", "General Checkup"] },
  { hospitalName: "Rajamani Hospital", insuranceProvider: "Future Generali", policyName: "Health Total", coverageType: "Family Floater", cashlessAvailable: "Yes", claimProcessTime: 7, treatmentsCovered: ["Surgery", "Cancer Treatment", "Maternity"] },
  { hospitalName: "Rajamani Hospital", insuranceProvider: "New India Assurance", policyName: "Mediclaim Policy", coverageType: "Individual", cashlessAvailable: "Yes", claimProcessTime: 5, treatmentsCovered: ["ECG", "Dental"] },
  { hospitalName: "Rajamani Hospital", insuranceProvider: "Oriental Insurance", policyName: "Happy Family Floater", coverageType: "Family", cashlessAvailable: "Yes", claimProcessTime: 6, treatmentsCovered: ["Surgery", "Cancer Treatment"] },
  { hospitalName: "Rajamani Hospital", insuranceProvider: "United India Insurance", policyName: "Health Insurance Gold", coverageType: "Family", cashlessAvailable: "Yes", claimProcessTime: 4, treatmentsCovered: ["ECG", "Vaccination"] },
  { hospitalName: "Rajamani Hospital", insuranceProvider: "Tata AIG", policyName: "MediCare Plus", coverageType: "Individual", cashlessAvailable: "Yes", claimProcessTime: 5, treatmentsCovered: ["General Checkup", "Dental"] },
  { hospitalName: "Rajamani Hospital", insuranceProvider: "Care Health", policyName: "Care Advantage", coverageType: "Family Floater", cashlessAvailable: "Yes", claimProcessTime: 7, treatmentsCovered: ["Surgery", "Cancer Treatment", "Maternity"] },
  { hospitalName: "Rajamani Hospital", insuranceProvider: "Chola MS", policyName: "Family Healthline", coverageType: "Individual", cashlessAvailable: "Yes", claimProcessTime: 6, treatmentsCovered: ["ECG", "General Checkup"] },
  { hospitalName: "Rajamani Hospital", insuranceProvider: "Liberty General", policyName: "Secure Health", coverageType: "Family", cashlessAvailable: "Yes", claimProcessTime: 5, treatmentsCovered: ["Surgery", "Cancer Treatment"] },
  { hospitalName: "Rajamani Hospital", insuranceProvider: "Manipal Cigna", policyName: "ProHealth Protect", coverageType: "Family Floater", cashlessAvailable: "Yes", claimProcessTime: 6, treatmentsCovered: ["Surgery", "Maternity"] },
  { hospitalName: "Rajamani Hospital", insuranceProvider: "Max Bupa", policyName: "Heartbeat Policy", coverageType: "Family", cashlessAvailable: "Yes", claimProcessTime: 4, treatmentsCovered: ["ECG", "Cancer Treatment"] },

  // ------------------ Velammal Hospital ------------------
  { hospitalName: "Velammal Hospital", insuranceProvider: "Star Health", policyName: "Family Health Optima", coverageType: "Family Floater", cashlessAvailable: "Yes", claimProcessTime: 7, treatmentsCovered: ["ECG", "Cancer Treatment", "Surgery", "Maternity"] },
  { hospitalName: "Velammal Hospital", insuranceProvider: "ICICI Lombard", policyName: "Health Protect", coverageType: "Individual", cashlessAvailable: "Yes", claimProcessTime: 5, treatmentsCovered: ["ECG", "Dental", "Vaccination", "General Checkup"] },
  { hospitalName: "Velammal Hospital", insuranceProvider: "SBI General", policyName: "Arogya Supreme", coverageType: "Family", cashlessAvailable: "Yes", claimProcessTime: 6, treatmentsCovered: ["Surgery", "Cancer Treatment", "Maternity", "Physiotherapy"] },
  { hospitalName: "Velammal Hospital", insuranceProvider: "HDFC ERGO", policyName: "My Health Suraksha", coverageType: "Individual", cashlessAvailable: "Yes", claimProcessTime: 4, treatmentsCovered: ["ECG", "General Checkup", "Vaccination"] },
  { hospitalName: "Velammal Hospital", insuranceProvider: "Aditya Birla Health", policyName: "Activ Health Platinum", coverageType: "Family", cashlessAvailable: "Yes", claimProcessTime: 7, treatmentsCovered: ["Surgery", "Cancer Treatment", "Maternity", "Dental"] },
  { hospitalName: "Velammal Hospital", insuranceProvider: "IFFCO Tokio", policyName: "Health Protector Plus", coverageType: "Individual", cashlessAvailable: "Yes", claimProcessTime: 5, treatmentsCovered: ["ECG", "Vaccination", "Dental"] },
  { hospitalName: "Velammal Hospital", insuranceProvider: "Niva Bupa", policyName: "ReAssure 2.0", coverageType: "Family", cashlessAvailable: "Yes", claimProcessTime: 6, treatmentsCovered: ["Cancer Treatment", "Surgery", "Maternity"] },
  { hospitalName: "Velammal Hospital", insuranceProvider: "Digit Insurance", policyName: "Health Care Plus", coverageType: "Family", cashlessAvailable: "Yes", claimProcessTime: 4, treatmentsCovered: ["ECG", "General Checkup"] },
  { hospitalName: "Velammal Hospital", insuranceProvider: "Bajaj Allianz", policyName: "Health Guard", coverageType: "Family", cashlessAvailable: "Yes", claimProcessTime: 5, treatmentsCovered: ["Surgery", "Cancer Treatment"] },
  { hospitalName: "Velammal Hospital", insuranceProvider: "Reliance Health", policyName: "Health Gain Plus", coverageType: "Individual", cashlessAvailable: "Yes", claimProcessTime: 6, treatmentsCovered: ["ECG", "General Checkup"] },
  { hospitalName: "Velammal Hospital", insuranceProvider: "Future Generali", policyName: "Health Total", coverageType: "Family Floater", cashlessAvailable: "Yes", claimProcessTime: 7, treatmentsCovered: ["Surgery", "Cancer Treatment", "Maternity"] },
  { hospitalName: "Velammal Hospital", insuranceProvider: "New India Assurance", policyName: "Mediclaim Policy", coverageType: "Individual", cashlessAvailable: "Yes", claimProcessTime: 5, treatmentsCovered: ["ECG", "Dental"] },
  { hospitalName: "Velammal Hospital", insuranceProvider: "Oriental Insurance", policyName: "Happy Family Floater", coverageType: "Family", cashlessAvailable: "Yes", claimProcessTime: 6, treatmentsCovered: ["Surgery", "Cancer Treatment"] },
  { hospitalName: "Velammal Hospital", insuranceProvider: "United India Insurance", policyName: "Health Insurance Gold", coverageType: "Family", cashlessAvailable: "Yes", claimProcessTime: 4, treatmentsCovered: ["ECG", "Vaccination"] },
  { hospitalName: "Velammal Hospital", insuranceProvider: "Tata AIG", policyName: "MediCare Plus", coverageType: "Individual", cashlessAvailable: "Yes", claimProcessTime: 5, treatmentsCovered: ["General Checkup", "Dental"] },
  { hospitalName: "Velammal Hospital", insuranceProvider: "Care Health", policyName: "Care Advantage", coverageType: "Family Floater", cashlessAvailable: "Yes", claimProcessTime: 7, treatmentsCovered: ["Surgery", "Cancer Treatment", "Maternity"] },
  { hospitalName: "Velammal Hospital", insuranceProvider: "Chola MS", policyName: "Family Healthline", coverageType: "Individual", cashlessAvailable: "Yes", claimProcessTime: 6, treatmentsCovered: ["ECG", "General Checkup"] },
  { hospitalName: "Velammal Hospital", insuranceProvider: "Liberty General", policyName: "Secure Health", coverageType: "Family", cashlessAvailable: "Yes", claimProcessTime: 5, treatmentsCovered: ["Surgery", "Cancer Treatment"] },
  { hospitalName: "Velammal Hospital", insuranceProvider: "Manipal Cigna", policyName: "ProHealth Protect", coverageType: "Family Floater", cashlessAvailable: "Yes", claimProcessTime: 6, treatmentsCovered: ["Surgery", "Maternity"] },
  { hospitalName: "Velammal Hospital", insuranceProvider: "Max Bupa", policyName: "Heartbeat Policy", coverageType: "Family", cashlessAvailable: "Yes", claimProcessTime: 4, treatmentsCovered: ["ECG", "Cancer Treatment"] },

  // ------------------ Apollo Hospital ------------------
  { hospitalName: "Apollo Hospital", insuranceProvider: "Star Health", policyName: "Family Health Optima", coverageType: "Family Floater", cashlessAvailable: "Yes", claimProcessTime: 7, treatmentsCovered: ["ECG", "Cancer Treatment", "Surgery", "Maternity"] },
  { hospitalName: "Apollo Hospital", insuranceProvider: "ICICI Lombard", policyName: "Health Protect", coverageType: "Individual", cashlessAvailable: "Yes", claimProcessTime: 5, treatmentsCovered: ["ECG", "Dental", "Vaccination", "General Checkup"] },
  { hospitalName: "Apollo Hospital", insuranceProvider: "SBI General", policyName: "Arogya Supreme", coverageType: "Family", cashlessAvailable: "Yes", claimProcessTime: 6, treatmentsCovered: ["Surgery", "Cancer Treatment", "Maternity", "Physiotherapy"] },
  { hospitalName: "Apollo Hospital", insuranceProvider: "HDFC ERGO", policyName: "My Health Suraksha", coverageType: "Individual", cashlessAvailable: "Yes", claimProcessTime: 4, treatmentsCovered: ["ECG", "General Checkup", "Vaccination"] },
  { hospitalName: "Apollo Hospital", insuranceProvider: "Aditya Birla Health", policyName: "Activ Health Platinum", coverageType: "Family", cashlessAvailable: "Yes", claimProcessTime: 7, treatmentsCovered: ["Surgery", "Cancer Treatment", "Maternity", "Dental"] },
  { hospitalName: "Apollo Hospital", insuranceProvider: "IFFCO Tokio", policyName: "Health Protector Plus", coverageType: "Individual", cashlessAvailable: "Yes", claimProcessTime: 5, treatmentsCovered: ["ECG", "Vaccination", "Dental"] },
  { hospitalName: "Apollo Hospital", insuranceProvider: "Niva Bupa", policyName: "ReAssure 2.0", coverageType: "Family", cashlessAvailable: "Yes", claimProcessTime: 6, treatmentsCovered: ["Cancer Treatment", "Surgery", "Maternity"] },
  { hospitalName: "Apollo Hospital", insuranceProvider: "Digit Insurance", policyName: "Health Care Plus", coverageType: "Family", cashlessAvailable: "Yes", claimProcessTime: 4, treatmentsCovered: ["ECG", "General Checkup"] },
  { hospitalName: "Apollo Hospital", insuranceProvider: "Bajaj Allianz", policyName: "Health Guard", coverageType: "Family", cashlessAvailable: "Yes", claimProcessTime: 5, treatmentsCovered: ["Surgery", "Cancer Treatment"] },
  { hospitalName: "Apollo Hospital", insuranceProvider: "Reliance Health", policyName: "Health Gain Plus", coverageType: "Individual", cashlessAvailable: "Yes", claimProcessTime: 6, treatmentsCovered: ["ECG", "General Checkup"] },
  { hospitalName: "Apollo Hospital", insuranceProvider: "Future Generali", policyName: "Health Total", coverageType: "Family Floater", cashlessAvailable: "Yes", claimProcessTime: 7, treatmentsCovered: ["Surgery", "Cancer Treatment", "Maternity"] },
  { hospitalName: "Apollo Hospital", insuranceProvider: "New India Assurance", policyName: "Mediclaim Policy", coverageType: "Individual", cashlessAvailable: "Yes", claimProcessTime: 5, treatmentsCovered: ["ECG", "Dental"] },
  { hospitalName: "Apollo Hospital", insuranceProvider: "Oriental Insurance", policyName: "Happy Family Floater", coverageType: "Family", cashlessAvailable: "Yes", claimProcessTime: 6, treatmentsCovered: ["Surgery", "Cancer Treatment"] },
  { hospitalName: "Apollo Hospital", insuranceProvider: "United India Insurance", policyName: "Health Insurance Gold", coverageType: "Family", cashlessAvailable: "Yes", claimProcessTime: 4, treatmentsCovered: ["ECG", "Vaccination"] },
  { hospitalName: "Apollo Hospital", insuranceProvider: "Tata AIG", policyName: "MediCare Plus", coverageType: "Individual", cashlessAvailable: "Yes", claimProcessTime: 5, treatmentsCovered: ["General Checkup", "Dental"] },
  { hospitalName: "Apollo Hospital", insuranceProvider: "Care Health", policyName: "Care Advantage", coverageType: "Family Floater", cashlessAvailable: "Yes", claimProcessTime: 7, treatmentsCovered: ["Surgery", "Cancer Treatment", "Maternity"] },
  { hospitalName: "Apollo Hospital", insuranceProvider: "Chola MS", policyName: "Family Healthline", coverageType: "Individual", cashlessAvailable: "Yes", claimProcessTime: 6, treatmentsCovered: ["ECG", "General Checkup"] },
  { hospitalName: "Apollo Hospital", insuranceProvider: "Liberty General", policyName: "Secure Health", coverageType: "Family", cashlessAvailable: "Yes", claimProcessTime: 5, treatmentsCovered: ["Surgery", "Cancer Treatment"] },
  { hospitalName: "Apollo Hospital", insuranceProvider: "Manipal Cigna", policyName: "ProHealth Protect", coverageType: "Family Floater", cashlessAvailable: "Yes", claimProcessTime: 6, treatmentsCovered: ["Surgery", "Maternity"] },
  { hospitalName: "Apollo Hospital", insuranceProvider: "Max Bupa", policyName: "Heartbeat Policy", coverageType: "Family", cashlessAvailable: "Yes", claimProcessTime: 4, treatmentsCovered: ["ECG", "Cancer Treatment"] }
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