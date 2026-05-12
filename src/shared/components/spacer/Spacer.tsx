import { View } from "react-native";

export interface SpacerProps {
  height?: number;
  width?: number;
}

const Spacer = ({ height = 0, width }: SpacerProps) => {
  return <View style={{ height: height, width: width ?? "auto" }} />;
};

export default Spacer;
