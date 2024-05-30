"use client";
import React, { useEffect, useState } from "react";
import StepA from "./StepA";
import StepB from "./StepB";
import StepC from "./StepC";
import StepD from "./StepD";
import StepFinal from "./StepFinal";

// This is the parent component.
// This component will control and manage steps and data

// Step 1: Customer Identity Info
// Step 2: Customer Business Info
// Step 3: Customer Financial Info
// Step 4: Confirm Form  Data

// Step Final: Succes Result

const initialFormData = {
  name: "",
  lastName: "",
  businessName: "",
  businessCity: "",
  businessWebsite: "",
  email: "",
  incomePerMonth: 0,
  taxPercantage: 0,
  agreeToTerms: false,
};

const stepsArray = ["1", "2", "3", "4"];

const SimpleMultiStepForm = ({ showStepNumber }) => {
  const [step, setStep] = useState("1");
  const [formData, setFormData] = useState(initialFormData);

  // We need a method to go to next step
  const handleNextStep = () => {
    if (step === "1") setStep("2");
    else if (step === "2") setStep("3");
    else if (step === "3") setStep("4");
  };

  // We need a method to go to prev step
  const handlePrevStep = () => {
    if (step === "D") setStep("C");
    else if (step === "3") setStep("2");
    else if (step === "2") setStep("1");
  };

  // We need a method to update our formData
  const handleChangeInput = (event) => {
    const fieldName = event.target.name;
    let fieldValue;
    if (fieldName === "agreeToTerms") {
      fieldValue = event.target.checked;
    } else {
      fieldValue = event.target.value;
    }
    setFormData({
      ...formData,
      [fieldName]: fieldValue,
    });
  };

  // We need a method to do final operation
  const handleSubmitFormData = () => {
    // Here You can do final Validation and then Submit Your form
    if (!formData.agreeToTerms) {
      alert("Error!!!!!!   You must agree to Terms of Services!!!!");
    } else {
      setStep("Final");
    }
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  // Section for render StepNumbers
  const renderTopStepNumbers = () => {
    if (!showStepNumber || step === "Final") {
      return null;
    }
    return (
      <section className="mt-1 mb-4 flex justify-between">
        {stepsArray.map((item) => (
          <div
            key={item}
            className={`w-8 h-8 flex justify-center items-center border-2 border-gray-600 rounded-full cursor-pointer ${
              item === step ? "bg-blue-500" : ""
            }`}
            onClick={() => setStep(item)}
          >
            {item}
          </div>
        ))}
      </section>
    );
  };

  return (
    <div className="w-[600px] max-w-full px-6 mx-auto rounded-lg border-2 border-solid border-sky-300">
      {renderTopStepNumbers()}

      {/* // Render Steps */}
      {step === "1" ? (
        <StepA
          formData={formData}
          handleChangeInput={handleChangeInput}
          handleNextStep={handleNextStep}
        />
      ) : null}
      {step === "2" ? (
        <StepB
          formData={formData}
          handleChangeInput={handleChangeInput}
          handlePrevStep={handlePrevStep}
          handleNextStep={handleNextStep}
        />
      ) : null}
      {step === "3" ? (
        <StepC
          formData={formData}
          handleChangeInput={handleChangeInput}
          handlePrevStep={handlePrevStep}
          handleNextStep={handleNextStep}
        />
      ) : null}
      {step === "4" ? (
        <StepD
          formData={formData}
          handleChangeInput={handleChangeInput}
          handlePrevStep={handlePrevStep}
          handleSubmitFormData={handleSubmitFormData}
        />
      ) : null}
      {step === "Final" ? <StepFinal /> : null}
    </div>
  );
};

export default SimpleMultiStepForm;
