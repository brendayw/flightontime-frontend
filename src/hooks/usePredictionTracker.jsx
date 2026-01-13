import { useState } from 'react';
import { trackPrediction } from '../api/prediction.api';

export const usePredictionTracker = (predictionId) => {
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleTracking = async (value) => {
    setEnabled(value);
    setLoading(true);

    try {
      if (value) {
        await trackPrediction({
          predictionId,
          notifyBy: ['EMAIL'],
          threshold: 0.8,
        });
      }
    } catch (e) {
      setEnabled(false);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  return { enabled, toggleTracking, loading };
};