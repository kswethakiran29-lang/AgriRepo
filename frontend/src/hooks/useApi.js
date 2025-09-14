import { useState, useEffect } from 'react';
import mockApiService from '../services/mockApi';

export const useApi = (apiCall, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await apiCall();
        setData(result);
      } catch (err) {
        setError(err.message || 'An error occurred');
        console.error('API call failed:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, dependencies);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiCall();
      setData(result);
    } catch (err) {
      setError(err.message || 'An error occurred');
      console.error('API call failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
};

// Specific hooks for different data types
export const useWeather = (lat, lon) => {
  return useApi(() => mockApiService.getCompleteWeather(lat, lon), [lat, lon]);
};

export const useSoilData = (zoneId) => {
  return useApi(() => mockApiService.getSoilData(zoneId), [zoneId]);
};

export const useCropPredictions = (season) => {
  return useApi(() => mockApiService.getCropPredictions(season), [season]);
};

export const useLocationData = () => {
  return useApi(() => mockApiService.getFarmingZones());
};

export const useDashboardData = () => {
  return useApi(() => mockApiService.getDashboardOverview());
};

export const useSystemHealth = () => {
  return useApi(() => mockApiService.getSystemHealth());
};
