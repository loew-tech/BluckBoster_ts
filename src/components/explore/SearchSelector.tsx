import { Dropdown, DropdownProps } from "semantic-ui-react";
import { DIRECTOR, KEVIN_BACON, STAR } from "../../constants/constants";

const CREATOR_OPTIONS = [
  { key: DIRECTOR, text: DIRECTOR, value: DIRECTOR },
  { key: STAR, text: STAR, value: STAR },
  { key: KEVIN_BACON, text: "Kevin Bacon", value: KEVIN_BACON },
];

const DEPTH_OPTIONS = Array.from({ length: 10 }, (_, i) => ({
  key: i + 1,
  text: `${i + 1}`,
  value: i + 1,
}));

interface Props {
  exploreType: string;
  setExploreType: (value: string) => void;
  depth: number;
  setDepth: (value: number) => void;
}
export const SearchSelector = ({
  exploreType,
  setExploreType,
  depth,
  setDepth,
}: Props) => {
  const handleSelectionChange = (
    _: React.SyntheticEvent<HTMLElement>,
    { value }: DropdownProps
  ) => {
    setExploreType(value as string);
  };

  const handleDepthChange = (
    _: React.SyntheticEvent<HTMLElement>,
    { value }: DropdownProps
  ) => {
    setDepth(value as number);
  };

  return (
    <>
      <Dropdown
        placeholder="Select Search"
        fluid
        selection
        options={CREATOR_OPTIONS}
        onChange={handleSelectionChange}
        value={exploreType}
      />
      {exploreType === KEVIN_BACON && (
        <Dropdown
          placeholder="Select Search Depth"
          fluid
          selection
          options={DEPTH_OPTIONS}
          onChange={handleDepthChange}
          value={depth}
        />
      )}
    </>
  );
};
