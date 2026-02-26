import React from "react";
import { useNavigate } from "react-router-dom";
import "../style.css";

const stepCardStyle = {
  backgroundColor: "#f9fcff",
  padding: "30px 25px",
  borderRadius: "14px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
  transition: "transform 0.3s",
};

const stepNumberStyle = {
  width: "50px",
  height: "50px",
  margin: "0 auto 20px",
  borderRadius: "50%",
  backgroundColor: "#1f3c88",
  color: "#fff",
  fontSize: "22px",
  fontWeight: "bold",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const stepTitleStyle = {
  fontSize: "20px",
  marginBottom: "12px",
  color: "#1f3c88",
};

const stepDescStyle = {
  fontSize: "16px",
  lineHeight: "1.6",
  color: "#444",
};


const Home = () => {
  const navigate = useNavigate();

  return (
    <div>

      {/* ===== TOP COLOR STRIP (NO TEXT) ===== */}
      

      {/* ===== NAVIGATION BAR ===== */}
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "25px 20px",
          backgroundColor: "linear-gradient(135deg, #74ebd5, #acb6e5)",
          borderBottom: "1px solid #ade9f1",
          height: "20px"
        }}
      >
        {/* Navigation Links */}
        <div
          style={{
            display: "flex",
            gap: "80px",
            fontSize: "19px",
            fontWeight: "600",
            margin: "0 auto"
          }}
        >
          <span 
  style={{ 
    cursor: "pointer", 
    color: "black", 
    fontSize: "21px",   // increased size
    letterSpacing: "0.5px"
  }} 
  onClick={() => navigate("/")}
>
  
</span>
<span style={{ cursor: "pointer", color: "black", fontSize: "21px", letterSpacing: "0.5px" }}>
  Home
</span>
<span style={{ cursor: "pointer", color: "black", fontSize: "21px", letterSpacing: "0.5px" }}>
  How it works
</span>

<span style={{ cursor: "pointer", color: "black", fontSize: "21px", letterSpacing: "0.5px" }}>
  Hospitals
</span>

<span style={{ cursor: "pointer", color: "black", fontSize: "21px", letterSpacing: "0.5px" }}>
  Policies
</span>

<span style={{ cursor: "pointer", color: "black", fontSize: "21px", letterSpacing: "0.5px" }}>
  Contact
</span>
        </div>

        {/* Login Icon */}
        <img
          src="https://thumbs.dreamstime.com/b/user-login-authenticate-icon-vector-personal-protection-internet-privacy-password-protected-security-key-pad-161621864.jpg"
          alt="login"
          onClick={() => navigate("/login")}
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            cursor: "pointer",
            objectFit: "cover",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
          }}
        />
      </nav>

      {/* ===== INTRO SECTION ===== */}
<section
  style={{
    display: "flex",
    alignItems: "center",
    padding: "70px 90px",
    gap: "50px",
    background: "linear-gradient(to right, #eef9ff, #f9fcff)"
  }}
>
  {/* Left Image */}
  <div style={{ flex: 0.9 }}>
    <img
      src="https://www.pbgh.org/wp-content/uploads/2022/03/Health-Care-Policy-720x405.png"
      alt="policycare-healthcare"
      style={{
        width: "90%",
        borderRadius: "12px",
        boxShadow: "0 6px 18px rgba(0,0,0,0.15)"
      }}
    />
  </div>

  {/* Right Content */}
  <div style={{ flex: 1.1 }}>
    <h2
      style={{
        fontSize: "34px",
        marginBottom: "18px",
        color: "#1f3c88"
      }}
    >
      Bringing transparency to health insurance decisions
    </h2>

    <p
      style={{
        fontSize: "17.5px",
        lineHeight: "1.75",
        color: "#333"
      }}
    >
      PolicyCare is a smart health insurance platform designed to
      address one of the most critical challenges faced by patients
      in India — the lack of real-time clarity on hospital and treatment
      coverage under their insurance policies.
    </p>

    <p
      style={{
        fontSize: "17.5px",
        lineHeight: "1.75",
        color: "#333"
      }}
    >
      The platform digitally maps insurance policies to empaneled
      hospitals and eligible medical services, enabling patients to
      instantly identify where their policy is accepted and what
      treatments are covered before seeking care.
    </p>

    <p
      style={{
        fontSize: "17.5px",
        lineHeight: "1.75",
        color: "#333"
      }}
    >
      By integrating AI-based hospital ranking and secure QR-enabled
      policy verification, PolicyCare reduces uncertainty, prevents
      service denial, and empowers patients to make informed and
      confident healthcare decisions.
    </p>
  </div>
</section>

{/* ===== HOW IT WORKS SECTION ===== */}
<section
  style={{
    padding: "80px 60px",
    backgroundColor: "#ffffff",
    textAlign: "center"
  }}
>
  <h2
    style={{
      fontSize: "36px",
      marginBottom: "15px",
      color: "#1f3c88"
    }}
  >
    How PolicyCare Works
  </h2>

  <p
    style={{
      fontSize: "18px",
      color: "#555",
      marginBottom: "60px"
    }}
  >
    A simple, transparent, and secure process designed around patient needs
  </p>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "40px"
    }}
  >
    {/* Step 1 */}
<div style={stepCardStyle}>
  <div style={stepNumberStyle}>1</div>
  <h4 style={stepTitleStyle}>User Registration / Login</h4>
  <p style={stepDescStyle}>
    New users sign up to create an account, while existing users securely log in 
    to access their personalized insurance dashboard.
  </p>
</div>

{/* Step 2 */}
<div style={stepCardStyle}>
  <div style={stepNumberStyle}>2</div>
  <h4 style={stepTitleStyle}>Enter Policy Details</h4>
  <p style={stepDescStyle}>
    The user enters their insurance policy ID to validate coverage and retrieve 
    associated benefits in real time.
  </p>
</div>

{/* Step 3 */}
<div style={stepCardStyle}>
  <div style={stepNumberStyle}>3</div>
  <h4 style={stepTitleStyle}>Search Treatment / Service</h4>
  <p style={stepDescStyle}>
    Users search for required treatments, surgeries, or medical services 
    covered under their insurance policy.
  </p>
</div>

{/* Step 4 */}
<div style={stepCardStyle}>
  <div style={stepNumberStyle}>4</div>
  <h4 style={stepTitleStyle}>Policy & Hospital Mapping</h4>
  <p style={stepDescStyle}>
    PolicyCare maps the selected treatment with empaneled hospitals 
    eligible under the user’s policy network.
  </p>
</div>

{/* Step 5 */}
<div style={stepCardStyle}>
  <div style={stepNumberStyle}>5</div>
  <h4 style={stepTitleStyle}>Location-Based Sorting</h4>
  <p style={stepDescStyle}>
    Hospitals are sorted automatically based on proximity to the user 
    using real-time geolocation and distance calculation.
  </p>
</div>

{/* Step 6 */}
<div style={stepCardStyle}>
  <div style={stepNumberStyle}>6</div>
  <h4 style={stepTitleStyle}>Review & Rating Filter</h4>
  <p style={stepDescStyle}>
    Users can filter and sort hospitals based on ratings, reviews, 
    and service quality to make informed decisions.
  </p>
</div>

{/* Step 7 */}
<div style={stepCardStyle}>
  <div style={stepNumberStyle}>7</div>
  <h4 style={stepTitleStyle}>AI-Based Hospital Ranking</h4>
  <p style={stepDescStyle}>
    An AI-driven weighted scoring model ranks hospitals based on 
    coverage, distance, availability, and patient ratings.
  </p>
</div>

{/* Step 8 */}
<div style={stepCardStyle}>
  <div style={stepNumberStyle}>8</div>
  <h4 style={stepTitleStyle}>Secure QR Verification</h4>
  <p style={stepDescStyle}>
    A secure encrypted QR code is generated and scanned by hospitals 
    to instantly verify eligibility and approve treatment without delay.
  </p>
</div>
</div>
</section>
{/* ===== HOSPITALS SECTION ===== */}
<section
  style={{
    padding: "80px 40px",
    backgroundColor: "#f5f9ff"
  }}
>
  <h2
    style={{
      textAlign: "center",
      fontSize: "36px",
      marginBottom: "10px",
      color: "#1f3c88"
    }}
  >
     Hospitals
  </h2>

  <p
    style={{
      textAlign: "center",
      fontSize: "18px",
      color: "#555",
      marginBottom: "50px"
    }}
  >
    Verified hospitals mapped with insurance policies for real-time coverage
  </p>

  <div className="hospital-scroll">
    {/* Apollo Hospital */}
    <div className="hospital-card">
      <img
        src="https://images.squarespace-cdn.com/content/v1/5bac99efb2cf79a76d80781d/4a1996c5-a042-47e1-90d3-f331a67bd961/June%2C+13%2C+2021+%2813%29.jpg"
        alt="Apollo Hospital"
      />
      <h4>Apollo Hospital</h4>
      <p>Multi-specialty hospital offering advanced diagnostics and treatment.</p>
      <span>📞 044-2829-3333</span>
    </div>

    {/* Velammal Hospital */}
    <div className="hospital-card">
      <img
        src="https://media.licdn.com/dms/image/v2/C560BAQFbZd7aAhwS9Q/company-logo_200_200/company-logo_200_200/0/1631352629918?e=2147483647&v=beta&t=Vsmxc3UrqiZczsRBrjmzbE-d1ZbWYAtrjQrJjQbqFH0"
        alt="Velammal Hospital"
      />
      <h4>Velammal Hospital</h4>
      <p>Trusted healthcare services with government insurance support.</p>
      <span>📞 0452-246-4000</span>
    </div>

    {/* Rajamani Hospital */}
    <div className="hospital-card">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjDm41ITNwel-vCjmoC3ie0yhtBiHDsxvfGQ&s"
        alt="Rajamani Hospital"
      />
      <h4>Rajamani Hospital</h4>
      <p>Affordable treatments with strong diagnostic and emergency care.</p>
      <span>📞 0452-233-7777</span>
    </div>

    {/* Aravind Eye Hospital */}
    <div className="hospital-card">
      <img
        src="https://www.eyedocs.co.uk/media/reviews/photos/original/0d/79/09/Aravind-40-1503389681.jpg"
        alt="Aravind Eye Hospital"
      />
      <h4>Aravind Eye Hospital</h4>
      <p>World-renowned eye care services with high policy acceptance.</p>
      <span>📞 0452-435-6100</span>
    </div>

    {/* Govt Rajaji Hospital */}
    <div className="hospital-card">
      <img
        src="https://static.wixstatic.com/media/dd61a7_6be63a0925e34b20a12636974a693a94~mv2.gif"
        alt="Govt Rajaji Hospital"
      />
      <h4>Govt. Rajaji Hospital</h4>
      <p>Government tertiary care hospital under public health schemes.</p>
      <span>📞 0452-253-5400</span>
    </div>
  </div>
</section>

{/* ===== POLICIES SECTION ===== */}
<section
  id="policies"
  style={{
    padding: "80px 40px",
    backgroundColor: "#f0f6ff"
  }}
>
  <h2
    style={{
      textAlign: "center",
      fontSize: "36px",
      marginBottom: "10px",
      color: "#1f3c88"
    }}
  >
    Insurance Policies
  </h2>

  <p
    style={{
      textAlign: "center",
      fontSize: "18px",
      color: "#555",
      marginBottom: "50px"
    }}
  >
    Explore the insurance policies accepted across hospitals
  </p>

  <div className="policy-scroll">
    {/* Star Health */}
    <div className="policy-card">
      <img
        src="https://play-lh.googleusercontent.com/JEcrbamGiWvHjDBubpjIfDAZ5-aqy-z1oDXag4XSDptHSYtGftWcH_sfENba-lSlBQ=w600-h300-pc0xffffff-pd"
        alt="Star Health"
      />
    </div>

    {/* ICICI */}
    <div className="policy-card">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgrgGcHf3lF1hiUcvFcVvmqSrfBasdewXxmQ&s"
        alt="ICICI Lombard"
      />
    </div>

    {/* Allianz */}
    <div className="policy-card">
      <img
        src="https://www.livelaw.in/h-upload/2023/08/17/750x450_486918-bajaj-allianz-general-insurance.webp://www.bajajgroup.company/wp-content/uploads/2024/05/30-04-2024-Bajaj-Allianz-General-Insurance-launches-Premium-Programme-for-high-value-customers.png-BAJAJ"
        alt="Allianz"
      />
    </div>

    {/* AIG */}
    <div className="policy-card">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_xlSdOoWvuFfxzvtqFgJHVh5FUmjF9Rxmkw&s"
        alt="AIG"
      />
    </div>

    {/* Aditya Birla */}
    <div className="policy-card">
      <img
        src="https://www.adityabirla.com/_next/image/?url=https%3A%2F%2Fwww.cms.adityabirla.com%2Fuploads%2FUltratech_acaeb26d3d.webp&w=1920&q=100"
        alt="Aditya Birla"
      />
    </div>
  </div>
</section>
{/* ===== CONTACT SECTION ===== */}
<div className="contact-section" id="contact">
  <h2 className="section-title">Contact PolicyCare</h2>
  <p className="section-subtitle">
    Need help with policy coverage, hospitals, or QR verification?  
    Our support team is here for you.
  </p>

  <div className="contact-container">
    
    {/* LEFT SIDE – SUPPORT INFO */}
    <div className="contact-info">
      <h3>📞 Support Information</h3>

      <p><strong>📍 Location</strong><br />
        Madurai, Tamil Nadu, India
      </p>

      <p><strong>📧 Email</strong><br />
        support@policycare.in
      </p>

      <p><strong>📱 Phone</strong><br />
        +91 98765 43210
      </p>

      <p><strong>🕒 Support Hours</strong><br />
        Mon – Sat | 9:00 AM – 6:00 PM
      </p>
    </div>

    {/* RIGHT SIDE – CONTACT FORM */}
    <form
      className="contact-form"
      onSubmit={(e) => {
        e.preventDefault();
        alert("Thank you for contacting PolicyCare. We will reach out soon!");
      }}
    >
      <h3>📨 Send us a Message</h3>

      <input type="text" placeholder="Your Name" required />
      <input type="email" placeholder="Your Email" required />

      <select required>
        <option value="">Select Subject</option>
        <option>Policy Coverage Issue</option>
        <option>Hospital Not Listed</option>
        <option>QR Code Issue</option>
        <option>Login / Account Issue</option>
        <option>Other</option>
      </select>

      <textarea placeholder="Your Message" rows="4" required></textarea>

      <button type="submit">Submit</button>
    </form>
  </div>
</div>




    </div>
  );
};

export default Home;
