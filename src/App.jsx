import React, { useEffect, useState } from "react";
import axios from "axios";
import { data } from "autoprefixer";

const App = () => {
  const [details, setDetails] = useState();

  useEffect(() => {
    const getData = async () => {
      const {
        data: { results },
      } = await axios.get("https://randomuser.me/api");
      setDetails(results);
      localStorage.setItem("userInfo", JSON.stringify(results));
    };
    getData();
  }, []);
  console.log(details);

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="w-full h-[100vh] bg-gradient-to-bl from-sky-200 via-violet-200 to-blue-200 flex items-center justify-center flex-col gap-20">
      {details &&
        details.map((ele, i, arr) => {
          const {
            dob: { data, age },
            email,
            gender,
            id: { name, value },
            location: {
              city,
              coordinates: { latitude, longitude },
              country,
              posstcode,
              state,
              street: { number, name: streetName },
              timezone: { offzone, description },
            },
            login: { username, uuid },
            name: { title, first, last },
            nat,
            phone,
            picture,
            registered: { date, age: registeredAge },
          } = ele;
          return (
            <>
              <div
                key={uuid}
                className=" items-center justify-center flex flex-col gap-5"
              >
                <div className="flex gap-5 justify-center items-center">
                  <span className="text-2xl font-bold">Firstname:</span>
                  <span className="text-xl font-semibold">{first}</span>
                </div>
                <div className="flex gap-5 justify-center items-center">
                  <span className="text-2xl font-bold">Email:</span>
                  <span className="text-xl font-semibold">{email}</span>
                </div>
              </div>
            </>
          );
        })}
      <button
        onClick={handleRefresh}
        className="bg-gray-200 rounded-xl hover:bg-gray-700 transition-all duration-300 ease-in-out hover:text-white p-3"
      >
        Refresh
      </button>
    </div>
  );
};

export default App;
