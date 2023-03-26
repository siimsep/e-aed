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
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const peenraRef = collection(db, "Peenrad");
      const newPeenraDoc = await addDoc(peenraRef, {
        peenraNimi: modelValue,
      });
      console.log("Document written with ID: ", newPeenraDoc.id);
      setModelValue("");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <IonContent className="ion-padding">
      <IonFab vertical="top" horizontal="start">
        <IonFabButton onClick={() => setIsOpen(true)}>
          <IonIcon icon={add}></IonIcon>
        </IonFabButton>
      </IonFab>
      <IonModal isOpen={isOpen}>
        <IonHeader>
          <IonToolbar>
            <form onSubmit={handleFormSubmit}>
              <IonInput
                placeholder="Sisesta peenra nimi"
                ref={inputEl}
                value={modelValue}
                onIonInput={(e: any) => handleIonInputChange(e.target.value)}
              ></IonInput>
              <IonButton type="submit" onClick={() => setIsOpen(false)}>
                Salvesta
              </IonButton>
            </form>
            <IonButtons slot="end">
              <IonButton onClick={() => setIsOpen(false)}>Katkesta</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
      </IonModal>
    </IonContent>
  );
}

export default GroupModal;
