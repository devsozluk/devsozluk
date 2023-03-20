import ProfileTabs from "@/components/ProfileTabs";
import Layout from "./layout";

const Settings = () => {
  return <div>settings</div>;
};

Settings.getLayout = (page: React.ReactElement) => <Layout>{page}</Layout>;

export default Settings;
