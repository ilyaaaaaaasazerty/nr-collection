/**
 * Data Service for NR Collection
 * Handles saving and retrieving orders.
 * Currently uses LocalStorage for persistence.
 */

import { db } from '../firebase'
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc, query, orderBy, Timestamp } from 'firebase/firestore'

const ORDERS_KEY = 'nr_collection_orders';
const COLLECTION_NAME = 'orders';

// Helper to check if Firebase is configured
const isFirebaseConfigured = () => {
    try {
        // Check if the projectId is still the default placeholder
        const config = db.app.options;
        return config && config.projectId && config.projectId !== "YOUR_PROJECT_ID";
    } catch (e) {
        return false;
    }
};

export const dataService = {
    // Save a new order
    saveOrder: async (orderData) => {
        try {
            const newOrder = {
                ...orderData,
                date: new Date().toISOString(),
                status: 'جديد',
            };

            if (isFirebaseConfigured()) {
                const docRef = await addDoc(collection(db, COLLECTION_NAME), {
                    ...newOrder,
                    createdAt: Timestamp.now()
                });
                return { success: true, id: docRef.id, order: newOrder };
            } else {
                // Fallback to LocalStorage
                const orders = await dataService.getOrders();
                const localOrder = { ...newOrder, id: Date.now().toString() };
                const updatedOrders = [localOrder, ...orders];
                localStorage.setItem(ORDERS_KEY, JSON.stringify(updatedOrders));
                return { success: true, order: localOrder };
            }
        } catch (error) {
            console.error('Error saving order:', error);
            return { success: false, error: error.message };
        }
    },

    // Get all orders
    getOrders: async () => {
        try {
            if (isFirebaseConfigured()) {
                const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
                const querySnapshot = await getDocs(q);
                return querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
            } else {
                const ordersJson = localStorage.getItem(ORDERS_KEY);
                return ordersJson ? JSON.parse(ordersJson) : [];
            }
        } catch (error) {
            console.error('Error getting orders:', error);
            return [];
        }
    },

    // Update order status
    updateOrderStatus: async (orderId, newStatus) => {
        try {
            if (isFirebaseConfigured()) {
                const orderRef = doc(db, COLLECTION_NAME, orderId);
                await updateDoc(orderRef, { status: newStatus });
                return { success: true };
            } else {
                const orders = await dataService.getOrders();
                const updatedOrders = orders.map(order =>
                    order.id === orderId ? { ...order, status: newStatus } : order
                );
                localStorage.setItem(ORDERS_KEY, JSON.stringify(updatedOrders));
                return { success: true };
            }
        } catch (error) {
            console.error('Error updating status:', error);
            return { success: false };
        }
    },

    // Delete an order
    deleteOrder: async (orderId) => {
        try {
            if (isFirebaseConfigured()) {
                await deleteDoc(doc(db, COLLECTION_NAME, orderId));
                return { success: true };
            } else {
                const orders = await dataService.getOrders();
                const updatedOrders = orders.filter(order => order.id !== orderId);
                localStorage.setItem(ORDERS_KEY, JSON.stringify(updatedOrders));
                return { success: true };
            }
        } catch (error) {
            console.error('Error deleting order:', error);
            return { success: false };
        }
    }
};
