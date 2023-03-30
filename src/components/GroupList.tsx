import db from "../firebase";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import {
  IonItem,
  IonAccordion,
  IonLabel,
  IonAccordionGroup,
  IonText,
} from "@ionic/react";
import { useEffect, useState } from "react";

const GroupList = () => {
  const [groupArray, setGroupArray] = useState<any[]>([]);
  const [plantArray, setPlantArray] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "Peenrad"), orderBy("peenraNimi")),
      (querySnapshot) => {
        const tempArray: any[] = [];
        querySnapshot.forEach((doc) => {
          const groupData = { id: doc.id, name: doc.data().peenraNimi };
          tempArray.push(groupData);
          //const peenraNimi = doc.data().peenraNimi;
          //tempArray.push(peenraNimi);
        });
        setGroupArray(tempArray);
      }
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const unsubscribe2 = onSnapshot(
      query(collection(db, "Plants")),
      (querySnapshot) => {
        const tempArray: any[] = [];
        querySnapshot.forEach((doc) => {
          const plantData = {
            id: doc.id,
            name: doc.data().name,
            groupId: doc.data().peenar,
          };
          tempArray.push(plantData);
        });
        setPlantArray(tempArray);
      }
    );
    return unsubscribe;
  }, []);
  return (
    <IonAccordionGroup>
      {groupArray.map((item) => (
        <IonAccordion key={item.name} value={item.name}>
          <IonItem slot="header" color="light">
            <IonLabel>{item.name}</IonLabel>
          </IonItem>
          <div className="ion-padding" slot="content">
            <a href={`/tab2/${item.id}`}>Vaata peenart</a>
            {plantArray.map((element) => {
              if (item.id === element.groupId) {
                return (
                  <IonItem href={`/tab1/${element.id}`} key={element.name}>
                    {element.name}
                  </IonItem>
                );
              }
              return null;
            })}
          </div>
        </IonAccordion>
      ))}
    </IonAccordionGroup>
  );
};
export default GroupList;
