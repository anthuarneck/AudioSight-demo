import React from "react";
import Sketch from "react-p5";

export const Visualizer = ({
  song: {
    analysis: { sections, segments },
    track: { album, name },
  },
}) => {
  let changing = false;
  let segment = 0;
  let section = 0;
  let tatum = 0;
  let beat = 0;
  let pitchVals = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  let vol = 0;
  let m;
  let color = 1913270;
  let img;
  let cnv7;
  const preload = () => {
    img = p5.loadImage(album.images[0].url);
  };
  const setup = (p5, canvasParentRef) => {
    color = p5.color(p5.random(255), p5.random(255), p5.random(255));
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    for (let i = 0; i < 12; i++) {
      pitchVals[i] = 0;
    }
    cnv7 = createGraphics(img.width, img.height);
  };
  const draw = (p5) => {
    p5.rectMode(p5.CORNER);
    p5.stroke(color);
    if (vol >= 0) {
      vol = 0;
    } else {
      vol += 1;
    }
    p5.fill(0, 50);
    p5.rect(0, 0, p5.width, p5.height);
    m = p5.millis() / 1000;
    p5.ellipse(p5.mouseX, p5.mouseY, p5.map(vol, -60, 0, 200, 100));
    cnv7.ellipse(p5.width / 2, p5.height / 2, p5.map(vol, -60, 0, 200, 100));
    cnv7.canvas.getContext("2d").clip();
    cnv7.image(img, 0, 0);
    p5.rectMode(p5.CENTER);
    p5.image(cnv7, p5.width / 2, p5.height / 2);
    p5.textAlign(p5.CENTER, p5.CENTER);
    p5.text(name, p5.width / 2, p5.height / 2);
    for (let i = 0; i < 12; i++) {
      p5.rect(
        (i * p5.width) / 12,
        p5.height,
        p5.width / 12,
        -p5.map(pitchVals[i], 0, 1, 0, p5.height)
      );
      if (pitchVals[i] <= 0) {
        pitchVals[i] = 0;
      } else {
        pitchVals[i] -= 0.005;
      }
    }
    p5.image(img, p5.width / 2, p5.height / 2);
    if (changing) {
      changing = false;
    } else {
      if (p5.millis() <= song.track.duration * 1000) {
        updateGraphics(p5);
      } else {
        updateSong();
      }
    }
  };
  const windowResized = (p5) => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  const updateGraphics = (p5) => {
    for (let i = section; i < sections.length; i++) {
      if (m > sections[i].start + sections[i].duration) {
        changing = true;
        section += 1;
        color = p5.color(p5.random(255), p5.random(255), p5.random(255));
        break;
      }
    }
    for (let i = segment; i < segments.length; i++) {
      if (m > segments[i].start + segments[i].duration) {
        changing = true;
        segment += 1;
        for (let pitchI = 0; pitchI < pitchVals.length; pitchI++) {
          if (pitchVals[pitchI] < segments[i].pitches[pitchI]) {
            pitchVals[pitchI] = segments[i].pitches[pitchI];
          }
        }
        if (vol > segments[i].loudness_start) {
          vol = segments[i].loudness_start;
        }
        break;
      }
    }
    // for (let i = tatum; i < song.tatums.length; i++) {
    //   if (m > song.tatums[i].start + song.tatums[i].duration) {
    //     size = 200;
    //     changing = true;
    //   }
    // }
    // for (let i = beat; i < song.beats.length; i++) {}
  };
  return (
    <Sketch
      preload={preload}
      setup={setup}
      draw={draw}
      windowResized={windowResized}
    />
  );
};
