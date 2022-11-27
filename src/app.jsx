const ReactDOM = require("react-dom/client");
const React = require("react");
const root = ReactDOM.createRoot(
    document.getElementById('app')
);
import Header from "./components/header.jsx";
import MainLayout from "./components/main-layout.jsx"

root.render(<>
    <Header />
    <MainLayout />
</>);