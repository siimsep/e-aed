import { doc, deleteDoc } from "firebase/firestore";
import db from "../firebase";

async function DeletePlant(plantId: string) {
  if (true) {
    try {
      await deleteDoc(doc(db, "users", localStorage.uid, "Plants", plantId));

      console.log("deleted");
    } catch (error) {
      console.log("delete backfired, err: ", error);
    }
  }
}

export default DeletePlant;
