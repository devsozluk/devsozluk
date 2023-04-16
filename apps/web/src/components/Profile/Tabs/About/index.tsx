import { IProfile } from "@/types";

export const About = ({ biography }: IProfile) => {
  return (
    <div className="max-w-lg mt-4">
      <div>
        <h3 className="text-lg font-semibold">Hakkında</h3>
        <p className="text-sm text-gray-400">
          {biography ?? "Kullanıcı henüz bir biyografi eklememiş."}
        </p>
      </div>
    </div>
  );
};

export default About;
