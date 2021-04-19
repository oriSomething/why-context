// @ts-check

import * as React from "react";
import {
  KeyboardShortcutsGlobal,
  KeyboardShortcutsRoot,
} from "./keyboard/keyboard-management-react";

function FrameKeyEmpty() {
  return <div className="FrameKey"></div>;
}

/**
 * @param {object} props
 * @param {string} props.shortcut
 * @param {string} [props.shortcutDisplay]
 * @param {string} props.description
 * @param {boolean} [props.inverse]
 * @param {() => void} props.onShortcut
 */
function FrameKey({
  shortcut,
  shortcutDisplay = shortcut,
  description,
  inverse = false,
  onShortcut,
}) {
  return (
    <KeyboardShortcutsGlobal
      shortcuts={[{ key: shortcut, callback: onShortcut }]}
    >
      <div className={`FrameKey ${inverse ? "FrameKey--inverse" : ""}`}>
        <kbd className="FrameKey__kbd">{shortcutDisplay.toUpperCase()}</kbd>
        <span>{description}</span>
      </div>
    </KeyboardShortcutsGlobal>
  );
}

const KEYS_BY_INDEX = "zxcvbnm,".split("");
const LIMIT = 3;

/**
 * @param {Object} props
 * @param {() => void} [props.onDelete]
 */
function Frame({ onDelete }) {
  const [hasInnerFrame, setHasInnerFrame] = React.useState(false);
  const [counter, setCounter] = React.useState(0);

  function addShortcut() {
    setCounter((counter) => Math.min(LIMIT, counter + 1));
  }

  return (
    <KeyboardShortcutsRoot>
      <div className="Frame">
        <div
          className={`Frame__content ${
            hasInnerFrame ? "Frame__content--hasFrame" : ""
          }`}
        >
          {onDelete == null ? null : (
            <FrameKey
              inverse
              shortcut="Backspace"
              shortcutDisplay="⌫"
              onShortcut={onDelete}
              description="Delete"
            />
          )}

          <FrameKey
            shortcut="z"
            onShortcut={() => setHasInnerFrame(true)}
            description="For new root"
          />

          {Array.from(Array(counter + 1), (__, index) => {
            const i = index + 1;

            if (index === LIMIT) return <FrameKeyEmpty key={i} />;

            return (
              <FrameKey
                key={i}
                shortcut={KEYS_BY_INDEX[i]}
                onShortcut={addShortcut}
                description={i === LIMIT ? "For new empty" : "For new shortcut"}
              />
            );
          })}
        </div>
        {hasInnerFrame ? (
          <Frame onDelete={() => setHasInnerFrame(false)} />
        ) : null}
      </div>
    </KeyboardShortcutsRoot>
  );
}

export function App() {
  return <Frame />;
}
