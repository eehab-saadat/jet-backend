// postJets.js
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const jets = [
    {
      name: "JF-17 Thunder",
      manufacturer: "Pakistan Aeronautical Complex / Chengdu Aircraft Corporation",
      role: "Multirole",
      topSpeed: 1910,
      range: 2037,
      active: true,
      maidenFlight: "2003-08-25",
      crew: 1,
      armament: ["Missiles", "Bombs", "Gun"],
      origin: "Pakistan"
    },
    {
      name: "F-16 Fighting Falcon",
      manufacturer: "General Dynamics",
      role: "Multirole",
      topSpeed: 2400,
      range: 4220,
      active: true,
      maidenFlight: "1974-02-02",
      crew: 1,
      armament: ["Missiles", "Bombs", "Gun"],
      origin: "Pakistan"
    },
    {
      name: "Mirage III",
      manufacturer: "Dassault Aviation",
      role: "Interceptor",
      topSpeed: 2338,
      range: 1200,
      active: false,
      maidenFlight: "1956-11-17",
      crew: 1,
      armament: ["Missiles", "Bombs", "Gun"],
      origin: "Pakistan"
    },
    {
      name: "Mirage 5",
      manufacturer: "Dassault Aviation",
      role: "Ground attack",
      topSpeed: 2340,
      range: 1300,
      active: true,
      maidenFlight: "1967-05-19",
      crew: 1,
      armament: ["Missiles", "Bombs", "Gun"],
      origin: "Pakistan"
    },
    {
      name: "F-7PG",
      manufacturer: "Chengdu Aircraft Industry Corporation",
      role: "Interceptor",
      topSpeed: 2230,
      range: 2000,
      active: true,
      maidenFlight: "1965-01-05",
      crew: 1,
      armament: ["Missiles", "Gun"],
      origin: "Pakistan"
    },
    {
      name: "HAL Tejas",
      manufacturer: "Hindustan Aeronautics Limited",
      role: "Multirole",
      topSpeed: 2220,
      range: 3000,
      active: true,
      maidenFlight: "2001-01-04",
      crew: 1,
      armament: ["Missiles", "Bombs", "Gun"],
      origin: "India"
    },
    {
      name: "Sukhoi Su-30MKI",
      manufacturer: "Sukhoi / HAL",
      role: "Air superiority",
      topSpeed: 2500,
      range: 3000,
      active: true,
      maidenFlight: "1996-07-01",
      crew: 2,
      armament: ["Missiles", "Bombs", "Gun"],
      origin: "India"
    },
    {
      name: "MiG-21 Bison",
      manufacturer: "Mikoyan-Gurevich Design Bureau",
      role: "Interceptor",
      topSpeed: 2230,
      range: 1210,
      active: false,
      maidenFlight: "1955-06-16",
      crew: 1,
      armament: ["Missiles", "Gun"],
      origin: "India"
    },
    {
      name: "Dassault Rafale",
      manufacturer: "Dassault Aviation",
      role: "Multirole",
      topSpeed: 2222,
      range: 3700,
      active: true,
      maidenFlight: "1986-07-04",
      crew: 1,
      armament: ["Missiles", "Bombs", "Gun"],
      origin: "India"
    },
    {
      name: "Jaguar",
      manufacturer: "SEPECAT",
      role: "Ground attack",
      topSpeed: 1700,
      range: 3524,
      active: true,
      maidenFlight: "1968-09-08",
      crew: 1,
      armament: ["Missiles", "Bombs", "Gun"],
      origin: "India"
    }
  ];
  

const API_URL = process.env.API_ROUTE + '/api/jets/';

const populateJets = async () => {
  for (const jet of jets) {
    try {
      const res = await axios.post(API_URL, jet);
      console.log(`✅ Added: ${res.data.name}`);
    } catch (err) {
      console.error(`❌ Error adding ${jet.name}: ${err.response?.data?.message || err.message}`);
    }
  }
};

populateJets();