import { Ionicons } from "@expo/vector-icons";

type TabIconName = React.ComponentProps<typeof Ionicons>["name"];

export const tabs: {
  id: string;
  label: string;
  iconFocusedName: TabIconName;
  iconUnfocusedName: TabIconName;
}[] = [
  {
    id: "home",
    label: "Home",
    iconFocusedName: "home",
    iconUnfocusedName: "home-outline",
  },
  {
    id: "add",
    label: "Add",
    iconFocusedName: "add-circle",
    iconUnfocusedName: "add-circle-outline",
  },
  {
    id: "analytics",
    label: "Analytics",
    iconFocusedName: "bar-chart",
    iconUnfocusedName: "bar-chart-outline",
  },
  {
    id: "search",
    label: "Search",
    iconFocusedName: "search",
    iconUnfocusedName: "search-outline",
  },
  {
    id: "settings",
    label: "Settings",
    iconFocusedName: "settings",
    iconUnfocusedName: "settings-outline",
  },
];
