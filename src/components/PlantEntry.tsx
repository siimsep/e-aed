/* eslint-disable @typescript-eslint/no-unused-vars */
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
  IonInput,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { add } from "ionicons/icons";
//import PlantForm from "./PlantForm";
import { collection, addDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import db from "../firebase";
interface ParamsId {
  plantId: string;
}
const PlantEntry: React.FC<ParamsId> = ({ plantId }) => {
  const [date, setDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  /*const { takePhoto } = usePhotoGallery();
    <IonFabButton onClick={() => takePhoto()}>
        <IonIcon icon={camera}></IonIcon>
      </IonFabButton> */
  const { handleSubmit, control, setValue, register } = useForm({
    defaultValues: {
      date: "",
      content: "",
      plantId: plantId,
    },
  });
  const onSubmit = async (data: any) => {
    try {
      const ref = await collection(db, "Entries");
      const newPlantEntry = await addDoc(ref, data);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
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
            <IonTitle>Lisa uus sissekanne</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setIsOpen(false)}>KATKESTA</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonContent className="ion-padding">
            <form onSubmit={handleSubmit(onSubmit)}>
              <IonItem>
                <IonLabel position="floating">Sisu</IonLabel>
                <IonInput {...register("content", {})} />
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Kuupäev</IonLabel>
                <IonInput
                  value={date.toISOString().substring(0, 10)}
                  type="date"
                  placeholder="none"
                  {...register("date", {})}
                />
              </IonItem>
              <div>
                <IonButton type="submit" onClick={() => setIsOpen(false)}>
                  Salvesta
                </IonButton>
              </div>
            </form>
          </IonContent>
        </IonContent>
      </IonModal>
    </IonContent>
  );
};

export default PlantEntry;