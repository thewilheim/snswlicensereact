import React from "react";
import { useNavigate } from "react-router-dom";

function ServiceCard({ title, elements, url, buttonText }) {
  const navigate = useNavigate();
  return (
    <div className="flex  w-96 h-80 p-6 flex-col justify-evenly items-start border-[2.5px] border-slate-700/40 border-t-[#2E5299] rounded shadow-md border-t-4 shadow-slate-500/40 hover:border-[2.5px] hover:border-t-4 hover:border-[#2E5299]">
      <h3 className="font-semibold text-2xl">{title}</h3>

      {elements.map((item) => {
        return (
          <p>
            {item.key === "" ? null : (
              <strong className="font-semibold">{item.key}</strong>
            )}
            {item.value}
          </p>
        );
      })}

      {buttonText ? (
        <button
          className="rounded text-white font-semibold bg-red-700 p-2 hover:bg-red-600"
          onClick={() => navigate(`/${url}`)}
        >
          {buttonText}
        </button>
      ) : null}
    </div>
  );
}

export default ServiceCard;
