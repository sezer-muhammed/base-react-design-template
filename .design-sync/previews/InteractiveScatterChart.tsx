import { InteractiveScatterChart } from "base-react-design-template";

export function ActualVsPredicted() {
  return (
    <div style={{ width: 480 }}>
      <InteractiveScatterChart
        domain={[0, 100]}
        height={320}
        data={[
          { name: "sample-01", actual: 12, predicted: 15 },
          { name: "sample-02", actual: 21, predicted: 18 },
          { name: "sample-03", actual: 28, predicted: 31 },
          { name: "sample-04", actual: 35, predicted: 33 },
          { name: "sample-05", actual: 41, predicted: 46 },
          { name: "sample-06", actual: 48, predicted: 44 },
          { name: "sample-07", actual: 55, predicted: 59 },
          { name: "sample-08", actual: 62, predicted: 58 },
          { name: "sample-09", actual: 69, predicted: 73 },
          { name: "sample-10", actual: 77, predicted: 71 },
          { name: "sample-11", actual: 84, predicted: 88 },
          { name: "sample-12", actual: 92, predicted: 90 },
        ]}
      />
    </div>
  );
}
