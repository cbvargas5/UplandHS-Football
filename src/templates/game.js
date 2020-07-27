import React, { Component } from "react";
import PropTypes from "prop-types";
import "../styles/game.scss";

import HeadshotPlaceholder from "../img/headshot-placeholder.svg";

class GameTemplate extends Component {
  render() {
    return (
      <section
        className={`game  ${this.props.className && this.props.className}`}
        key={this.props.game.rawDate}
      >
        <h2 className="game-title">{this.props.game.title}</h2>
        <div className="game-meta">
          <p className="game-metaField  game-metaField--date">
            <span className="game-label">Date:</span> {this.props.game.formattedDate}
          </p>
          <p className="game-metaField  game-metaField--location">
            <span className="game-label">Location:</span> {this.props.game.location.name}
          </p>
        </div>
        <div className="game-presenters">
          {this.props.game.presenters.map(presenter => (
            <div className="game-presenter" key={presenter.name}>
              <div className="game-presenterImageContainer">
                <img
                  className="game-presenterImage"
                  src={presenter.image ? presenter.image : HeadshotPlaceholder}
                  alt={presenter.image ? presenter.name : "Default headshot placeholder"}
                />
                <span className="game-presenterName">{presenter.name}</span>
              </div>
              <div className="game-presenterInfo">
                {presenter.presentationTitle && (
                  <h3 className="game-presenterTitle">{presenter.presentationTitle}</h3>
                )}
                <p className="game-presenterText">{presenter.text}</p>
                <ul className="game-presenterLinks">
                  {presenter.links &&
                    presenter.links.map((link, index) => (
                      <li key={index} className="game-presenterLinkItem">
                        <a className="game-presenterLink" href={link.linkURL}>
                          {link.linkText}
                        </a>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
}

GameTemplate.propTypes = {
  game: PropTypes.shape({
    title: PropTypes.string,
    name: PropTypes.string,
    presenters: PropTypes.array,
  }),
};

export default GameTemplate;
