import React from "react";
import useWorkData from "../hooks/useWorkData";
import "./Calendar.css";

const daysOfWeek = ["Lun","Mar","Mié","Jue","Vie","Sáb","Dom"];

export default function Calendar() {
  const { workHours, extraHours, gymHours, viewMode, toggleView } = useWorkData();
  const month = new Date().getMonth();
  const year = new Date().getFullYear();

  const getDaysInMonth = (month, year) => {
    const date = new Date(year, month, 1);
    const days = [];
    while(date.getMonth()===month){
      days.push(new Date(date));
      date.setDate(date.getDate()+1);
    }
    return days;
  };

  const days = getDaysInMonth(month, year);

  const getDayColor = (date) => {
    const day = date.getDay();
    if(day===0) return "#a0d8f1"; // Domingo azul
    if(day>=1 && day<=5) return "#d9d9d9"; // Lunes-Viernes gris
    return "#e6e2da"; // Sábado beige
  };

  const renderDay = (date) => (
    <div key={date.toDateString()} className="day" style={{backgroundColor:getDayColor(date)}}>
      <strong>{date.getDate()}</strong>
      {date.getDay()!==0 && (
        <div className="work-info">
          <span>Trabajo: {workHours}h</span>
          {extraHours>0 && <span>Extras: {extraHours}h</span>}
          <span>Gym: {gymHours}h</span>
        </div>
      )}
      {date.getDay()===0 && <div className="work-info">Descanso</div>}
    </div>
  );

  return (
    <div className="calendar-container">
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <h2>{year} - {month+1}</h2>
        <button onClick={toggleView}>{viewMode==="monthly"?"Vista semanal":"Vista mensual"}</button>
      </div>
      <div className="weekdays">
        {daysOfWeek.map(d => <div key={d} className="weekday">{d}</div>)}
      </div>
      <div className="days">
        {days.map(date => renderDay(date))}
      </div>
      <div className="summary">
        <h3>Resumen mensual</h3>
        <p>Total horas normales: {workHours*days.length}</p>
        <p>Total horas extra: {extraHours*days.length}</p>
        <p>Total gym: {gymHours*days.length}</p>
      </div>
    </div>
  );
}
