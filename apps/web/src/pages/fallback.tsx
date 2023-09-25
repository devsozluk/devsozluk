import { Button } from "@devsozluk/ui";
import { NextSeo } from "next-seo";
import Image from "next/image";
import Link from "next/link";

const Fallback = () => {
  const handlePageRefresh = () => {
    document.location.reload();
  };

  return (
    <>
      <NextSeo title="İnternet bağlantınız yok." />
      <div className="flex flex-col items-center h-full md:justify-center">
        <div className="fixed top-0 left-0 right-0 z-30 flex flex-col items-center bg-background py-4 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] md:flex-row md:justify-center md:space-y-0">
          <Link href="/">
            <Image
              width={170}
              height={80}
              src="/logo.png"
              alt="DevSözlük Logo"
            />
          </Link>
        </div>
        <section className="flex items-center justify-center h-screen">
          <div className="max-w-screen-xl px-4 py-8 mx-auto lg:py-16 lg:px-6">
            <div className="max-w-screen-sm mx-auto text-center">
              <h1 className="mb-4 font-extrabold tracking-tight text-7xl lg:text-9xl text-primary-500">
                404
              </h1>
              <p className="mb-4 text-3xl font-bold tracking-tight text-white">
                İnternete bağlı değilsiniz.
              </p>
              <p className="mb-4 text-lg font-light text-gray-400">
                Üzgünüz, internet bağlantınız olmadığı için siteye erişim
                sağlayamıyorsunuz.
              </p>
              <Button
                onClick={handlePageRefresh}
                className="inline-flex text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-primary-600 my-4"
              >
                Sayfayı Yenile
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Fallback;
