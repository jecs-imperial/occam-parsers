"use strict";

export function paddingFromPaddingLength(paddingLength) {
  let padding = "";

  for (let position = 0; position < paddingLength; position++) {
    padding += " ";
  }

  return padding;
}
