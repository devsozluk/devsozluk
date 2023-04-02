import { useRouter } from "next/router";
import useNavigations, { Navigation } from "./Profile.navigations";
import classNames from "classnames";

const ProfileTabs = () => {
  const navigations = useNavigations();

  return (
    <div className="border-b max-w-sm border-gray-700">
      <ul className="flex flex-wrap items-center justify-center -mb-px text-sm font-medium text-center text-gray-400">
        {navigations.map((item) => (
          <ProfileTabs.Item key={item.id} {...item} />
        ))}
      </ul>
    </div>
  );
};

ProfileTabs.Item = ({ title, link, id, onClick, icon }: Navigation) => {
  const router = useRouter();
  const isFocus = router.pathname.includes(link as string);

  const classes = classNames({
    "hover:text-gray-600 hover:border--300 hover:text-gray-300": !isFocus,
    "active text-blue-500 border-blue-500 border-blue-600 text-blue-600 ":
      isFocus,
  });

  const handleClick = () => {
    if (link) {
      router.push("/dashboard/" + link);
    } else onClick!();
  };

  return (
    <li className="mr-2 cursor-pointer" key={id}>
      <a
        onClick={handleClick}
        className={classNames(
          "inline-flex p-4 border-b-2 items-center justify-center  gap-x-2 border-transparent rounded-t-lg group",
          classes
        )}
      >
        {icon}
        {title}
      </a>
    </li>
  );
};

export default ProfileTabs;
