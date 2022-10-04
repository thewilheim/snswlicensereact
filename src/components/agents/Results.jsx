import { React } from "react";
import "../mainStyle.css";
import ResultTable from "./ResultTable";

export default function Results({ userData, setHasResult }) {
  return (
    <div
      id="defaultModal"
      tabIndex="-1"
      aria-hidden="true"
      className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-0 w-full md:inset-0 md:h-full bg-gray-600/60 backdrop-blur-sm"
    >
      <div className="relative p-4 w-full max-w-5xl h-full md:h-auto m-auto">
        <div className="relative bg-white rounded-lg shadow-lg border-t-2 border-blue-600">
          <div className="flex justify-between items-start p-4 rounded-t border-b ">
            <h3 className="text-xl font-semibold text-gray-900">
              Search Results
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-red-600 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:text-white"
              data-modal-toggle="defaultModal"
              onClick={() => setHasResult(false)}
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div className="overflow-x-auto relative">
              <ResultTable userData={userData} />
            </div>
          </div>

          <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200">
            <button
              data-modal-toggle="defaultModal"
              type="button"
              onClick={() => setHasResult(false)}
              className="text-white bg-red-600 hover:bg-red-500 rounded-lg text-sm font-medium px-5 py-2.5"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
