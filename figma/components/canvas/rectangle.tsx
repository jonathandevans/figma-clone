import { Layer, RectangleLayer } from "@/lib/types";
import { rgbToHex } from "@/lib/utils";

interface RectangleProps {
  id: string;
  layer: RectangleLayer;
}

export function Rectangle({ id, layer }: RectangleProps) {
  const { x, y, width, height, fill, stroke, opacity, cornerRadius } = layer;

  return (
    <g>
      <rect
        style={{ transform: `translate(${x}px, ${y}px)` }}
        width={width}
        height={height}
        fill={fill ? rgbToHex(fill) : "#CCC"}
        strokeWidth={1}
        stroke={stroke ? rgbToHex(stroke) : "#CCC"}
        opacity={`${opacity ?? 100}%`}
        rx={cornerRadius ?? 0}
        ry={cornerRadius ?? 0}
      />
    </g>
  );
}
