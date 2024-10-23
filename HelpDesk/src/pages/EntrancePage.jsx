import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const EntrancePage = () => {
    return (
        <>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="max-w-2xl text-center p-6 bg-white shadow-lg rounded-lg">
                <h1 className="text-3xl font-bold mb-4">Welcome to the OSI IT Help Desk</h1>
                <p className="text-gray-700 text-lg">
                    To enhance the efficiency of our support services and ensure prompt and effective
                    assistance, we have implemented a support ticket system. Each request for support is 
                    assigned a distinct ticket number, enabling you to monitor its status and corresponding 
                    updates via our online platform. Additionally, a comprehensive record of all your 
                    support requests is available for your convenience.
                </p>
            </div>
        </div>
        <Footer />
        </>
        
    );
};

export default EntrancePage;
