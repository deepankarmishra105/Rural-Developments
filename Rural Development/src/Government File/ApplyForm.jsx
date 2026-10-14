import React, { useState } from "react";
import "./ApplyForm.css";

export default function ApplyForm({
  schemeName = "Government Scheme",
}) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    dob: "",
    gender: "",
    mobile: "",
    email: "",
    aadhaar: "",
    address: "",
    district: "",
    state: "Odisha",
    pincode: "",
    occupation: "",
    income: "",
    bankName: "",
    accountNumber: "",
    ifsc: "",
    document: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const nextStep = (e) => {
    e.preventDefault();
    setStep((prev) => Math.min(prev + 1, 3));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const previousStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Demo only: no application is sent to a government server.
    setApplicationId(
      `DEMO-${Date.now().toString().slice(-8)}`
    );
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (submitted) {
    return (
      <main className="apply-page">
        <div className="apply-orb apply-orb-one" />
        <div className="apply-orb apply-orb-two" />

        <section className="apply-success">
          <div className="success-check">✓</div>
          <span className="apply-eyebrow">
            DEMO APPLICATION COMPLETE
          </span>
          <h1>You're All Set!</h1>
          <p>
            Your demo application for{" "}
            <strong>{schemeName}</strong> has been completed.
          </p>

          <div className="apply-reference">
            <span>Demo Reference ID</span>
            <strong>{applicationId}</strong>
          </div>

          <p className="apply-note">
            This is a frontend demonstration. Your details have
            not been saved to or submitted to a government server.
          </p>

          <button
            className="apply-primary"
            onClick={() => window.history.back()}
          >
            ← Back to Schemes
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="apply-page">
      <div className="apply-grid-bg" />
      <div className="apply-orb apply-orb-one" />
      <div className="apply-orb apply-orb-two" />
      <div className="apply-orb apply-orb-three" />

      <div className="apply-container">
        <header className="apply-heading">
          <div className="apply-eyebrow">
            <span className="apply-live-dot" />
            GOVERNMENT SCHEME PORTAL
          </div>

          <h1>
            Your Future,
            <span> One Application Away.</span>
          </h1>

          <p>
            Complete your application in three simple steps.
          </p>
        </header>

        <div className="apply-progress">
          {["Personal", "Applicant Details", "Documents"].map(
            (label, index) => {
              const number = index + 1;

              return (
                <div
                  key={label}
                  className={`apply-progress-step ${
                    step >= number ? "is-active" : ""
                  }`}
                >
                  <div className="apply-step-circle">
                    {step > number ? "✓" : number}
                  </div>
                  <span>{label}</span>
                </div>
              );
            }
          )}

          <div className="apply-progress-track">
            <div
              className="apply-progress-fill"
              style={{ width: `${((step - 1) / 2) * 100}%` }}
            />
          </div>
        </div>

        <form className="apply-card" onSubmit={handleSubmit}>
          <div className="apply-card-top">
            <div>
              <span className="apply-card-label">
                APPLICATION FORM
              </span>
              <h2>{schemeName}</h2>
            </div>
            <div className="apply-card-icon">
              {step === 1 ? "✦" : step === 2 ? "⌂" : "↥"}
            </div>
          </div>

          {step === 1 && (
            <section className="apply-step-content" key="step1">
              <h3>Personal Information</h3>
              <p className="apply-section-subtitle">
                Let's start with your basic details.
              </p>

              <div className="apply-fields">
                <div className="apply-field apply-field-full">
                  <label htmlFor="fullName">Full Name *</label>
                  <input
                    id="fullName"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Enter your Full Name"
                    autoComplete="name"
                    required
                  />
                </div>

                <div className="apply-field">
                  <label htmlFor="dob">Date of Birth *</label>
                  <input
                    id="dob"
                    name="dob"
                    type="date"
                    value={form.dob}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="apply-field">
                  <label htmlFor="gender">Gender *</label>
                  <select
                    id="gender"
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select gender</option>
                    <option>Female</option>
                    <option>Male</option>
                    <option>Other</option>
                    <option>Prefer not to say</option>
                  </select>
                </div>

                <div className="apply-field">
                  <label htmlFor="mobile">Mobile Number *</label>
                  <input
                    id="mobile"
                    name="mobile"
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]{10}"
                    maxLength={10}
                    value={form.mobile}
                    onChange={handleChange}
                    placeholder="10-digit mobile number"
                    autoComplete="tel"
                    required
                  />
                </div>

                <div className="apply-field">
                  <label htmlFor="email">Email Address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Name@example.com"
                    autoComplete="email"
                  />
                </div>

                <div className="apply-field apply-field-full">
                  <label htmlFor="aadhaar">
                    Aadhaar Number *
                  </label>
                  <input
                    id="aadhaar"
                    name="aadhaar"
                    type="password"
                    inputMode="numeric"
                    pattern="[0-9]{12}"
                    maxLength={12}
                    value={form.aadhaar}
                    onChange={handleChange}
                    placeholder="Enter 12-digit number"
                    autoComplete="off"
                    required
                  />
                  <small>
                     This is the Main section where you can go after 
                     Fillup the page . Go Next....

                  </small>
                </div>
              </div>
            </section>
          )}

          {step === 2 && (
            <section className="apply-step-content" key="step2">
              <h3>Applicant Details</h3>
              <p className="apply-section-subtitle">
                Tell us about your address and eligibility details.
              </p>

              <div className="apply-fields">
                <div className="apply-field apply-field-full">
                  <label htmlFor="address">Full Address *</label>
                  <textarea
                    id="address"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="House number, street, village or town"
                    required
                  />
                </div>

                <div className="apply-field">
                  <label htmlFor="district">District *</label>
                  <input
                    id="district"
                    name="district"
                    value={form.district}
                    onChange={handleChange}
                    placeholder="Enter district"
                    required
                  />
                </div>

                <div className="apply-field">
                  <label htmlFor="state">State *</label>
                  <select
                    id="state"
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    required
                  >
                    <option>Odisha</option>
                    <option>West Bengal</option>
                    <option>Jharkhand</option>
                    <option>Chhattisgarh</option>
                    <option>Andhra Pradesh</option>
                    <option>Telangana</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="apply-field">
                  <label htmlFor="pincode">PIN Code *</label>
                  <input
                    id="pincode"
                    name="pincode"
                    inputMode="numeric"
                    pattern="[0-9]{6}"
                    maxLength={6}
                    value={form.pincode}
                    onChange={handleChange}
                    placeholder="6-digit PIN code"
                    required
                  />
                </div>

                <div className="apply-field">
                  <label htmlFor="occupation">Occupation *</label>
                  <select
                    id="occupation"
                    name="occupation"
                    value={form.occupation}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select occupation</option>
                    <option>Farmer</option>
                    <option>Student</option>
                    <option>Self-employed</option>
                    <option>Business</option>
                    <option>Private employee</option>
                    <option>Government employee</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="apply-field apply-field-full">
                  <label htmlFor="income">
                    Annual Family Income *
                  </label>
                  <select
                    id="income"
                    name="income"
                    value={form.income}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select income range</option>
                    <option>Below ₹1 lakh</option>
                    <option>₹1–2.5 lakh</option>
                    <option>₹2.5–5 lakh</option>
                    <option>₹5–10 lakh</option>
                    <option>Above ₹10 lakh</option>
                  </select>
                </div>
              </div>
            </section>
          )}

          {step === 3 && (
            <section className="apply-step-content" key="step3">
              <h3>Bank & Documents</h3>
              <p className="apply-section-subtitle">
                Add the final details required by this demo form.
              </p>

              <div className="apply-fields">
                <div className="apply-field">
                  <label htmlFor="bankName">Bank Name *</label>
                  <input
                    id="bankName"
                    name="bankName"
                    value={form.bankName}
                    onChange={handleChange}
                    placeholder="Enter bank name"
                    required
                  />
                </div>

                <div className="apply-field">
                  <label htmlFor="accountNumber">
                    Account Number *
                  </label>
                  <input
                    id="accountNumber"
                    name="accountNumber"
                    type="password"
                    value={form.accountNumber}
                    onChange={handleChange}
                    placeholder="Enter account number"
                    autoComplete="off"
                    required
                  />
                </div>

                <div className="apply-field apply-field-full">
                  <label htmlFor="ifsc">IFSC Code *</label>
                  <input
                    id="ifsc"
                    name="ifsc"
                    value={form.ifsc}
                    onChange={handleChange}
                    placeholder="Example: SBIN0001234"
                    pattern="[A-Za-z]{4}0[A-Za-z0-9]{6}"
                    maxLength={11}
                    required
                  />
                </div>

                <div className="apply-upload apply-field-full">
                  <div className="apply-upload-icon">↑</div>
                  <h4>Upload Supporting Document</h4>
                  <p>PDF, JPG or PNG · Maximum 5 MB</p>

                  <label className="apply-upload-button">
                    Choose File
                    <input
                      type="file"
                      name="document"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => {
                        const file = e.target.files?.[0];

                        if (file && file.size > 5 * 1024 * 1024) {
                          alert("Please choose a file smaller than 5 MB.");
                          e.target.value = "";
                          return;
                        }

                        handleChange(e);
                      }}
                      required
                    />
                  </label>

                  {form.document && (
                    <p className="apply-selected-file">
                      ✓ {form.document.name}
                    </p>
                  )}
                </div>
              </div>

              <label className="apply-consent">
                <input type="checkbox" required />
                <span>
                  I confirm that the information provided is
                  accurate and complete.
                </span>
              </label>
            </section>
          )}

          <div className="apply-form-footer">
            <span className="apply-step-count">
              STEP 0{step} <span>OF 03</span>
            </span>

            <div className="apply-actions">
              {step > 1 && (
                <button
                  type="button"
                  className="apply-secondary"
                  onClick={previousStep}
                >
                  ← Back
                </button>
              )}

              {step < 3 ? (
                <button
                  type="button"
                  className="apply-primary"
                  onClick={(e) => {
                    const currentForm = e.currentTarget.form;

                    if (currentForm.reportValidity()) {
                      nextStep(e);
                    }
                  }}
                >
                  Continue <span>→</span>
                </button>
              ) : (
                <button type="submit" className="apply-primary">
                  Submit Application <span>✓</span>
                </button>
              )}
            </div>
          </div>
        </form>

        <footer className="apply-footer-note">
          <span>✦</span>
          Application form UI demonstration · Not an official government website
        </footer>
      </div>
    </main>
  );
}
