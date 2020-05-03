import React from "react";
// import wordIsValid from "../reactapp/Utils";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import GameOver from "../reactapp/Components/gameOver";
import LetterGrid from "../reactapp/Components/letterGrid";
import wordIsValid, { newBoard } from "../reactapp/Utils";
Enzyme.configure({
  adapter: new EnzymeAdapter(),
  disableLifecycleMethods: true,
});

describe("Game Over Component Test", () => {
  it("should render without errors", () => {
    const resetgame = jest.fn();
    const component = shallow(<GameOver score={5} resetGame={resetgame} />);
    const wrapper = component.find(".alert-link");
    expect(wrapper.length).toBe(1);
  });
});

describe("Letter Grid Component Test", () => {
  it("should render without errors", () => {
    const component1 = shallow(<LetterGrid lettersOnBoard={newBoard} />);
    const wrapper1 = component1.find(".squaregrid");
    expect(wrapper1.length).toBe(1);
  });
});


describe("test for word validation functions", () => {   
/* Board
  N R W A
  I S E I
  A O W X
  S T R R */

  let board;
  let letters;

  beforeEach(() => {
    board = Array(16)
      .fill(0)
      .map((e, i) => e + i);
    letters = ["N", "R", "W", "A", "I", "S", "E", "I", "A", "O", "W", "X", "S", "T", "R", "R"];

  });

  const validityFunction = (word) => {
      return wordIsValid([...word.toUpperCase()],[...board],[...board],letters)
  }

  it("check for word awni", () => {
    const validity = validityFunction("awni");
    expect(validity).toBe(false);
  });

  it("check for word air", () => {
    const validity = validityFunction("air");
    expect(validity).toBe(true);
  });

  it("check for word airs", () => {
    const validity = validityFunction("airs");
    expect(validity).toBe(true);
  });

  it("check for word strowers", () => {
    const validity = validityFunction("strowers");
    expect(validity).toBe(true);
  });

  // two letter word are passed by this function since the
  // check is done before calling this method
  it("check for word wa", () => {
    const validity = validityFunction("wa");
    expect(validity).toBe(true);
  });

  it("check for word wn", () => {
    const validity = validityFunction("wn");
    expect(validity).toBe(false);
  });

  it("check for word rower", () => {
    const validity = validityFunction("rower");
    expect(validity).toBe(true);
  });

  it("check for word nsoin", () => {
    const validity = validityFunction("nsoin");
    expect(validity).toBe(false);
  });


});
