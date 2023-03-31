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
  useIonToast,
} from "@ionic/react";
import { add, camera } from "ionicons/icons";
import { collection, addDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import db from "../firebase";
import PhotoGallery from "../hooks/usePhotoGallery";
function GroupModal() {
  const [date, setDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const { handleSubmit, control, setValue, register, reset } = useForm({
    defaultValues: {
      peenraNimi: "",
      date: date.toISOString().substring(0, 10),
      description: "",
      photoUrl: "",
    },
  });
  const [present] = useIonToast();
  const presentToast = (position: "top" | "middle" | "bottom") => {
    present({
      message: "Peenar ilusti salvestatud!",
      duration: 2000,
      position: position,
    });
  };

  const handleButtonClick = async () => {
    const str: any = await PhotoGallery();
    console.log("inside handlebuttonclick", str);
    setValue("photoUrl", str);
  };
  const onSubmit = async (data: any) => {
    try {
      const tempt = new Date(data.date);
      data.date = tempt;
      const ref = await collection(db, "Peenrad");
      const newPlant = await addDoc(ref, data);
      reset();
      presentToast("bottom");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  return (
    <IonContent className="ion-padding">
      <IonFab slot="fixed" vertical="bottom" horizontal="start">
        <IonFabButton onClick={() => setIsOpen(true)}>
          <IonIcon icon={add}></IonIcon>
        </IonFabButton>
      </IonFab>
      <IonModal isOpen={isOpen}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Lisa uus peenar</IonTitle>
            <IonButtons slot="end">
              <IonButton
                onClick={() => {
                  setIsOpen(false);
                  reset();
                }}
              >
                KATKESTA
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <form onSubmit={handleSubmit(onSubmit)}>
            <IonItem>
              <IonLabel position="floating">Nimi</IonLabel>
              <IonInput
                {...register("peenraNimi", {
                  required: "Sisesta midagi",
                })}
              />
            </IonItem>
            <IonFabButton size="small" onClick={() => handleButtonClick()}>
              <IonIcon icon={camera}></IonIcon>
            </IonFabButton>
            <IonItem>
              <IonLabel position="floating">Lisainfo</IonLabel>
              <IonInput {...register("description", {})} />
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
      </IonModal>
    </IonContent>
  );
}

export default GroupModal;
