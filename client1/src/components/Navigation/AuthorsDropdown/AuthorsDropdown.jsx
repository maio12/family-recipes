import React from "react";
import { useTransition, animated } from "react-spring";

export const AuthorsDropdown = ({ open, authors }) => {
  const transition = useTransition(open, {
    from: { x: 0, y: 0, opacity: 0 },
    enter: { x: 0, y: 5, opacity: 1 },
    leave: { x: 0, y: -100, opacity: 0 },
  });

  return (
    <div>
      <div>Authors</div>
      <ul className="authors-dropdown__container">
        {transition(
          (style, item) =>
            item && (
              <animated.div
                style={style}
                onClick={() => {}}
                className="authors-dropdown__container--open"
              >
                {open &&
                  authors.map((u) => {
                    return <li key={u._id}>{u.name}</li>;
                  })}
              </animated.div>
            )
        )}
      </ul>
    </div>
  );
};
