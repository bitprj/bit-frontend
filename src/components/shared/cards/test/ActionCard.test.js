import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import ActionCard from "../ActionCard";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("Proper text display", () => {
  act(() => {
    render(<ActionCard type='resume'/>, container);
  });
  expect(container.textContent).toBe("Resume Activity");

  act(() => {
    render(<ActionCard type='start'/>, container);
  });
  expect(container.textContent).toBe("Start Activity");

});
