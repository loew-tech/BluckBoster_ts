import * as utils from "../../utils/utils";
import * as graphql from "../../utils/graphql_utils";
import * as rest from "../../utils/rest_utils";
import * as cookieUtils from "../../utils/cookieUtils";

jest.mock("../../utils/graphql_utils");
jest.mock("../../utils/rest_utils");
jest.mock("../../utils/cookieUtils");

const mockUser = { username: "test_user", api_choice: "REST" };

describe("utils", () => {
  beforeEach(() => {
    (cookieUtils.getAPIChoiceFromCookie as jest.Mock).mockReturnValue("REST");
    (cookieUtils.getUserFromCookie as jest.Mock).mockReturnValue(mockUser);
  });
  it("calls REST login", async () => {
    (rest.login as jest.Mock).mockResolvedValue(mockUser);
    const result = await utils.login("test_user");
    expect(result).toEqual(mockUser);
  });
  it("calls GraphQL fetchMovie", async () => {
    (cookieUtils.getAPIChoiceFromCookie as jest.Mock).mockReturnValue(
      "GraphQL"
    );
    (graphql.fetchMovie as jest.Mock).mockResolvedValue({
      id: "id",
      title: "Movie",
    });
    const result = await utils.fetchMovie("id");
    expect(result?.title).toBe("Movie");
  });
  it("updates cart via GraphQL", () => {
    (cookieUtils.getAPIChoiceFromCookie as jest.Mock).mockReturnValue(
      "GraphQL"
    );
    (graphql.updateCart as jest.Mock).mockReturnValue(["123"]);
    const result = utils.updateCart("user", "123", [], false);
    expect(result).toEqual(["123"]);
  });
  it("sets API choice and updates user cookie", async () => {
    (rest.setAPIChoice as jest.Mock).mockResolvedValue(true);
    const result = await utils.setAPIChoice("GraphQL");
    expect(result).toBe(true);
  });
});
