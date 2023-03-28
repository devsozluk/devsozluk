import { Button } from "@devsozluk/ui";
import { useRouter } from "next/router";
import { Fragment } from "react";

const Error404 = () => {
  const router = useRouter();

  const handleToNavigate = () => {
    router.replace("/");
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
            404
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
            Bir şeyler eksik.
          </p>
          <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
            Üzgünüz, o sayfayı bulamıyoruz. Ana sayfada keşfedilecek çok şey
            bulacaksınız.
          </p>
          <Button
            onClick={handleToNavigate}
            className="inline-flex text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4"
          >
            Ana sayfaya geri dön
          </Button>
        </div>
      </div>
    </section>
  );
};

Error404.getLayout = (page: React.ReactElement) => <Fragment>{page}</Fragment>;

export default Error404;
