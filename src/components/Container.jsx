import { useState } from "react";
import { useParams } from "react-router-dom";
import VideosGrid from "./VideosGrid";
import Shorts from "./Shorts";
import styles from "./Container.module.scss";

function Container() {
  const { site } = useParams();

  return (
    <div className={`${"main"} ${"bg-color"}`}>
      {site === "home" && <VideosGrid />}
      {site === "shorts" && <Shorts />}
    </div>
  );
}

export default Container;
