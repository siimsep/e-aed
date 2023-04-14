/* eslint-disable @typescript-eslint/no-unused-vars */
import db from "../firebase";
import { collection, query, onSnapshot, where } from "firebase/firestore";
import { IonList, IonCardContent, IonCard } from "@ionic/react";
import { useEffect, useState } from "react";
interface ParamsId {
  plantId: string;
}
interface Entry {
  id: string;
  content: string;
  date: Date;
}
const EntryCard: React.FC<ParamsId> = ({ plantId }) => {
  const [plantNameArray, setPlantArray] = useState<any[]>([]);
  useEffect(() => {
    const q = query(
      collection(db, "users", localStorage.uid, "Entries"),
      where("plantId", "==", plantId)
    );
    const unsub = onSnapshot(q, (querySnapshot) => {
      const tempArray: Entry[] = [];
      querySnapshot.forEach((doc) => {
        var date = doc.data().date.toDate().toLocaleString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
        const plantData = {
          id: doc.id,
          content: doc.data().content,
          date: date,
        };
        tempArray.push(plantData);
      });
      setPlantArray(tempArray);
    });
  }, [plantId]);

  return (
    <IonList>
      {plantNameArray.map((item) => (
        <IonCard key={item.id}>
          <IonCardContent>
            {item.content}, {item.date}
          </IonCardContent>
        </IonCard>
      ))}
    </IonList>
  );
};
export default EntryCard;
