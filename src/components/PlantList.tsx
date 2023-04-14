import db from "../firebase";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { IonList, IonItem, IonSearchbar, IonToolbar } from "@ionic/react";
import { useEffect, useState } from "react";

const PlantList = () => {
  const [plantNameArray, setPlantArray] = useState<any[]>([]);
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "users", localStorage.uid, "Plants"),
        orderBy("name")
      ),
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
    <>
      <IonToolbar>
        <IonSearchbar
          animated={true}
          placeholder="Otsi taime"
          showClearButton="focus"
        ></IonSearchbar>
      </IonToolbar>
      <IonList>
        {plantNameArray.map((item) => (
          <IonItem href={`/tab1/${item.id}`} key={item.name}>
            {item.name}
          </IonItem>
        ))}
      </IonList>
    </>
  );
};
export default PlantList;
