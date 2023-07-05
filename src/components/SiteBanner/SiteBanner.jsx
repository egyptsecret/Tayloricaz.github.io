import taylorEras from "../../assets/images/taylorEras.avif";

export const SiteBanner = () => {
  return (
    <div className="relative">
      <div className="italic select-none absolute text-yellow-900 font-bold text-7xl z-40 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-80 py-2 bg-violet-100/75 rounded-full">
        TAYLORICAZ
      </div>
      <img alt="taylor-eras" className="relative w-70" src={taylorEras} />
    </div>
  );
};
