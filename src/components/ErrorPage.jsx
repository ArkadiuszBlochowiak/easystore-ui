import React from "react";
import Header from "./header/Header";
import Footer from "./Footer";
import PageTitle from "./heading/PageTitle";
import { Link } from "react-router-dom";
import errorImage from "../assets/util/error.png";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const routeError = useRouteError();
  const errorTitle = routeError.status;
  const errorMessage = routeError.data;

  return (
    <div className="flex flex-col min-h-screen bg-normalbg dark:bg-darkbg">
      <Header />
      <main className="grow py-12  font-primary">
        <div className="max-w-4xl mx-auto px-4">
          <PageTitle title={errorTitle} />
        </div>
        <div className="text-center text-gray-600 dark:text-lighter flex flex-col items-center">
          <p className="max-w-xl px-2 mx-auto leading-6 mb-4">{errorMessage}</p>
          <img
            src={errorImage}
            alt="Error"
            className="w-full max-w-xl mx-auto mb-6"
          />
          <Link
            to="/"
            className="py-3 px-6 text-white dark:text-black text-xl rounded-md transition duration-200 bg-primary dark:bg-light hover:bg-dark dark:hover:bg-lighter font-semibold"
          >
            Back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
