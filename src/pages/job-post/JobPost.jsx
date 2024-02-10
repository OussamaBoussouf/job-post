import Navbar from '../layouts/Navbar';
import Footer from '../layouts/Footer';
import JobForm from './components/JobForm';

function JobPost() {
    return (
        <>  
            <Navbar/>
            <hr />
            <JobForm/>
            <hr />
            <Footer/>
        </>
    );
}

export default JobPost;