import React, { useState } from "react";
import ButtonText from "./buttonText";
import wordIsValid from "../Utils.js";

const apiUrl =
  "https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=dict.1.1.20200503T084604Z.5ef08946641aafd2.d0eda00255a57e6f8c059d7ab298bead0d74f254&lang=en-en&text=";

const InputWord = (props) => {
  const [word, setWord] = useState("");
  const [valid, setValid] = useState(true);
  const [pending, setPending] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!word) return;
    if (word.length < 3) {
      setValid(false);
      setWord("");
      return;
    }
    let board = Array(16)
      .fill(0)
      .map((e, i) => e + i);

    let wordIsOk = wordIsValid(
      [...word.toUpperCase()],
      [...board],
      [...board],
      props.lettersOnBoard
    );

    if (wordIsOk) {
      setPending(true);
      fetch(apiUrl + word)
        .then((res) => res.json())
        .then((data) => {
          if (data.def[0]) {
            props.addWord(word);
            setValid(true);
          } else {
            setValid(false);
          }
          setPending(false);
        })
        .catch(console.log);
    } else {
      setValid(false);
    }

    setWord("");
  };

  return (
    <div className="row justify-content-center">
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="needs-validation"
      >
        <div className="form-group">
          <input
            id="wordinput"
            className={"form-control " + (valid ? "" : "is-invalid")}
            placeholder="Add a word"
            value={word}
            onChange={(event) => setWord(event.target.value)}
            style={{ width: "250px", margin: "10px 0px" }}
            disabled={props.gameOver}
          />
          <div className="invalid-feedback">Invalid word.</div>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          style={{ width: "120px" }}
          disabled={props.gameOver}
        >
          <ButtonText pending={pending} />
        </button>
      </form>
    </div>
  );
};

export default InputWord;
