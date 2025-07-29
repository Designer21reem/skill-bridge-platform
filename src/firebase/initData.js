import { db, auth } from './firebase';
import { doc, setDoc, collection, addDoc, getDoc, updateDoc, arrayUnion, query, where, getDocs } from 'firebase/firestore';

// تعريف معرف الأدمن
const ADMIN_UID = 'your-admin-user-id-here';

// تهيئة بيانات المستخدم والمهام
const initializeData = async () => {
  const user = auth.currentUser;

  if (!user) {
    console.log('لا يوجد مستخدم مصادق عليه');
    throw new Error('يجب تسجيل الدخول أولاً');
  }

  try {
    // التحقق من وجود مستند المستخدم
    const userRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userRef);
    
    // تعيين المعلومات الأساسية فقط إذا لم يكن المستند موجوداً
    if (!userDoc.exists()) {
      await setDoc(userRef, {
        name: user.displayName || "مستخدم جديد",
        email: user.email,
        points: 0,
        completedTasks: [],
        role: "user",
        lastUpdated: new Date()
      });
    }

    // فقط الأدمن يمكنه إنشاء مهام أولية
    if (user.uid === ADMIN_UID) {
      const tasksSnapshot = await getDocs(collection(db, 'tasks'));
      if (tasksSnapshot.empty) {
        const tasksRef = collection(db, 'tasks');
        await addDoc(tasksRef, {
          title: "تصميم شعار",
          description: "إنشاء شعار عصري للعميل",
          points: 120,
          deadline: "2025-08-15",
          createdAt: new Date(),
          createdBy: user.uid,
          available: true,
          status: "new",
          category: "design"
        });

        await addDoc(tasksRef, {
          title: "إعادة تصميم الموقع",
          description: "إعادة تصميم الموقع الرئيسي",
          points: 200,
          deadline: "2025-08-20",
          createdAt: new Date(),
          createdBy: user.uid,
          available: true,
          status: "new",
          category: "development"
        });
      }
    }
  } catch (error) {
    console.error("خطأ في تهيئة البيانات: ", error);
    throw error;
  }
};

// الحصول على جميع المهام المتاحة
export const getAllTasks = async () => {
  try {
    const q = query(collection(db, "tasks"), where("available", "==", true));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("خطأ في جلب المهام: ", error);
    throw new Error("فشل في جلب المهام");
  }
};

// إكمال المهمة
export const completeTask = async (userId, taskId) => {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      completedTasks: arrayUnion({
        taskId,
        completedAt: new Date(),
        approved: false
      }),
      lastUpdated: new Date()
    });
  } catch (error) {
    console.error("خطأ في إكمال المهمة: ", error);
    throw new Error("فشل في إكمال المهمة");
  }
};

// الموافقة على المهمة
export const approveTask = async (userId, taskId, points) => {
  try {
    // التحقق من أن المستخدم الحالي هو أدمن
    const adminRef = doc(db, "users", auth.currentUser.uid);
    const adminDoc = await getDoc(adminRef);
    
    if (!adminDoc.exists() || adminDoc.data().role !== "admin") {
      throw new Error("غير مصرح: يجب أن تكون أدمن");
    }

    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      throw new Error("المستخدم غير موجود");
    }

    const updatedTasks = userDoc.data().completedTasks.map(task => 
      task.taskId === taskId ? { ...task, approved: true } : task
    );

    await updateDoc(userRef, {
      completedTasks: updatedTasks,
      points: (userDoc.data().points || 0) + points,
      lastUpdated: new Date()
    });
  } catch (error) {
    console.error("خطأ في الموافقة على المهمة: ", error);
    throw error;
  }
};

export default initializeData;