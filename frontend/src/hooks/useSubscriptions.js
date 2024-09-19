// src/hooks/useSubscriptions.js
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { fetchSubscriptions, deleteSubscription, toggleSubscriptionStatus } from '../utils/api';

const useSubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (token) {
      fetchSubscriptions(token).then(setSubscriptions);
    }
  }, [token]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Czy na pewno chcesz usunąć tę subskrypcję?");
    if (!confirmDelete) return;

    try {
      await deleteSubscription(token, id);
      setSubscriptions(subscriptions.filter(sub => sub.id !== id));
    } catch (error) {
      console.error("Błąd podczas usuwania subskrypcji:", error);
    }
  };

  const handleToggleStatus = async (id, isPaused) => {
    try {
      const updatedSubscription = await toggleSubscriptionStatus(token, id, isPaused);
      setSubscriptions(subscriptions.map(sub =>
        sub.id === id ? { ...sub, is_paused: updatedSubscription.is_paused } : sub
      ));
    } catch (error) {
      console.error("Błąd podczas zmiany statusu subskrypcji:", error);
    }
  };

  return { subscriptions, handleDelete, handleToggleStatus };
};

export default useSubscriptions;
