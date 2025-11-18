import { useState, useEffect } from "react";
import ApiClient from "../configs/apiClient";

const Stats = () => {
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);

      const res = await ApiClient.get("/posts/stats/count");
      if (res.ok) {
        setTotal(res.body);
        setError(null);
      } else {
        setError("Failed to fetch statistics. Error: " + res.body.message);
      }
      setLoading(false);
    };
    fetchStats();
  }, []);

  return (
    <>
      <h1>Statistics</h1>
      <h3>Total Posts: {loading ? "Loading..." : total}</h3>
      {error && <p className="error-message">{error}</p>}
    </>
  );
};

export default Stats;
