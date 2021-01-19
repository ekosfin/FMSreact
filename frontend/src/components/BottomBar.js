import { useHistory } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import HomeIcon from '@material-ui/icons/Home';
import DoneIcon from '@material-ui/icons/Done';
import SettingsIcon from '@material-ui/icons/Settings';
import "../styles.css";


export default function BottomBar(props) {
    const history = useHistory();

    function onHomeClick(){
        history.push("/home");
    }

    function onDoneClick(){
        history.push("/done");
    }

    function onSettingsClick(){
        history.push("/settings");
    }

    function currentLocationDisable(button){
        if(button===props.location){ 
            return true;
        }else{
            return false;
        }
    }

    return (
        <div className="BottomBar">
            <IconButton id={currentLocationDisable("done")? "footerDoneButtonDisabled" : "footerDoneButton"} onClick={onDoneClick}>
                <DoneIcon fontSize="large"/>
            </IconButton>
            <IconButton id={currentLocationDisable("home")? "footerHomeButtonDisabled" : "footerHomeButton"} onClick={onHomeClick}>
                <HomeIcon fontSize="large"/>
            </IconButton>
            <IconButton id={currentLocationDisable("settings")? "footerSettingsButtonDisabled" : "footerSettingsButton"} onClick={onSettingsClick}>
                <SettingsIcon fontSize="large"/>
            </IconButton>
        </div>
    );
}