import React, { useState, useEffect } from 'react';
import {MarketsInterface} from "@/app/_types/interfaces";


const MarketFetcher: React.FC = () => {
const [markets, setMarkets] = useState<MarketsInterface[]>([]);
const [loading, setLoading] = useState<boolean>(true);
const [error, setError] = useState<string | null>(null);

const API_BASE_URL = 'http://localhost:8080'; // Your backend API URL

const fetchMarkets = async () => {
    setLoading(true);
    setError(null); // Clear previous errors
    try {
    const response = await fetch(`${API_BASE_URL}/markets`);

      // Check for HTTP errors (e.g., 404, 500)
    if (!response.ok) {
        const errorData = await response.json(); // Try to parse error message if available
        throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
    }

    const data: MarketsInterface[] = await response.json(); // Parse the JSON response
    setMarkets(data);
    } catch (err: any) {
    console.error("Failed to fetch markets:", err);
    setError(err.message || "An unknown error occurred while fetching markets.");
    } finally {
    setLoading(false);
    }
};

  // Fetch markets when the component mounts
useEffect(() => {
    fetchMarkets();
}, []); // Empty array means it runs once after initial render

return (
    <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', marginTop: '20px' }}>
    <h2>Markets Data (using Fetch API)</h2>
    <button onClick={fetchMarkets} disabled={loading} style={{ marginBottom: '15px' }}>
        {loading ? 'Loading...' : 'Refresh Markets'}
    </button>

    {error && <p style={{ color: 'red' }}>Error: {error}</p>}

    {loading && <p>Loading markets...</p>}

    {!loading && markets.length === 0 && !error && <p>No markets found.</p>}

    {!loading && markets.length > 0 && (
        <pre style={{ backgroundColor: '#f0f0f0', padding: '15px', borderRadius: '5px', overflowX: 'auto' }}>
          {/* Display markets as formatted JSON */}
        {JSON.stringify(markets, null, 2)}
        </pre>
    )}

      {/* Optionally, you could display them in a more structured list */}
    {!loading && markets.length > 0 && (
        <div>
        <h3>Markets List:</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
            {markets.map((market) => (
            <li key={market.id} style={{ borderBottom: '1px dashed #eee', padding: '10px 0' }}>
                <strong>ID:</strong> {market.id}<br/>
                <strong>Label:</strong> {market.label}<br/>
                <strong>Description:</strong> {market.description || 'N/A'}<br/>
                {/* ... other fields you want to display */}
            </li>
            ))}
        </ul>
        </div>
    )}
    </div>
);
};

export default MarketFetcher;