// frontend/src/pages.js
const { BrowserRouter, Routes, Route } = ReactRouterDOM;
const { Login } = window.Login;
const { Signup } = window.Signup;
const { PolicyEntry } = window.PolicyEntry;
const { HospitalList } = window.HospitalList;
const { QRPage } = window.QRPage;
const { TreatmentPage } = window.TreatmentPage;

function App() {
  return React.createElement(
    BrowserRouter,
    null,
    React.createElement(
      Routes,
      null,
      React.createElement(Route, { path: "/", element: React.createElement(Login) }),
      React.createElement(Route, { path: "/signup", element: React.createElement(Signup) }),
      React.createElement(Route, { path: "/policyentry", element: React.createElement(PolicyEntry) }),
      React.createElement(Route, { path: "/hospitals", element: React.createElement(HospitalList) }),
      React.createElement(Route, { path: "/qr", element: React.createElement(QRPage) }),
      React.createElement(Route, { path: "/treatment", element: React.createElement(TreatmentPage) })
    )
  );
}

ReactDOM.render(React.createElement(App), document.getElementById("root"));
