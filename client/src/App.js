import { Route,Routes  } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Pagenotfound from "./pages/Pagenotfound";
import Register from "./pages/Auth/Register";
import Students from "./pages/Students";
import Edit from "./pages/Edit";
import Submit from "./pages/Submit";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route exact path="/mentor/:id" element={<Students />} />
        <Route exact path="/mentor/:id/edit" element={<Edit />} />
        <Route exact path="/mentor/:id/submit" element={<Submit />} />
        <Route path="/student" element={<Students />} />
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </>
  );
}

export default App;
