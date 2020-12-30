import React from "react";
// import {create, act} from "react-test-renderer";
import { render, cleanup } from "@testing-library/react-native";
import App from "../App";

describe("<App />", () => {
  it("renders", () => {
    const tree = render(<App />);
    cleanup();
  });
});
