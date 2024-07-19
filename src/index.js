import { useRef, useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";

let captchaText = "";

CaptchaBox.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fontColor: PropTypes.string,
  boxBorder: PropTypes.string,
  boxBackground: PropTypes.string,
  textType: PropTypes.oneOf([
    "UPPER_TEXT",
    "LOWER_TEXT",
    "UPPER_TEXT_NUM",
    "LOWER_TEXT_NUM",
    "NUM_ONLY",
    "MIXED",
  ]),
  charLength: PropTypes.number,
  reloadStyle: PropTypes.object,
  containerStyle: PropTypes.object,
};

function CaptchaBox({
  width = 200,
  height = 60,
  fontColor = "#000",
  font = "bold 20px Arial",
  boxBorder = "2px solid grey",
  boxBackground = "#fff",
  textType = "MIXED",
  charLength = 6,
  reloadStyle = {
    padding: 5,
    cursor: "pointer",
    border: "1px black solid",
    userSelect: "none",
  },
  containerStyle = {
    padding: 2,
    display: "flex",
    gap: 5,
    justifyContent: "center",
    alignItems: "center",
  },
}) {
  const [reloadTrigger, setReloadTrigger] = useState(false);
  const canvasRef = useRef(null);

  const createCaptchaText = useCallback((type, len) => {
    let result = "";
    const characterSets = {
      UPPER_TEXT: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      LOWER_TEXT: "abcdefghijklmnopqrstuvwxyz",
      UPPER_TEXT_NUM: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      LOWER_TEXT_NUM: "abcdefghijklmnopqrstuvwxyz0123456789",
      NUM_ONLY: "0123456789",
      MIXED: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
    };
    const characters = characterSets[type] || characterSets["MIXED"];
    for (let i = 0; i < len; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;
    ctx.fillStyle = fontColor;
    ctx.font = font;
    ctx.letterSpacing = "3px";
    const textString = createCaptchaText(textType, charLength);
    const textWidth = ctx.measureText(textString).width;
    ctx.fillText(textString, (canvas.width - textWidth) / 2, canvas.height / 2);
    captchaText = textString;
  }, [
    width,
    height,
    fontColor,
    font,
    textType,
    charLength,
    reloadTrigger,
    createCaptchaText,
  ]);

  const reload = useCallback(() => {
    setReloadTrigger((prev) => !prev);
  }, []);

  return (
    <div id="captcha_lite_container" style={containerStyle}>
      <canvas
        id="captcha_lite_canvas"
        ref={canvasRef}
        style={{ border: boxBorder, backgroundColor: boxBackground }}
      >
        Sorry, your browser does not support canvas.
      </canvas>
      <a id="captcha_lite_reload_btn" onClick={reload} style={reloadStyle}>
        &#x21bb;
      </a>
    </div>
  );
}

function validateCaptcha(input) {
  const isValid = input.toString() === captchaText;
  reloadCaptcha();
  return isValid;
}

function reloadCaptcha() {
  document.getElementById("captcha_lite_reload_btn").click();
}

export { CaptchaBox, validateCaptcha, reloadCaptcha };
