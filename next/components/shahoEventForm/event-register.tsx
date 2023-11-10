"use client";

import { useState } from "react";

const RegistrationForm = () => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [job, setJob] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        setSuccessMessage("Registration successful!");
        setName("");
        setEmail("");
        setLastname("");
        setPhone("");
        setJob("");
        setCompany("");
        setLocation("");
        setEmail("");
        setSelectedOption("");
      } else {
        setErrorMessage("Registration failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Registration failed. Please try again.");
    }
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-rose-600/40 ring-2 ring-indigo-600 lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-indigo-700">
          Sign up for an event
        </h1>

        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="flex justify-center mb-2">
            <label>
              Name:
              <input
                className="w-full px-4 py-2 mt-2 text-base text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm appearance-none hover:border-gray-500 text-white"
                style={{ backgroundColor: "#5b37bf" }}
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </label>
          </div>

          <div className="flex justify-center mb-2">
            <label>
              Last name:
              <input
                className="w-full px-4 py-2 mt-2 text-base text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm appearance-none hover:border-gray-500 text-white"
                style={{ backgroundColor: "#5b37bf" }}
                type="text"
                value={lastname}
                onChange={(event) => setLastname(event.target.value)}
              />
            </label>
          </div>

          <div className="flex justify-center mb-2">
            <label>
              Phone:
              <input
                className="w-full px-4 py-2 mt-2 text-base text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm appearance-none hover:border-gray-500 text-white"
                style={{ backgroundColor: "#5b37bf" }}
                type="text"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
            </label>
          </div>

          <div className="flex justify-center mb-2">
            <label>
              Job:
              <input
                className="w-full px-4 py-2 mt-2 text-base text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm appearance-none hover:border-gray-500 text-white"
                style={{ backgroundColor: "#5b37bf" }}
                type="text"
                value={job}
                onChange={(event) => setJob(event.target.value)}
              />
            </label>
          </div>

          <div className="flex justify-center mb-2">
            <label>
              Company:
              <input
                className="w-full px-4 py-2 mt-2 text-base text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm appearance-none hover:border-gray-500 text-white"
                style={{ backgroundColor: "#5b37bf" }}
                type="text"
                value={company}
                onChange={(event) => setCompany(event.target.value)}
              />
            </label>
          </div>

          <div className="flex justify-center mb-2">
            <label>
              Location:
              <input
                className="w-full px-4 py-2 mt-2 text-base text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm appearance-none hover:border-gray-500 text-white"
                style={{ backgroundColor: "#5b37bf" }}
                type="text"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
              />
            </label>
          </div>

          <div className="flex justify-center mb-2">
            <label>
              Email:
              <input
                className="w-full px-4 py-2 mt-2 text-base text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm appearance-none hover:border-gray-500 text-white"
                style={{ backgroundColor: "#5b37bf" }}
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </label>
          </div>

          <div className="flex justify-center mb-2">
            <h2>What is your preferred event type?</h2>
          </div>

          <div className="flex justify-center mb-2">
            <label>
              <input
                className="mx-1"
                type="radio"
                value="option1"
                checked={selectedOption === "option1"}
                onChange={handleOptionChange}
              />
              Group discussion
            </label>
          </div>

          <div className="flex justify-center mb-2">
            <label>
              <input
                className="mx-1"
                type="radio"
                value="option2"
                checked={selectedOption === "option2"}
                onChange={handleOptionChange}
              />
              Lecture
            </label>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 mt-2 text-base border rounded-lg shadow-sm appearance-none hover:border-gray-500 text-white"
            style={{ backgroundColor: "#5b37bf" }}
          >
            Register
          </button>
          {successMessage && <p>{successMessage}</p>}
          {errorMessage && <p>{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
