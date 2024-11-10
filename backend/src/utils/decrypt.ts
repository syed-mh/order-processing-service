import crypto from "crypto";

const ENCRYPTION_KEY =
  process.env.ENCRYPTION_KEY || "SUPER_SECRET_32_CHARACTERS_KEY_";

export const decrypt = (encryptedText: string): string => {
  const textParts = encryptedText.split(":");
  const iv = Buffer.from(textParts.shift()!, "hex");
  const encryptedTextBuffer = Buffer.from(textParts.join(":"), "hex");

  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(ENCRYPTION_KEY),
    iv
  );

  let decrypted = decipher.update(encryptedTextBuffer, undefined, "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
};
