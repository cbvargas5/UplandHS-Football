import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Helmet from "react-helmet";
import isBefore from "date-fns/is_before";
import ReactMarkdown from "react-markdown";

import GameTemplate from "./game";
import Layout from "../components/Layout";
import HTMLContent from "../components/Content";
import "../styles/past-games-page.scss";

export const PastGamesPageTemplate = ({
  title,
  content,
  games = null,
  bodyIsMarkdown = false,
}) => {
  return (
    <article className="pastGames">
      <div className="container  pastGames-container">
        <h1 className="pastGames-title">{title}</h1>
        {bodyIsMarkdown ? (
          <ReactMarkdown className="pastGames-description" source={content} />
        ) : (
          <HTMLContent className="pastGames-description" content={content} />
        )}
        {games &&
          games.map((game, index) => (
            <GameTemplate
              key={index}
              className="pastGames-game"
              game={game.node.frontmatter}
            />
          ))}
      </div>
    </article>
  );
};

PastGamesPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  games: PropTypes.array,
};

const PastGamesPage = ({ data }) => {
  const { markdownRemark: page } = data;
  const {
    frontmatter: {
      seo: { title: seoTitle, description: seoDescription, browserTitle },
    },
  } = page;
  let games = data.allMarkdownRemark.edges;

  // Find all the games that occured in the past
  games = games.filter(game => {
    return isBefore(game.node.frontmatter.rawDate, new Date()) && game;
  });

  return (
    <Layout footerData={data.footerData} navbarData={data.navbarData}>
      <Helmet>
        <meta name="title" content={seoTitle} />
        <meta name="description" content={seoDescription} />
        <title>{browserTitle}</title>
      </Helmet>
      <PastGamesPageTemplate
        title={page.frontmatter.title}
        content={page.html}
        games={games}
      />
    </Layout>
  );
};

PastGamesPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default PastGamesPage;

export const pastGamesPageQuery = graphql`
  query PastGamesPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        seo {
          browserTitle
          title
          description
        }
      }
    }
    ...LayoutFragment
    allMarkdownRemark(
      filter: { frontmatter: { presenters: { elemMatch: { text: { ne: null } } } } }
      sort: { order: DESC, fields: frontmatter___date }
    ) {
      edges {
        node {
          frontmatter {
            title
            formattedDate: date(formatString: "MMMM Do YYYY @ h:mm A")
            rawDate: date
            presenters {
              name
              image
              text
              presentationTitle
              links {
                linkText
                linkURL
              }
            }
            location {
              name
            }
          }
        }
      }
    }
  }
`;
