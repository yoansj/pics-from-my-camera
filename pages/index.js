import { Loader, useProgress } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useQuery } from "@tanstack/react-query";
import { Leva } from "leva";
import Head from "next/head";
import { useEffect, useState } from "react";
import { getCollection } from "../api/getCollection";
import { getPicture } from "../api/getPicture";
import Modal from "../components/Modal";
import Scene from "../components/Scene";
import SideModal from "../components/SideModal";
import { useAppStore } from "../contexts/appState";

export default function Home() {
  const setPictures = useAppStore((state) => state.setPictures);
  const [debug, setDebug] = useState(false);

  const debugHandler = (e) => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "d") {
        setDebug((d) => !d);
      }
    });
  };

  useEffect(() => {
    window.addEventListener("keydown", debugHandler);
    return () => {
      window.removeEventListener("keydown", debugHandler);
    };
  });

  const { isLoading, isError, data, error, isSuccess } = useQuery({
    queryKey: ["collection"],
    queryFn: getCollection,
  });

  const { isLoading: loadingPics, data: pics } = useQuery({
    queryKey: ["pictures"],
    queryFn: () => {
      const all = data.map((picture) => getPicture(picture.id));
      return Promise.all(all);
    },
    onSuccess: (data) => {
      setPictures(data);
    },
    enabled: isSuccess,
  });

  if (isLoading || loadingPics) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loader"></span>
      </div>
    );
  } else if (isError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1>It seems like an error occured please reload this page :(</h1>
      </div>
    );
  } else {
    return (
      <div>
        <Head>
          <title>Pics from my camera</title>
          <meta
            name="description"
            content="A Three.js experiment made by Yoan Saint Juste"
          />
          <link rel="icon" href="/favicon.ico" />

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />

          {/* <!-- Open Graph / Facebook --> */}
          <meta property="og:type" content="website" />
          {/* <meta property="og:url" content="fill" /> */}
          <meta property="og:title" content="Pics from my camera" />
          <meta
            property="og:description"
            content="A Three.js experiment made by Yoan Saint Juste"
          />
          <meta property="og:image" content="/thumb.png" />

          {/* <!-- Twitter --> */}
          <meta property="twitter:card" content="summary_large_image" />
          {/* <meta property="twitter:url" content={url} /> */}
          <meta property="twitter:title" content="Pics from my camera" />
          <meta
            property="twitter:description"
            content="A Three.js experiment made by Yoan Saint Juste"
          />
          <meta property="twitter:image" content="/thumb.png" />

          {/* Base */}
          <meta property="og:site_name" content="Pics from my camera" />
          <meta property="og:type" content="website" />
          <meta name="theme-color" content="#FFFFFF" />
        </Head>
        <main className="overflow-hidden">
          <Modal />
          <SideModal />
          <h1 className="font-extrabold text-xl lg:text-4xl ml-2 title absolute z-50 top-[-5vh] opacity-0">
            Pics from my camera
            <p className="text-xs lg:text-base">A Three.js experiment</p>
            <p className="text-xs lg:text-base">Made by Yoan Saint Juste</p>
          </h1>
          <p className="clickOnCamera absolute z-50 bottom-3 text-center w-full opacity-0">
            {isLoading || loadingPics
              ? "- loading some cool pictures -"
              : "- click on the camera -"}
          </p>
          <Canvas
            camera={{ position: [80, 62, 77] }}
            style={{
              width: "100vw",
              height: "100vh",
            }}
          >
            <Scene />
          </Canvas>
          <Leva hidden={debug === false} />
        </main>
      </div>
    );
  }
}
