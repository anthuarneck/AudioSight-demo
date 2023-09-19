import React from "react";
import Sketch from "react-p5";

export const Visualizer = ({ song }) => {
  let changing = false;
  let segment = 0;
  let section = 0;
  let tatum = 0;
  let beat = 0;
  let pitchVals = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  let vol = 0;
  let m;
  let color = 1913270;
  const setup = (p5, canvasParentRef) => {
    color = p5.color(p5.random(255), p5.random(255), p5.random(255));
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    for (let i = 0; i < 12; i++) {
      pitchVals[i] = 0;
    }
  };
  const draw = (p5) => {
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
    if (changing) {
      changing = false;
    } else {
      if (p5.millis() <= song.track.duration * 1000) {
        updateGraphics(p5);
      }
    }
  };
  const windowResized = (p5) => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  const updateGraphics = (p5) => {
    for (let i = section; i < song.sections.length; i++) {
      if (m > song.sections[i].start + song.sections[i].duration) {
        changing = true;
        section += 1;
        color = p5.color(p5.random(255), p5.random(255), p5.random(255));
        break;
      }
    }
    for (let i = segment; i < song.segments.length; i++) {
      if (m > song.segments[i].start + song.segments[i].duration) {
        changing = true;
        segment += 1;
        for (let pitchI = 0; pitchI < pitchVals.length; pitchI++) {
          if (pitchVals[pitchI] < song.segments[i].pitches[pitchI]) {
            pitchVals[pitchI] = song.segments[i].pitches[pitchI];
          }
        }
        if (vol > song.segments[i].loudness_start) {
          vol = song.segments[i].loudness_start;
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
  return <Sketch setup={setup} draw={draw} windowResized={windowResized} />;
};
