import Layout from "./layout";

const CreateTopic = () => {
  return <div className="">Create Topic</div>;
};

CreateTopic.getLayout = (page: React.ReactElement) => <Layout>{page}</Layout>;

export default CreateTopic;
