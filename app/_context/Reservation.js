"use client";
import { createContext, useContext, useState } from "react";
const ReservationContext = createContext();

const ReservationProvider = function ({ children }) {
  const [range, setRange] = useState({ from: null, to: null });
  const resetRange = function () {
    setRange({ from: null, to: null });
  };
  return (
    <ReservationContext.Provider value={{ resetRange, range, setRange }}>
      {children}
    </ReservationContext.Provider>
  );
};

const useReservation = function () {
  const context = useContext(ReservationContext);
  if (!context) throw new Error("used at a wrong place");
  return context;
};

export { useReservation, ReservationProvider };
