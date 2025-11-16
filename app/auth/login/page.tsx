"use client";

import AquaQAButton from "../../components/AquaQAButton";

export default function Login() {
  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center">
      <img className="h-10 w-10" src="/aquaQA.svg" alt="Logo" />
      <div className="flex flex-col items-center">
        <h1 className="text-primary text-center text-5xl font-bold">Iniciar sesión</h1>
        <h3 className="mt-4 text-center text-xl font-semibold text-gray-200">
          Bienvenido, por favor ingrese sus datos
        </h3>
        <AquaQAButton
          variant="primary"
          text="Iniciar sesión"
          iconSize={40}
          className="h-14 w-72 text-xl"
          onClick={() => console.log("login")}
        />
      </div>
    </div>
  );
}
