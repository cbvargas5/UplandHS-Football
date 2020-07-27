import React from "react";
import PropTypes from "prop-types";
import { PastGamesPageTemplate } from "../../templates/past-games-page";

const PastGamesPagePreview = ({ entry, widgetFor }) => {
  return (
    <PastGamesPageTemplate
      title={entry.getIn(["data", "title"])}
      content={entry.getIn(["data", "body"])}
      bodyIsMarkdown={true}
    />
  );
};

PastGamesPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
};

export default PastGamesPagePreview;
