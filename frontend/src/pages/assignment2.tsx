import { useEffect, useState } from "react";

const Assignment2 = () => {
  const [apiData, setApiData] = useState(null);
  const [limit, setLimit] = useState(30);
  const [error, setError] = useState("");

  const fetchData = () => {
    fetch(`http://localhost:4000/api/data?limit=${limit}`)
      .then((response) => response.json())
      .then((data) => {
        for (const dept in data) {
          delete data[dept]["minAge"];
          delete data[dept]["maxAge"];
        }
        
        setApiData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  useEffect(() => {
    fetchData();
  }, [limit]);

  const handleSetLimit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue:number = +e.target.value
    setLimit(newValue);
    if (newValue < 1 || newValue > 100) {
      setError("More than 0 and Less than or equal to	 100 ");
    }else{
      setError("")
    }
  };
  return (
    <div>
      <div className="flex">
        Count :{" "}
        <input
          className="ml-5"
          type="number"
          min="1"
          max="100"
          onChange={handleSetLimit}
          defaultValue={limit}
        />
      </div>
      <div className="text-red-500 mt-2">{error}</div>

      <div className="mt-5 border-1 border-gray-400 border-solid">
        <pre>{JSON.stringify(apiData, null, 2)}</pre>
      </div>
    </div>
  );
};
export default Assignment2;
