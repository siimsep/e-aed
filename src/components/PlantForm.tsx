import {
  IonButton,
  IonContent,
  IonFabButton,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonSelect,
  IonSelectOption,
  IonText,
} from "@ionic/react";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
} from "firebase/firestore";
import { camera } from "ionicons/icons";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import db from "../firebase";
import { usePhotoGallery } from "../hooks/usePhotoGallery";
interface PlantFormProps {
  handleClose: () => void;
}
function PlantForm({ handleClose }: PlantFormProps) {
  const { takePhoto } = usePhotoGallery();
  /*  <IonFabButton onClick={() => takePhoto()}>
        <IonIcon icon={camera}></IonIcon>
      </IonFabButton> */
  const {
    handleSubmit,
    control,
    setValue,
    register,
    getValues,
    formState: { errors },
  } = useForm({
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
      const newDoc = await addDoc(ref, data);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  return (
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
          <IonButton type="submit" onClick={handleClose}>
            Salvesta
          </IonButton>
        </div>
      </form>
    </IonContent>
  );
}
export default PlantForm;
