import Individual_Custom from "./Individual_Custom";
import Corporate_Custom from "./Corporate_Custom";

const resetComponent = (props) => {
    props = {
        trigger: props.trigger,
        setTrigger: props.setTrigger,
        AccountCode: null,
        component: null
    }
    return props
}

function TempComponent(props){
    console.log("temp props")
    console.log(props.component)

    console.log(props)
    if(props.component == 1){

        return (<Individual_Custom
            trigger={props.trigger}
            setTrigger={props.setTrigger}
            AccountCode={props.AccountCode}
            AccountCode01={props.AccountCode01}
        >
            
        </Individual_Custom>)
    }
    else if(props.component == 2){
        return (<Corporate_Custom
            trigger={props.trigger01}
            setTrigger={props.setTrigger01}
            AccountCode={props.AccountCode}
            resetComponent={resetComponent}
            AccountCode01={props.AccountCode01}
        >
            
        </Corporate_Custom>)
    }
    else{
        return 
    }
}

export default TempComponent