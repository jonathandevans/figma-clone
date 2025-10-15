import { PointerEvent } from "react";
import { Camera, Color, Point } from "./types";

export function rgbToHex(color: Color) {
  return `#${color.r.toString(16).padStart(2, "0")}${color.g
    .toString(16)
    .padStart(2, "0")}${color.b.toString(16).padStart(2, "0")}`;
}

export function pointerEventToCanvasPoint(
  e: PointerEvent,
  camera: Camera
): Point {
  return {
    x: Math.round(e.clientX) - camera.x,
    y: Math.round(e.clientY) - camera.y,
  };
}
