import React from "react";
import { Segment, Header, List, Icon } from "semantic-ui-react";

import { Recommendation } from "../../types/types";

import "./RecommendationDisplay.css";
import { moviesPath } from "../../constants/constants";

const parseMovieTitle = (id: string): string => {
  if (!id || typeof id !== "string") return "Unknown Title";
  const parts = id.split("_");
  if (parts.length < 2) return id;
  return parts.slice(0, -1).join(" ") + ` (${parts[parts.length - 1]})`;
};

type RecommendationDisplayProps = {
  recommendation: Recommendation;
};
export const RecommendationDisplay = ({
  recommendation,
}: RecommendationDisplayProps) => {
  return (
    <Segment
      textAlign="center"
      inverted
      className="rec-display"
      data-testid="rec-display"
    >
      {/* Header */}
      <Header as="h1" className="rec-header">
        <Icon name="film" color="yellow" />
        BLOCKBUSTER PICKS
        <Icon name="film" color="yellow" />
      </Header>

      <p className="rec-tagline">Be kind, rewind your vibes 🎬</p>

      {/* Best Pick */}
      <Segment inverted className="rec-best-pick">
        <Header as="h2" className="rec-section-title">
          Best Pick
        </Header>
        {/* @TODO: linking removes history -> i.e. back won't take you 
             to recommendations but to rec engine page */}
        <a
          href={`${moviesPath}/${recommendation.bestPick}`}
          className="rec-best-pick-text"
        >
          🎬 {parseMovieTitle(recommendation.bestPick)}
        </a>
      </Segment>

      {/* Good Picks */}
      <Segment inverted className="rec-good-picks">
        <Header as="h2" className="rec-section-title good-picks-title">
          Good Picks
        </Header>
        <List
          divided
          relaxed
          items={recommendation.goodPicks.map((id) => ({
            key: id,
            content: (
              <a href={`${moviesPath}/${id}`} className="rec-good-pick-item">
                {parseMovieTitle(id)}
              </a>
            ),
          }))}
        />
      </Segment>

      {/* Footer */}
      <p className="rec-footer">
        © 1995 Blockbuster Video Corp. All Rights Rewound.
      </p>
    </Segment>
  );
};
