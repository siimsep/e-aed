import db from "../firebase";
import { collection, query, onSnapshot } from "firebase/firestore";
import { IonList, IonItem } from "@ionic/react";
import { useEffect, useState } from "react";

const PlantList = () => {
  const [plantNameArray, setPlantNameArray] = useState<string[]>([]);
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "Plants")),
      (querySnapshot) => {
        const tempArray: string[] = [];
        querySnapshot.forEach((doc) => {
          const plantName = doc.data().name;
          tempArray.push(plantName);
        });
        setPlantNameArray(tempArray);
      }
    );
    return unsubscribe;
  }, []);
  return (
    <IonList>
      {plantNameArray.map((name) => (
        <IonItem key={name}>{name}</IonItem>
      ))}
    </IonList>
  );
};
export default PlantList;
