import { useEffect, useState } from "react";
import { db } from "./../Components/firebase/firebase";
import { collection, onSnapshot } from "firebase/firestore";

const useGetData = collectionName => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const getData = async () => {
      const collectionRef = collection(db, collectionName);
      // ===== firebase firestore realtime data update ======
      await onSnapshot(collectionRef, snapshot => {
        setData(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        setLoading(false);
      });
      
    };

    getData();
  }, [collectionName]);

  return { data, loading };
};

export default useGetData;
