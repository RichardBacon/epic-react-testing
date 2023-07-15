import * as React from "react";
import { useTheme } from "../contexts/Theme";

const styles = {
  dark: {
    backgroundColor: "black",
    color: "white",
  },
  light: {
    color: "black",
    backgroundColor: "white",
  },
};

function Button(props) {
  const [theme] = useTheme();
  return <button style={styles[theme]} {...props} />;
}

export default Button;
