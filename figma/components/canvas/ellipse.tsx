import { EllipseLayer, Layer } from "@/lib/types";
import { rgbToHex } from "@/lib/utils";

interface EllipseProps {
  id: string;
  layer: EllipseLayer;
}

export function Ellipse({ id, layer }: EllipseProps) {
  const { x, y, width, height, fill, stroke, opacity } = layer;

  return (
    <g>
      <ellipse
        style={{ transform: `translate(${x}px, ${y}px)` }}
        fill={fill ? rgbToHex(fill) : "#CCC"}
        stroke={stroke ? rgbToHex(stroke) : "#CCC"}
        strokeWidth={1}
        cx={width / 2}
        cy={height / 2}
        rx={width / 2}
        ry={height / 2}
        opacity={`${opacity ?? 100}%`}
      />
    </g>
  );
}
