import { AppiumDriver, createDriver } from "nativescript-dev-appium";
import { Screen, playerOne, playerTwo, teamOne, teamTwo } from "./screen"
import {
    testPlayerNavigated,
    testPlayerNavigatedBack,
    testPlayersParentFrameNavigated,
    testPlayersParentFrameNavigatedBack,
    testTeamNavigated,
    testTeamNavigatedBack,
    testTeamsParentFrameNavigated,
    testTeamsParentFrameNavigatedBack
} from "./shared.e2e-spec"

describe("layout-root:", () => {
    let driver: AppiumDriver;
    let screen: Screen;

    before(async () => {
        driver = await createDriver();
        screen = new Screen(driver);
    });

    after(async () => {
        await driver.quit();
        console.log("Quit driver!");
    });

    afterEach(async function () {
        if (this.currentTest.state === "failed") {
            await driver.logTestArtifacts(this.currentTest.title);
        }
    });

    it("loaded home page", async () => {
        await screen.loadedHome();
    });

    it("loaded layout root with nested frames", async () => {
        await screen.navigateToLayoutWithFrame();
        await screen.loadedLayoutWithFrame();
    });

    it("loaded players list", async () => {
        await screen.loadedPlayersList();
    });

    it("loaded player details and go back twice", async () => {
        await testPlayerNavigated(playerOne, screen);
        await testPlayerNavigatedBack(screen, driver);

        await testPlayerNavigated(playerTwo, screen);
        await testPlayerNavigatedBack(screen, driver);
    });

    it("navigate parent frame and go back", async () => {
        await testPlayersParentFrameNavigated(screen);
        await testPlayersParentFrameNavigatedBack(screen, driver);
    });

    it("loaded player details and navigate parent frame and go back", async () => {
        await testPlayerNavigated(playerOne, screen);
        await testPlayersParentFrameNavigated(screen);

        await driver.navBack();
        await screen.loadedPlayerDetails(playerOne);

        await screen.goBackToPlayersList();
        await screen.loadedPlayersList();
    });

    it("loaded home page again", async () => {
        await screen.resetToHome();
        await screen.loadedHome();
    });

    it("loaded layout root with multi nested frames", async () => {
        await screen.navigateToLayoutWithMultiFrame();
        await screen.loadedLayoutWithMultiFrame();
    });

    it("loaded players list", async () => {
        await screen.loadedPlayersList();
    });

    it("loaded teams list", async () => {
        await screen.loadedTeamsList();
    });

    it("loaded team details and go back twice", async () => {
        await testTeamNavigated(teamOne, screen);
        await testTeamNavigatedBack(screen, driver);

        await testTeamNavigated(teamTwo, screen);
        await testTeamNavigatedBack(screen, driver);
    });

    it("navigate teams parent frame and go back", async () => {
        await testTeamsParentFrameNavigated(screen);
        await testTeamsParentFrameNavigatedBack(screen, driver);
    });

    it("loaded team details and navigate parent frame and go back", async () => {
        await testTeamNavigated(teamOne, screen);
        await testTeamsParentFrameNavigated(screen);

        await driver.navBack();
        await screen.loadedTeamDetails(teamOne);

        await screen.goBackToTeamsList();
        await screen.loadedTeamsList();
    });

    it("loaded layout root with multi nested frames again", async () => {
        await screen.loadedLayoutWithMultiFrame();
    });

    it("loaded players list", async () => {
        await screen.loadedPlayersList();
    });

    it("loaded teams list", async () => {
        await screen.loadedTeamsList();
    });

    it ("mix player and team list actions and go back", async () => {
        await testPlayerNavigated(playerOne, screen);

        await testTeamsParentFrameNavigated(screen);
        await screen.loadedPlayerDetails(playerOne);  // assert no changes in the sibling frame

        await testTeamsParentFrameNavigatedBack(screen, driver);
        await screen.loadedPlayerDetails(playerOne);  // assert no changes in the sibling frame

        await testTeamsParentFrameNavigated(screen);
        await testPlayersParentFrameNavigated(screen);
        await screen.loadedOtherPage(); // assert no changes in the sibling frame

        await testPlayersParentFrameNavigatedBack(screen, driver);

        await screen.goBackToPlayersList();
        await screen.loadedPlayersList();

        await screen.goBackFromOtherPage();
        await screen.loadedTeamsList();
    });
});
