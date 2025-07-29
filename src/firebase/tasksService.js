import { db } from './firebase';
import { collection, query, where, getDocs, doc, updateDoc, arrayUnion } from 'firebase/firestore';

export const getAllTasks = async () => {
  const q = query(collection(db, "tasks"), where("available", "==", true));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const completeTask = async (userId, taskId) => {
  // تحديث بيانات المستخدم بإضافة المهمة المكتملة
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, {
    completedTasks: arrayUnion({
      taskId,
      completedAt: new Date(),
      approved: false // تنتظر الموافقة
    })
  });
};

export const approveTask = async (userId, taskId, points) => {
  const userRef = doc(db, "users", userId);
  
  // أولاً: نجد المهمة في مصفوفة completedTasks
  const userDoc = await getDoc(userRef);
  const userData = userDoc.data();
  const updatedTasks = userData.completedTasks.map(task => {
    if (task.taskId === taskId) {
      return { ...task, approved: true };
    }
    return task;
  });

  // ثانياً: نحدث بيانات المستخدم
  await updateDoc(userRef, {
    completedTasks: updatedTasks,
    points: (userData.points || 0) + points
  });
};