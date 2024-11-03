import { useState, useEffect, useContext, useCallback } from 'react';
import { AuthContext } from '../context/AuthContext';
import { fetchSubscriptions, updateSubscriptionStatus, deleteSubscription } from '../utils/api';

const useSubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const { token } = useContext(AuthContext);

  const fetchSubscriptionsData = useCallback(async () => {
    if (token) {
      try {
        const data = await fetchSubscriptions(token);
        setSubscriptions(data);
      } catch (error) {
        console.error("Błąd podczas pobierania subskrypcji:", error);
      }
    }
  }, [token]);

  useEffect(() => {
    fetchSubscriptionsData();
  }, [fetchSubscriptionsData]);

  const handleToggleStatus = async (id, newStatus) => {
    try {
      await updateSubscriptionStatus(token, id, newStatus);
      setSubscriptions(prevSubscriptions =>
        prevSubscriptions.map(sub =>
          sub.id === id ? { ...sub, status: newStatus } : sub
        )
      );
    } catch (error) {
      console.error("Błąd podczas zmiany statusu subskrypcji:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteSubscription(token, id);
      setSubscriptions(prevSubscriptions =>
        prevSubscriptions.filter(sub => sub.id !== id)
      );
    } catch (error) {
      console.error("Błąd podczas usuwania subskrypcji:", error);
    }
  };

  return { subscriptions, handleToggleStatus, handleDelete };
};

export default useSubscriptions;
