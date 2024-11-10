"use client";

type props = {
  metaKey: string;
  metaValue: string;
};

export const UserMeta = ({ metaKey, metaValue }: props) => (
  <p>
    <span className="font-semibold">{metaKey}:</span> {metaValue}
  </p>
);
