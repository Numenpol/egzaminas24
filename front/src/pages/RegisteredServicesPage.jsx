import Header from "../components/Header";
import "../styles/homepage.css";
import RegisteredServiceList from '../components/RegisteredServiceList';


function RegisteredServicesPage() {

    return (
        <>
            <Header />
            <h1 className="homeHeaderText">Registered Services</h1>
            <RegisteredServiceList/>
        </>
    );
}

export default RegisteredServicesPage;
