import EnquiryCustomer from "./EnquiryCustomer";
import OpenCorporateCustomer from "./OpenCorporateCustomer";
import OpenIndividualCustomer from "./OpenIndividualCustomer";

function CustomerManagement() {
    return (
        <div>
            <OpenIndividualCustomer />

            <OpenCorporateCustomer />

            <EnquiryCustomer />
        </div>
    ) 
}

export default CustomerManagement;