"use client";
import { useEffect, useState } from "react";
import Countdown from "@/components/Countdown";
import { DEADLINE_ISO, EVENTO_FIM_ISO } from "@/lib";
import { useVagas } from "@/components/vagasStore";

// Abaixo deste número, mostrar a barra seria prova social negativa: fica o contador.
const MINIMO_PARA_BARRA = 10;

export default function Vagas() {
  const dados = useVagas();
  const [encerrado, setEncerrado] = useState(false);
  const [realizado, setRealizado] = useState(false);
  useEffect(() => {
    const ver = () => {
      setEncerrado(Date.now() > new Date(DEADLINE_ISO).getTime());
      setRealizado(Date.now() > new Date(EVENTO_FIM_ISO).getTime());
    };
    ver();
    const id = setInterval(ver, 30000);
    return () => clearInterval(id);
  }, []);

  if (realizado) return <p className="cd-done">Foi incrível. Até o próximo!</p>;
  if (encerrado) return <p className="cd-done">Inscrições encerradas</p>;

  if (!dados || dados.inscritos < MINIMO_PARA_BARRA) {
    return (
      <>
        <p className="ticker-title">As inscrições encerram em</p>
        <Countdown />
      </>
    );
  }

  const ocupadas = Math.min(dados.inscritos, dados.vagas);
  const restam = dados.vagas - ocupadas;
  const esgotado = restam <= 0;

  return (
    <div className="vagas">
      <div className="vagas-top">
        <p className="vagas-num">
          {esgotado ? "Vagas esgotadas" : <><strong>{ocupadas}</strong> de {dados.vagas} vagas preenchidas</>}
        </p>
      </div>
      <div
        className="vagas-grid"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={dados.vagas}
        aria-valuenow={ocupadas}
        aria-label={`${ocupadas} de ${dados.vagas} vagas preenchidas`}
      >
        {Array.from({ length: dados.vagas }, (_, i) => (
          <span key={i} className={i < ocupadas ? "vaga cheia" : "vaga"} aria-hidden="true" />
        ))}
      </div>
      <p className="vagas-sub">
        {esgotado ? <>Lista de espera pelo WhatsApp da liderança</> : <>Restam <strong>{restam} {restam === 1 ? "vaga" : "vagas"}</strong> · inscrições até 15/11</>}
      </p>
    </div>
  );
}
