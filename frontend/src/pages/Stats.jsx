import { useState, useEffect } from "react";

const Stats = () => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      const res = await fetch("http://localhost:8080/api/posts/stats/count");
      const data = await res.json();
      setTotal(data);
    };
    fetchStats();
  }, []);

  return (
    <div className="page-container">
      <h1>Statistics</h1>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{total}</div>
          <div className="stat-label">Total Posts</div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
