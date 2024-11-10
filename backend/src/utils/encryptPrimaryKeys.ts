import { encrypt } from "./encrypt";

export const encryptPrimaryKeys = (object: any, callstackid = 1): any => {
  if (object === null || typeof object !== "object") return object;

  callstackid++;

  if (Array.isArray(object)) {
    return object.map(encryptPrimaryKeys, callstackid);
  }

  const encryptedObject: any = { ...object };

  for (const key in encryptedObject) {
    if (!encryptedObject[key]) continue;

    if (key.endsWith("Id")) {
      encryptedObject[key] = encrypt(encryptedObject[key].toString());

      continue;
    }

    encryptedObject[key] = encryptPrimaryKeys(
      encryptedObject[key],
      callstackid
    );
  }

  return encryptedObject;
};
