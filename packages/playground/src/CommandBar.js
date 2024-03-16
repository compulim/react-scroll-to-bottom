/* eslint no-magic-numbers: "off" */

import classNames from "classnames";
import createEmotion from "@emotion/css/create-instance";
import React, { useCallback, useMemo, useState } from "react";

import {
  useScrollTo,
  useScrollToBottom,
  useScrollToEnd,
  useScrollToStart,
  useScrollToTop,
} from "react-scroll-to-bottom";

const ROOT_STYLE = {
  "&.command-bar": {
    backgroundColor: "#FFF",
    boxShadow: "0 0 10px rgba(0, 0, 0, .2)",

    "& .command-bar__actions": {
      display: "flex",
      listStyleType: "none",
      margin: 0,
      padding: 10,
    },

    "& .command-bar__action": {
      fontSize: 11,
      height: 40,

      "&:not(:first-child)": {
        marginLeft: 4,
      },
    },
  },
};

const CommandBar = ({ nonce }) => {
  const rootCSS = useMemo(
    () => createEmotion({ key: "playground--css-", nonce }).css(ROOT_STYLE),
    [nonce]
  );

  const scrollTo = useScrollTo();
  const scrollToBottom = useScrollToBottom();
  const scrollToEnd = useScrollToEnd();
  const scrollToStart = useScrollToStart();
  const scrollToTop = useScrollToTop();
  const [options, setOptions] = useState({ behavior: "smooth" });

  const handleScrollTo100pxClick = useCallback(
    () => scrollTo(100, options),
    [options, scrollTo]
  );
  const handleScrollToBottomClick = useCallback(
    () => scrollToBottom(options),
    [options, scrollToBottom]
  );
  const handleScrollToEndClick = useCallback(
    () => scrollToEnd(options),
    [options, scrollToEnd]
  );
  const handleScrollToStartClick = useCallback(
    () => scrollToStart(options),
    [options, scrollToStart]
  );
  const handleScrollToTopClick = useCallback(
    () => scrollToTop(options),
    [options, scrollToTop]
  );
  const handleSmoothChange = useCallback(
    ({ target: { checked } }) => {
      setOptions({ behavior: checked ? "smooth" : "auto" });
    },
    [setOptions]
  );

  return (
    <div className={classNames(rootCSS + "", "command-bar")}>
      <ul className="command-bar__actions">
        <li>
          <button
            className="command-bar__action"
            onClick={handleScrollToBottomClick}
          >
            Scroll to bottom
          </button>
        </li>
        <li>
          <button
            className="command-bar__action"
            onClick={handleScrollToTopClick}
          >
            Scroll to top
          </button>
        </li>
        <li>
          <button
            className="command-bar__action"
            onClick={handleScrollToStartClick}
          >
            Scroll to start
          </button>
        </li>
        <li>
          <button
            className="command-bar__action"
            onClick={handleScrollToEndClick}
          >
            Scroll to end
          </button>
        </li>
        <li>
          <button
            className="command-bar__action"
            onClick={handleScrollTo100pxClick}
          >
            100px
          </button>
        </li>
        <li>
          <label>
            <input
              checked={options.behavior === "smooth"}
              onChange={handleSmoothChange}
              type="checkbox"
            />
            Smooth
          </label>
        </li>
      </ul>
    </div>
  );
};

export default CommandBar;
