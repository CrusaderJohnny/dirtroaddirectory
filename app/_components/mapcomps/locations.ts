/*
Written by Mace Howald 06-03-2025
Referenced: https://developers.google.com/codelabs/maps-platform/maps-platform-101-react-js#1
Maps the markets from markets.json to the POIs array for the google maps api
*/
import { MarketsInterface, Poi} from "@/app/_types/interfaces";
// import data from "../../_res/markets.json"; // Not used in this revised version if fetching
import { useEffect, useState, useMemo } from "react";

/**
 * Custom hook to fetch market data and transform it into an array of Points of Interest (Poi).
 * This hook can be used by any React component that needs the map locations.
 * @returns An array of Poi objects.
 */
export const useMapLocations = (): Poi[] => {
  const [marketList, setMarketList] = useState<MarketsInterface[]>([]);
  const [, setIsLoading] = useState<boolean>(true);
  const [, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMarkets = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/markets/`)
        const data = await response.json();
        setMarketList(data);
        //const fetchedData = await marketsAPI.getMarkets();
        //setMarketList(fetchedData);
      } catch (err) {
        console.error("Failed to load markets:", err);
        setError("Failed to load market data.");
      } finally {
        setIsLoading(false);
      }
    };

    loadMarkets();
  }, []); // Empty dependency array means this runs once on mount

  // Use useMemo to memoize the transformation of marketList to MapLocations.
  // This prevents re-calculation on every render if marketList hasn't changed.
  const mapLocations: Poi[] = useMemo(() => {
    return marketList.map((item) => ({
      key: item.id,
      location: { lat: Number(item.lat), lng: Number(item.lng) },
    }));
  }, [marketList]); // Recalculate only when marketList changes

  // You might want to return loading and error states as well,
  // depending on how you want to handle them in the consuming component.
  // For simplicity, we're just returning the locations here.
  return mapLocations;
};
