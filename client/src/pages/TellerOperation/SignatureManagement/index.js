import Amend from "./Amend";
import Capture from "./Capture";
import Enquiry from "./Enquiry";
import See from "./See";
import Status from "./Status";
import Validate from "./Validate";

function SignatureManagement() {
    return (
        <div>
            <Capture />

            <Enquiry />

            <Amend />

            <Validate />

            <Status />
        </div>
    )
}


export default SignatureManagement;