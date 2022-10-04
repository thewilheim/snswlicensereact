import React from "react";

function AlertComponent({ type, message }) {
  const renderAlert = () => {
    switch (type) {
      case "success":
        return (
          <div
            className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
            role="alert"
          >
            <span className="font-medium">Success!</span> {message}
          </div>
        );

      case "error":
        return (
          <div
            className="p-4 mb-4 text-sm text-yellow-700 bg-yellow-100 rounded-lg dark:bg-yellow-200 dark:text-yellow-800"
            role="alert"
          >
            <span className="font-medium">Warning!</span> {message}
          </div>
        );

      case "info":
        return (
          <div
            className="p-4 mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800"
            role="alert"
          >
            <span className="font-medium">Info!</span> {message}
          </div>
        );
    }
  };

  return <div>{renderAlert()}</div>;
}

export default AlertComponent;
