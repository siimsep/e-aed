import { useState } from "react";
import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonFab,
  IonFabButton,
  IonIcon,
} from "@ionic/react";
import { add } from "ionicons/icons";
import PlantForm from "./PlantForm";

function PlantModal() {
  const [isOpen, setIsOpen] = useState(false);
  function handleClose() {
    setIsOpen(false);
  }
  return (
    <IonContent className="ion-padding">
      <IonFab slot="fixed" vertical="top" horizontal="start">
        <IonFabButton onClick={() => setIsOpen(true)}>
          <IonIcon icon={add}></IonIcon>
        </IonFabButton>
      </IonFab>
      <IonModal isOpen={isOpen}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Lisa uus taim</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <PlantForm handleClose={handleClose} />
        </IonContent>
      </IonModal>
    </IonContent>
  );
}

export default PlantModal;
