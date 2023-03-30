import { useRef, useState } from "react";
import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonFab,
  IonFabButton,
  IonIcon,
  IonInput,
  IonTitle,
  IonLabel,
  IonItem,
  useIonToast,
} from "@ionic/react";
import { add } from "ionicons/icons";
import { addDoc, collection } from "firebase/firestore";
import db from "../firebase";

function GroupModal() {
  const [isOpen, setIsOpen] = useState(false);

  const [modelValue, setModelValue] = useState("");
  const inputEl = useRef<HTMLIonInputElement>(null);

  const handleIonInputChange = async (val: any) => {
    const input = val;

    setModelValue(input);

    const ionInputEl = inputEl.current;
    if (ionInputEl) {
      ionInputEl.value = input;
    }
  };

  const [present] = useIonToast();
  const presentToast = (position: "top" | "middle" | "bottom") => {
    present({
      message: "Peenar ilusti salvestatud!",
      duration: 1500,
      position: position,
    });
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const peenraRef = collection(db, "Peenrad");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const newPeenraDoc = await addDoc(peenraRef, {
        peenraNimi: modelValue,
      });
      presentToast("bottom");
      //console.log("Document written with ID: ", newPeenraDoc.id);
      setModelValue("");
    } catch (error) {
      //console.error("Error adding document: ", error);
    }
  };

  return (
    <IonContent>
      <IonFab vertical="bottom" horizontal="start">
        <IonFabButton onClick={() => setIsOpen(true)}>
          <IonIcon icon={add}></IonIcon>
        </IonFabButton>
      </IonFab>
      <IonModal isOpen={isOpen}>
        <IonHeader>
          <IonToolbar>
            {" "}
            <IonTitle>Lisa uus peenar</IonTitle>
            <IonButtons slot="end">
              <IonButton
                onClick={() => {
                  setIsOpen(false);
                  setModelValue("");
                }}
              >
                KATKESTA
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <form onSubmit={handleFormSubmit}>
            <IonItem>
              <IonLabel position="floating">Peenra nimi</IonLabel>
              <IonInput
                ref={inputEl}
                value={modelValue}
                onIonInput={(e: any) => handleIonInputChange(e.target.value)}
              ></IonInput>
            </IonItem>
            <IonButton type="submit" onClick={() => setIsOpen(false)}>
              Salvesta
            </IonButton>
          </form>
          <IonButtons slot="end">
            <IonButton onClick={() => setIsOpen(false)}>Katkesta</IonButton>
          </IonButtons>
        </IonContent>
      </IonModal>
    </IonContent>
  );
}

export default GroupModal;
