import db from "../firebase";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import {
  IonItem,
  IonAccordion,
  IonLabel,
  IonAccordionGroup,
} from "@ionic/react";
import { useEffect, useState } from "react";

const GroupList = () => {
  const [peenraNimiArray, setPeenraNimiArray] = useState<string[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "Peenrad"), orderBy("peenraNimi")),
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
    <IonAccordionGroup>
      {peenraNimiArray.map((peenraNimi) => (
        <IonAccordion key={peenraNimi} value={peenraNimi}>
          <IonItem slot="header" color="light">
            <IonLabel>{peenraNimi}</IonLabel>
          </IonItem>
          <div className="ion-padding" slot="content">
            Siia tulevad taimed
          </div>
        </IonAccordion>
      ))}
    </IonAccordionGroup>
  );
};
export default GroupList;
