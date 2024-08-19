import { Home, Chart, Document, Setting } from "react-iconly";

export const routes = [
  {
    title: "Home",
    url: "/home",
    icon: {
      selected: <Home filled />,
      unselected: <Home filled />,
    },
  },
  {
    title: "History",
    url: "/history",
    icon: {
      selected: <Chart filled />,
      unselected: <Chart />,
    },
  },
  {
    title: "Notes",
    url: "/notes",
    icon: {
      selected: <Document filled />,
      unselected: <Document />,
    },
  },
  {
    title: "Settings",
    url: "/settings",
    icon: {
      selected: <Setting filled />,
      unselected: <Setting />,
    },
  },
];
