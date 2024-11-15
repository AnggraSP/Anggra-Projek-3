import Organik from "../components/elements/Organik";
import Plastik from "../components/elements/Plastik";
import Kaca from "../components/elements/Kaca";
import Logam from "../components/elements/Logam";
import Kertas from "../components/elements/Kertas";
import Kaleng from "../components/elements/Kaleng";
import Berbahaya from "../components/elements/Berbahaya";
import Alumunium from "../components/elements/Alumunium";
import Tekstil from "../components/elements/Tekstil";
import Pakaian from "../components/elements/Pakaian";
import Baterai from "../components/elements/Baterai";

export default function KategoriSampah() {
  
    return (
      <div className="grid grid-cols-3 gap-y-12">
        <Plastik />
        <Kaca />
        <Logam />
        <Organik />
        <Kertas />
        <Kaleng />
        <Berbahaya />
        <Alumunium />
        <Tekstil />
        <Pakaian />
        <Baterai />
      </div>
    );
}