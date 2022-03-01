import React from "react";
import "bootswatch/dist/vapor/bootstrap.min.css";
import "./styles/styles.scss";
import "./index.css";

import { AppRouter } from "./routers/AppRouter";

function App() {
  return (
    <>
      <AppRouter />
    </>
  );
}

export default App;
