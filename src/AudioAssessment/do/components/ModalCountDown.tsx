import React, { useEffect, useState } from "react";
import { useModalContext } from "../../../context/ModalContext";

function ModalCountDown({ startRecording }: { startRecording: any }) {
  const { destroyModal } = useModalContext();

  const [count, setCount] = useState(3);

  useEffect(() => {
    const id = setInterval(() => {
      setCount((c) => c - 1);
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, []);

  if (count == 0) {
    startRecording();
    destroyModal();
  }

  return (
    <div
      style={{
        width: 500,
        height: 200,
        backgroundColor: "#fff",
        border: "1px solid #ccc",
        borderTop: "8px solid #3579c1",
        display: "grid",
        placeContent: "center",
        placeItems: "center",
      }}
    >
      <p
        style={{
          fontSize: 36,
          color: "#4b4848",
        }}
      >
        Recording will begin in...
      </p>
      <p
        className="count-down"
        style={{
          width: 50,
          height: 50,
          backgroundColor: "#ccc",
          borderRadius: "50%",
          display: "grid",
          placeContent: "center",
          fontSize: 20,
        }}
      >
        {count}
      </p>
    </div>
  );
}

export default ModalCountDown;
