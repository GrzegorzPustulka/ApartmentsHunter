// src/hooks/useSubscriptions.js
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { fetchSubscriptions, updateSubscriptionStatus, deleteSubscription } from '../utils/api';

const useSubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (token) {
      fetchSubscriptions(token).then(setSubscriptions);
    }
  }, [token]);

  const handleToggleStatus = async (id, newStatus) => {
    try {
      const updatedSubscription = await updateSubscriptionStatus(token, id, newStatus);
      setSubscriptions(subscriptions.map(sub =>
        sub.id === id ? { ...sub, status: updatedSubscription.status } : sub
      ));
    } catch (error) {
      console.error("Błąd podczas zmiany statusu subskrypcji:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Czy na pewno chcesz usunąć tę subskrypcję?");
    if (!confirmDelete) return;

    try {
      await deleteSubscription(token, id);
      setSubscriptions(subscriptions.map(sub =>
        sub.id === id ? { ...sub, status: 'deleted' } : sub
      ));
    } catch (error) {
      console.error("Błąd podczas usuwania subskrypcji:", error);
    }
  };

  return { subscriptions, handleToggleStatus, handleDelete };
};

export default useSubscriptions;
