import gsap from "gsap";

export default function SideModal({ ...props }) {
  return (
    <div className="sideModal w-[35vw] h-[100vh] bg-black/80 z-50 text-white absolute p-4 -right-full flex flex-col">
      <div className="flex justify-between mb-8">
        <p>picture title</p>
        <p
          onClick={() => {
            gsap.to(".sideModal", { right: "-100vw", duration: 1.5 });
          }}
          className="cursor-pointer underline underline-offset-2"
        >
          close
        </p>
      </div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae sed qui
        similique nam quam repellendus, iusto consequatur at nesciunt,
        aspernatur aperiam temporibus aut ab. Dicta, at iusto? Iure, harum.
        Eius! Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
        voluptatem eos ipsam hic reprehenderit, accusamus tempora tempore eaque
        ipsa non, nobis velit? Aspernatur, id. Officia, eaque quos! Nostrum,
        dolor ex?
      </p>
    </div>
  );
}
