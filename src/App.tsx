import React from "react";
import { ListMailsView } from "./app/pages/ListMails/ListMails.view";
import styled from "@emotion/styled";

const AppWrapper = styled.div<{}>({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  height: '100%',
});

function App() {
  return (
    <AppWrapper>
      <ListMailsView />
    </AppWrapper>
  );
}

export default App;
