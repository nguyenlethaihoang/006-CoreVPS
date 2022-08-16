import Footer from "../Footer";
import Header from "../Header";
import Sidebar from "../Sidebar";
import './DefaultLayout.css'

function DefaultLayout({ children }) {
    return (
        <div 
            className="wrapper"
            style={{
                // backgroundColor= "#f7f1e3"
            }}      
        >

            {/* header components */}
            <div className="header"><Header /></div>

            {/* sidebar components */}
            <div className="sidebar"><Sidebar /></div>

            {/* content components */}
            <div className="content">{children} </div>

            {/* footer components */}
            {/* <div className="footer"><Footer /></div> */}
        </div>
    )
}

export default DefaultLayout;