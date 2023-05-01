import {Fragment} from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import {publicRoutes} from "~/routes";
import DefaultLayout from "~/layouts/DefaultLayout";

function App() {
  return (
      <Router>
        <div className="App">
            <ToastContainer />
          <Routes>
            {publicRoutes.map((route, index) => {
              const Page = route.component;
              let Layout = DefaultLayout;
              if(route.layout){
                Layout = route.layout;
              }
              else if (route.layout === null){
                Layout = Fragment
              }
              return <Route key={index} path={route.path}
                            element={<Layout><Page/></Layout>}
              />
            })}

          </Routes>
        </div>
      </Router>
  );
}

export default App;
