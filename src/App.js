import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import AdminLayout from "./components/layouts/Layout";
import GlobalLoading from "./components/feature/GlobalLoading";
import {ToastContainer} from "react-toastify";

function App() {
    const isLogin = true;
  return (
      <div className="App">
          <GlobalLoading/>
        <BrowserRouter>
            <Routes>
              {/*<Route path="register" element={isLogin ? <Navigate to="/" replace/> : <Register/>}/>*/}
              {/*<Route path="login" element={isLogin ? <Navigate to="/" replace/> : <Login/>}/>*/}
              <Route path="*" element={isLogin ? <AdminLayout/> : <Navigate to="/login" replace/>}/>
            </Routes>
        </BrowserRouter>
          <ToastContainer rtl={true} position="bottom-left"/>
      </div>
  );
}

export default App;
