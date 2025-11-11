import { useState, useEffect } from "react";

const Stats = () => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      const res = await fetch("http://localhost:8080/api/stats");
      const data = await res.json();
      setTotal(data.length);
    };
    fetchStats();
  }, []);

  return (
    <div>
      <h1>Statistics</h1>
      <h2>Number of Posts: {total}</h2>
    </div>
  );
};

export default Stats;
