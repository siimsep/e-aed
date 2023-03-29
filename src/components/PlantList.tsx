import db from "../firebase";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { IonList, IonItem } from "@ionic/react";
import { useEffect, useState } from "react";

const PlantList = () => {
  const [plantNameArray, setPlantArray] = useState<any[]>([]);
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "Plants"), orderBy("name")),
      (querySnapshot) => {
        const tempArray: any[] = [];
        querySnapshot.forEach((doc) => {
          const plantData = { id: doc.id, name: doc.data().name };
          tempArray.push(plantData);
        });
        setPlantArray(tempArray);
      }
    );
    return unsubscribe;
  }, []);

  return (
    <IonList>
      {plantNameArray.map((item) => (
        <IonItem href={`/tab1/${item.id}`} key={item.name}>
          {item.name}
        </IonItem>
      ))}
    </IonList>
  );
};
export default PlantList;
