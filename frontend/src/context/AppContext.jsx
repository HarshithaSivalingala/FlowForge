import { createContext, useContext, useState, useEffect } from "react";
import { api } from "../services/api";

const AppContext = createContext(undefined);

export const AppProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [workOrders, setWorkOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState("login");
  const [currentOrderId, setCurrentOrderId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      loadWorkOrders();
    }
  }, [isAuthenticated]);

  const loadWorkOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const orders = await api.workOrders.getAll();
      setWorkOrders(orders);
      console.log(orders, "www");
    } catch (err) {
      setError(err.message);
      console.error("Error loading work orders:", err);
    } finally {
      setLoading(false);
    }
  };

  const login = (username, password) => {
    if (username && password) {
      setIsAuthenticated(true);
      setCurrentPage("home");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentPage("login");
    setWorkOrders([]);
  };

  const updateWorkOrder = async (updatedOrder) => {
    try {
      setLoading(true);
      await api.workOrders.update(updatedOrder.id, updatedOrder);
      setWorkOrders((prev) =>
        prev.map((order) =>
          order.id === updatedOrder.id ? updatedOrder : order
        )
      );
    } catch (err) {
      setError(err.message);
      console.error("Error updating work order:", err);
    } finally {
      setLoading(false);
    }
  };

  const addWorkOrder = async (newOrder) => {
    try {
      setLoading(true);
      const created = await api.workOrders.create(newOrder);
      setWorkOrders((prev) => [...prev, created]);
      return created;
    } catch (err) {
      setError(err.message);
      console.error("Error creating work order:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getWorkOrderById = async (orderId) => {
    try {
      setLoading(true);
      setError(null);

      const order = await api.workOrders.getById(orderId);
      return order;
    } catch (err) {
      setError(err.message);
      console.error("Error fetching work order by id:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const navigateTo = (page, orderId) => {
    setCurrentPage(page);
    if (orderId) {
      setCurrentOrderId(orderId);
    } else {
      setCurrentOrderId(null);
    }
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        workOrders,
        updateWorkOrder,
        addWorkOrder,
        getWorkOrderById,
        currentPage,
        navigateTo,
        currentOrderId,
        loading,
        error,
        loadWorkOrders,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
};
