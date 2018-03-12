/**
 * @file
 * Dynamic background for setting the scene
 */

import React from "react";

const backgroundImages = {
  beginning: "backgrounds/beginning.jpg", // http://maxpixel.freegreatpicture.com/Cottage-Village-Winter-Snow-Russia-Sunset-1787588
  farm: "backgrounds/farm.jpg", // https://www.pexels.com/photo/gray-wooden-house-burning-731577/
  barn: "backgrounds/barn.jpg", // https://pixabay.com/en/barn-red-barn-winter-farm-country-1635370/
  city: "backgrounds/city.jpg", // https://commons.wikimedia.org/wiki/File:Irkutsk._February_2013._Barguzin,_regional_court,_bus_stop_Volga,_Diagnostic_Center._-_panoramio_(23).jpg
  bar: "backgrounds/bar.jpg", // https://commons.wikimedia.org/wiki/File:Adriaen_van_Ostade_045.jpg
  store: "backgrounds/store.jpg" // https://commons.wikimedia.org/wiki/File:Russian-supermarket-july-2014.jpg
};
const defaultImage = "";

export default ({ tags }) => {
  console.log(backgroundImages[tags.background]);
  return (
    <section
      className="scene"
      style={{
        backgroundImage: `url(${
          tags && backgroundImages[tags.background]
            ? backgroundImages[tags.background]
            : defaultImage
        })`
      }}
    />
  );
};
