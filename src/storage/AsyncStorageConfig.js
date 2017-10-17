import Storage from "react-native-storage";
import {AsyncStorage} from "react-native";

export default storage = new Storage({
  size:5000,
  storageBackend: AsyncStorage,
  defaultExpires: null,
  enableCache: true,
})
