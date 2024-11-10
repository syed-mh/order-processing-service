import { decrypt } from "./decrypt";

export const decryptPrimaryKey = (primaryKey: string): string => {
  return decrypt(primaryKey);
};
