import React from "react";
import { HenngeDatePicker } from "./app/components/DatePicker/HenngeDatePicker";
import { HenngeTable } from "./app/components/Table/HenngeTable";
import mockData from "./data/mockData.json";

function App() {
  console.log("mockData", mockData);
  const header = [
    { type: "string", value: "From", sorting: false },
    { type: "string", value: "To", sorting: false },
    { type: "string", value: "Subject", sorting: false },
    { type: "datetime", value: "Date", sorting: false },
  ];
  const data = mockData.data.map((email) => [
    {
      key: "From",
      value: email.from,
    },
    { key: "To", value: email.to.for.join(", ") },
    { key: "Subject", value: email.subject },
    { key: "Date", value: email.timestamp },
  ]);
  return (
    <div className="App">
      <HenngeDatePicker handleDateSelection={(response) => {}} />
      <HenngeTable headers={header} data={data} />
    </div>
  );
}

export default App;
