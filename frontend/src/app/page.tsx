import Hero from "@/components/sections/Hero";
import Producto from "@/components/sections/Producto";
import AppReal from "@/components/sections/AppReal";
import Modulos from "@/components/sections/Modulos";
import ComoFunciona from "@/components/sections/ComoFunciona";
import ListaEspera from "@/components/sections/ListaEspera";
import Contacto from "@/components/sections/Contacto";

export default function Home() {
  return (
    <>
      <Hero />
      <Producto />
      <AppReal />
      <Modulos />
      <ComoFunciona />
      <ListaEspera />
      <Contacto />
    </>
  );
}
