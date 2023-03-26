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
} from "@ionic/react";
import { add } from "ionicons/icons";
//import PlantForm from "./PlantForm";
import { query, collection, getDocs, addDoc } from "firebase/firestore";
import { useForm, Controller } from "react-hook-form";
import db from "../firebase";

function PlantModal() {
  const [isOpen, setIsOpen] = useState(false);
  /*const { takePhoto } = usePhotoGallery();
    <IonFabButton onClick={() => takePhoto()}>
        <IonIcon icon={camera}></IonIcon>
      </IonFabButton> */
  const { handleSubmit, control, setValue, register } = useForm({
    defaultValues: {
      name: "",
      date: "",
      description: "",
      peenar: "",
    },
  });
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

  const onSubmit = async (data: any) => {
    try {
      const ref = await collection(db, "Plants");
      const newPlant = await addDoc(ref, data);
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
            <IonTitle>Lisa uus taim</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
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
              <IonItem>
                <IonLabel position="floating">Lisainfo</IonLabel>
                <IonInput {...register("description", {})} />
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Istutamise kuupäev</IonLabel>
                <IonInput {...register("date", {})} />
              </IonItem>
              <IonItem>
                <Controller
                  render={({ field }) => (
                    <IonSelect
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
        </IonContent>
      </IonModal>
    </IonContent>
  );
}

export default PlantModal;
