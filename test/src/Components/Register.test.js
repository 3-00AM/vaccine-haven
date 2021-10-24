import React from "react";
import { render, cleanup, waitForElement } from "react-testing-library";
import "jest-dom/extend-expect";
import axiosMock from "axios";
import Register from "../../../src/Components/Register";

afterEach(cleanup);

it('should input and post data', function () {

  const url = "/test/register";
  const { getByTestId } = render(<Register url={url} />);
});

