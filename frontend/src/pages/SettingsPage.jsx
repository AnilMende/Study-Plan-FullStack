import DangerZone from "../components/settings/DangerZone.jsx";
import ProfileSettings from "../components/settings/ProfileSettings.jsx";
import SecuritySettings from "../components/settings/SecuritySettings.jsx";


const SettingsPage = () => {

    return(
        <div className="space-y-6">
            <ProfileSettings/>

            <SecuritySettings/>

            <DangerZone/>
        </div>
    )
}

export default SettingsPage;