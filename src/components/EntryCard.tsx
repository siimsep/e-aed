/* eslint-disable @typescript-eslint/no-unused-vars */
import db from "../firebase";
import { collection, query, onSnapshot, where } from "firebase/firestore";
import { IonList, IonCardContent, IonCard } from "@ionic/react";
import { useEffect, useState } from "react";
interface ParamsId {
  plantId: string;
}
interface Entry {
  content: string;
  date: string;
}
const EntryCard: React.FC<ParamsId> = ({ plantId }) => {
  const [plantNameArray, setPlantArray] = useState<any[]>([]);
  useEffect(() => {
    const q = query(collection(db, "Entries"), where("plantId", "==", plantId));
    const unsub = onSnapshot(q, (querySnapshot) => {
      const tempArray: Entry[] = [];
      querySnapshot.forEach((doc) => {
        const plantData = {
          content: doc.data().content,
          date: doc.data().date,
        };
        tempArray.push(plantData);
      });
      setPlantArray(tempArray);
    });
  }, [plantId]);

  return (
    <IonList>
      {plantNameArray.map((item) => (
        <IonCard>
          <IonCardContent>
            {item.content}, {item.date}
          </IonCardContent>
        </IonCard>
      ))}
    </IonList>
  );
};
export default EntryCard;
