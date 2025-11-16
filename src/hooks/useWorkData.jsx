import { useState } from "react";

export default function useWorkData() {
  const [workHours, setWorkHours] = useState(8);
  const [extraHours, setExtraHours] = useState(0);
  const [gymHours, setGymHours] = useState(2);
  const [viewMode, setViewMode] = useState("monthly"); // "weekly" o "monthly"

  const updateGymHours = (hours) => setGymHours(hours);
  const updateExtraHours = (hours) => setExtraHours(hours);
  const toggleView = () => setViewMode(viewMode==="monthly"?"weekly":"monthly");

  const totalHours = workHours + extraHours;

  return {
    workHours,
    extraHours,
    gymHours,
    totalHours,
    viewMode,
    updateGymHours,
    updateExtraHours,
    toggleView
  };
}
