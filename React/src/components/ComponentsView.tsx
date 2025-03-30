import React from "react";

interface ComponentsViewProps {
  position: number;
  items: React.ReactNode[];
}

const ComponentsView = (props: ComponentsViewProps) => {
  return props.items[props.position];
};

export default ComponentsView;
