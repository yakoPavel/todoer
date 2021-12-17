import AppHeader from "components/AppHeader";
import useUserContext from "context/UserContext";
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "routes/Unauthorized/Login/Login";
import PasswordRecovery from "routes/Unauthorized/PasswordRecovery/PasswordRecovery";
import SignUp from "routes/Unauthorized/SignUp/SignUp";

const AuthenticatedApp = () => {
  const [menuState, setMenuState] = React.useReducer(
    (currentState: "opened" | "closed") =>
      currentState === "opened" ? "closed" : "opened",
    "closed",
  );

  return <AppHeader menuState={menuState} onMenuToggle={setMenuState} />;
};

const App = () => {
  const user = useUserContext();

  if (!user) {
    return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/password-recovery" element={<PasswordRecovery />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<AuthenticatedApp />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
