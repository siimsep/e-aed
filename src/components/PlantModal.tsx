/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
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
  IonSelect,
  IonSelectOption,
  useIonToast,
} from "@ionic/react";
import { add, camera } from "ionicons/icons";
//import PlantForm from "./PlantForm";
import { query, collection, getDocs, addDoc } from "firebase/firestore";
import { useForm, Controller } from "react-hook-form";
import db from "../firebase";
import usePhotoGallery from "../hooks/usePhotoGallery";
function PlantModal() {
  const [date, setDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const { takePhoto } = usePhotoGallery();
  const { handleSubmit, control, setValue, register, reset } = useForm({
    defaultValues: {
      name: "",
      date: date.toISOString().substring(0, 10),
      description: "",
      peenar: "",
      photoUrl: "",
    },
  });
  const [present] = useIonToast();

  const presentToast = (position: "top" | "middle" | "bottom") => {
    present({
      message: "Taim ilusti salvestatud!",
      duration: 2000,
      position: position,
    });
  };
  const [peenraNimed, setPeenrad] = useState<any[]>([]);
  useEffect(() => {
    const fetchPeenraNimiArray = async () => {
      const q = query(collection(db, "Peenrad"));
      const querySnapshot = await getDocs(q);
      const dataArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPeenrad(dataArray);
    };
    fetchPeenraNimiArray();
  }, []);
  //const [photoUrl, setPhotoUrl] = useState<string>();

  const onSubmit = async (data: any) => {
    try {
      //data.photoUrl = photoUrl;
      const tempt = new Date(data.date);
      data.date = tempt;

      const ref = await collection(db, "Plants");
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
            <IonTitle>Lisa uus taim</IonTitle>
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
                {...register("name", {
                  required: "Sisesta midagi",
                })}
              />
            </IonItem>
            <IonFabButton disabled size="small" onClick={() => takePhoto()}>
              <IonIcon icon={camera}></IonIcon>
            </IonFabButton>
            <IonItem>
              <IonLabel position="floating">Lisainfo</IonLabel>
              <IonInput {...register("description", {})} />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Istutamise kuupäev</IonLabel>
              <IonInput
                value={date.toISOString().substring(0, 10)}
                type="date"
                placeholder="none"
                {...register("date", {})}
              />
            </IonItem>
            <IonItem>
              <Controller
                render={({ field }) => (
                  <IonSelect
                    interface="popover"
                    placeholder="Vali peenar"
                    value={field.value}
                    onIonChange={(e) => setValue("peenar", e.detail.value)}
                  >
                    {peenraNimed.map((peenar) => (
                      <IonSelectOption key={peenar.id} value={peenar.id}>
                        {peenar.peenraNimi}
                      </IonSelectOption>
                    ))}
                  </IonSelect>
                )}
                control={control}
                name="peenar"
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

export default PlantModal;
