import { InteractiveConfusionMatrix } from "base-react-design-template";

export function ThreeClass() {
  return (
    <div style={{ width: 600 }}>
      <InteractiveConfusionMatrix
        height={360}
        labels={["Cat", "Dog", "Bird"]}
        matrix={[
          [142, 11, 4],
          [9, 168, 6],
          [5, 7, 121],
        ]}
      />
    </div>
  );
}
