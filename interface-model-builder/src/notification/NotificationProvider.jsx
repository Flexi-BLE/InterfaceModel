// NotificationProvider.js

import React, { useState, useCallback } from 'react';
import { NotificationContext } from './NotificationContext';

export const NotificationProvider = ({ children }) => {
	const [notifications, setNotifications] = useState([]);

	const addNotification = useCallback((notification) => {
		setNotifications((prevNotifications) => [...prevNotifications, notification]);
	}, []);

	const removeNotification = useCallback((notificationToRemove) => {
		setNotifications((prevNotifications) => prevNotifications.filter(
			(notification) => notification !== notificationToRemove
		));
	}, []);

	return (
		<NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
			{children}
		</NotificationContext.Provider>
	);
};
