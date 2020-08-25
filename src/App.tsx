import React from "react";
import { HenngeDatePicker } from "./app/components/DatePicker/HenngeDatePicker";
import { ListMailsView } from "./app/pages/ListMails/ListMails.view";

function App() {
  return (
    <div className="App">
      <HenngeDatePicker handleDateSelection={(response) => {}} />
      <ListMailsView />
    </div>
  );
}

export default App;
