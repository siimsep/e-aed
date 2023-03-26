import db from "../firebase";
import { collection, query, onSnapshot } from "firebase/firestore";
import { IonList, IonItem } from "@ionic/react";
import { useEffect, useState } from "react";

const GroupList = () => {
  const [peenraNimiArray, setPeenraNimiArray] = useState<string[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "Peenrad")),
      (querySnapshot) => {
        const tempArray: string[] = [];
        querySnapshot.forEach((doc) => {
          const peenraNimi = doc.data().peenraNimi;
          tempArray.push(peenraNimi);
        });
        setPeenraNimiArray(tempArray);
      }
    );
    return unsubscribe;
  }, []);
  return (
    <IonList>
      {peenraNimiArray.map((peenraNimi) => (
        <IonItem key={peenraNimi}>{peenraNimi}</IonItem>
      ))}
    </IonList>
  );
};
export default GroupList;
