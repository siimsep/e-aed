import {
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";
import { useForm } from "react-hook-form";
import db from "../firebase";
function BlankCalendar() {
  const [isOpen, setIsOpen] = useState(false);
  const { handleSubmit, setValue, register, reset } = useForm({
    defaultValues: {
      description: "",
      date: "",
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
  const onSubmit = async (data: any) => {
    try {
      //const tempt = new Date(data.date);
      //data.date = tempt;
      const ref = await collection(db, "CalendarEntries");
      const newEvent = await addDoc(ref, data);
      reset();
      presentToast("bottom");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  function calClick(e: any) {
    setIsOpen(true);
    const calDate = e.detail.value;
    setValue("date", calDate);
    console.log(calDate);
  }
  return (
    <>
      <IonDatetime
        onIonChange={calClick}
        presentation="date"
        locale="et-Et"
        firstDayOfWeek={1}
      ></IonDatetime>
      <IonModal className="calmod" isOpen={isOpen}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Uus sündmus</IonTitle>
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
              <IonLabel position="floating">Kirjeldus</IonLabel>
              <IonInput
                {...register("description", {
                  required: "Sisesta midagi",
                })}
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
    </>
  );
}
export default BlankCalendar;
