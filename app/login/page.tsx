"use client";

import AquaQAButton from "../components/AquaQAButton";

export default function Login() {
  return (
    <div className="flex h-full w-full flex-row">
      <div className="flex w-1/2 flex-col p-10">
        <div className="flex flex-row items-center gap-3.5">
          <img className="h-10 w-10" src="/aquaQA.svg" alt="Logo" />
          <h2 className="text-primary text-4xl font-bold">AquaQA</h2>
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-primary text-center text-5xl font-bold">Iniciar sesión</h1>
          <h3 className="mt-4 text-center text-xl font-semibold text-gray-200">
            Bienvenido, por favor ingrese sus datos
          </h3>
          <AquaQAButton
            variant="primary"
            text="Iniciar sesión"
            iconSize={40}
            className="w-72 h-14 text-xl"
            onClick={() => console.log("login")}
          />
        </div>
      </div>
      <div className="flex w-1/2 flex-col">
        <img className="object-fill" src="/images/bg-login.png" alt="bg-login" />
      </div>
    </div>
  );
}
