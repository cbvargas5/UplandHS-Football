import React from "react";
import PropTypes from "prop-types";
import format from "date-fns/format";

import GameTemplate from "../../templates/game";

const GamePreview = ({ entry }) => {
  const game = entry.getIn(["data"]).toJS();
  const rawDate = game.date;
  const formattedDate = format(rawDate, "MMMM Do YYYY @ h:mm A");
  return <GameTemplate game={{ ...game, formattedDate, rawDate }} />;
};

GamePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
};

export default GamePreview;
