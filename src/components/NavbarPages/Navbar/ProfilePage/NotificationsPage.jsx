import React, { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../../firebase/firebase';
import { useAuth } from '../../../../firebase/AuthContext';
import { IoCheckmarkDone } from 'react-icons/io5';

const NotificationsPage = () => {
  const { currentUser } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!currentUser) return;

    const q = query(
      collection(db, 'notifications'),
      where('userId', '==', currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, 
      (querySnapshot) => {
        const notes = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          notes.push({
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toDate() || new Date(),
            readAt: data.readAt?.toDate() || null,
            // Ensure read field exists
            read: data.read || false
          });
        });
        
        const sortedNotifications = notes.sort((a, b) => {
          if (a.read !== b.read) return a.read ? 1 : -1;
          return b.createdAt - a.createdAt;
        });
        
        setNotifications(sortedNotifications);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching notifications:", error);
        setError("Error loading notifications");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [currentUser]);

  const markAsRead = async (notificationId) => {
    if (!currentUser) {
      setError("You must be logged in");
      return;
    }

    try {
      // Immediate local update
      setNotifications(prev => prev.map(n => 
        n.id === notificationId ? { ...n, locallyRead: true } : n
      ));

      // Create update object strictly following rules
      const updateData = {
        read: true,
        readAt: serverTimestamp()
      };

      // Update in Firebase
      await updateDoc(doc(db, 'notifications', notificationId), updateData);
    } catch (error) {
      console.error("Error marking as read:", error);
      setError("You don't have permission to update this notification or it's already read");
      
      // Revert local update
      setNotifications(prev => prev.map(n => 
        n.id === notificationId ? { ...n, locallyRead: false } : n
      ));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded-lg mb-4">
        {error}
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <h1 className="text-2xl font-bold mb-6">Notifications</h1>
      
      {notifications.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No new notifications
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map((notification) => {
            const isRead = notification.read || notification.locallyRead;
            return (
              <div 
                key={notification.id} 
                className={`border rounded-lg p-4 transition-all duration-200 ${
                  isRead 
                    ? 'bg-gray-50 border-gray-200' 
                    : 'bg-blue-50 border-blue-200 shadow-sm'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className={`font-semibold ${
                        isRead ? 'text-gray-800' : 'text-blue-800'
                      }`}>
                        {notification.title}
                      </h3>
                      
                      {!isRead && (
                        <button 
                          onClick={() => markAsRead(notification.id)}
                          className="flex items-center gap-1 px-2 py-1 bg-white border border-blue-200 text-blue-600 rounded-md text-xs hover:bg-blue-50 transition-colors"
                          title="Mark as read"
                        >
                          <IoCheckmarkDone size={14} />
                          <span>Done</span>
                        </button>
                      )}
                    </div>
                    
                    <p className={`mt-1 text-sm ${
                      isRead ? 'text-gray-600' : 'text-blue-700'
                    }`}>
                      {notification.message}
                    </p>
                    
                    {notification.additionalNote && (
                      <div className={`mt-2 p-2 rounded text-sm ${
                        isRead ? 'bg-gray-100 text-gray-700' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {notification.additionalNote}
                      </div>
                    )}
                    
                    <div className="mt-2 text-xs text-gray-500">
                      <div>Sent: {notification.createdAt.toLocaleString()}</div>
                      {notification.readAt && (
                        <div>Read at: {notification.readAt.toLocaleString()}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;