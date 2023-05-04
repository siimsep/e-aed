import db from "../firebase";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import {
  IonList,
  IonItem,
  IonSearchbar,
  IonToolbar,
  IonContent,
} from "@ionic/react";
import { useEffect, useState } from "react";
import PlantModal from "./PlantModal";

const PlantList = () => {
  const [plantArray, setPlantArray] = useState<any[]>([]);
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
      <IonContent>
        <IonToolbar>
          <IonSearchbar
            animated={true}
            placeholder="Otsi taime"
            showClearButton="focus"
          ></IonSearchbar>
        </IonToolbar>
        <IonList>
          {plantArray.map((item) => (
            <IonItem href={`/tab1/${item.id}`} key={item.name}>
              {item.name}
            </IonItem>
          ))}
        </IonList>
        <PlantModal />
      </IonContent>
    </>
  );
};
export default PlantList;
