import React, { useContext, useEffect } from 'react';
import { Snackbar } from '@mui/material';
import { NotificationContext } from './NotificationContext';

export const Notification = () => {
    const { notifications, removeNotification } = useContext(NotificationContext);

    return (
        <>
            {notifications.map((notification, index) => (
                <Snackbar
                    key={index}
                    open
                    autoHideDuration={notification.duration || 3000}
                    onClose={() => removeNotification(notification)}
                    message={notification.message}
                    severity={notification.severity}
                />
            ))}
        </>
    );
};
