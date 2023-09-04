import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import useNavigations, { Navigation } from "./Sidebar.navigations";

const Sidebar = () => {
  const navigations = useNavigations();

  return (
    <ul className="flex w-[220px] flex-col text-sm font-medium gap-y-5 text-gray-400">
      {navigations.map((navigation) => (
        <li key={navigation.id}>
          <h3 className="text-xs uppercase text-gray-500 font-semibold tracking-wider">
            {navigation.title}
          </h3>
          <ul className="flex flex-col mt-2 gap-y-2">
            {navigation.children.map((item) => (
              <Sidebar.Item key={item.id} {...item} />
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};

Sidebar.Item = ({ title, link, id, onClick, icon, disabled }: Navigation) => {
  const router = useRouter();
  const isFocus = router.pathname.includes(link as string);

  const classes = classNames({
    "hover:bg-gray-700/30": !isFocus,
    "bg-gray-700/30": isFocus,
  });

  const iconClasses = classNames({
    "text-primary-400": isFocus,
    "text-gray-300": !isFocus,
  });

  const handleClick = () => {
    if (link) {
      router.push("/dashboard/" + link);
    } else onClick!();
  };

  return (
    <li className="cursor-pointer" key={id}>
      <Link
        href={link as string}
        className={classNames(
          "flex items-center gap-x-2 py-2 px-2 rounded-md transition-colors text-gray-300 duration-200 ease-in-out",
          {
            "!opacity-50 pointer-events-none": disabled,
          },
          classes
        )}
      >
        <i className={iconClasses}>{icon}</i>
        {title}
      </Link>
    </li>
  );
};

export default Sidebar;
