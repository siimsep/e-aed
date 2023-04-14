import {
  IonItem,
  IonCard,
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonInput,
  IonLabel,
  IonModal,
  IonTitle,
  IonToolbar,
  useIonToast,
  IonList,
} from "@ionic/react";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { add } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import db from "../firebase";
//import { format, parse } from "date-fns";

function CalEntry(calDate: any) {
  const [isOpen, setIsOpen] = useState(false);
  const { handleSubmit, register, reset } = useForm({
    defaultValues: {
      description: "",
      completed: false,
      date: "",
    },
  });
  const [present] = useIonToast();
  const presentToast = (position: "top" | "middle" | "bottom") => {
    present({
      message: "Kalendrisse ülesanne salvestatud!",
      duration: 2000,
      position: position,
    });
  };
  const onSubmit = async (data: any) => {
    try {
      data.date = calDate.calDate;
      const ref = await collection(
        db,
        "users",
        localStorage.uid,
        "CalendarEntries"
      ); // gets db reference
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const newEvent = await addDoc(ref, data); // saves entry in db
      reset(); // resets form
      presentToast("bottom"); // displays success message in the bottom
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    if (!calDate.calDate) {
      return;
    }
    const unsubscribe = onSnapshot(
      query(
        collection(db, "users", localStorage.uid, "CalendarEntries"),
        where("date", "==", calDate.calDate)
      ),
      (querySnapshot) => {
        const tempArray: any[] = [];
        querySnapshot.forEach((doc) => {
          const taskData = {
            id: doc.id,
            description: doc.data().description,
            completed: doc.data().completed,
          };
          tempArray.push(taskData);
        });
        setTasks(tempArray);
      }
    );
    return unsubscribe;
  }, [calDate.calDate]);

  return (
    <>
      <IonCard>
        <IonList>
          {tasks.map((item) => (
            <IonItem key={item.description}>{item.description}</IonItem>
          ))}
        </IonList>
      </IonCard>
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
      <IonFab slot="fixed" vertical="bottom" horizontal="start">
        <IonFabButton onClick={() => setIsOpen(true)}>
          <IonIcon icon={add}></IonIcon>
        </IonFabButton>
      </IonFab>
    </>
  );
}

export default CalEntry;
