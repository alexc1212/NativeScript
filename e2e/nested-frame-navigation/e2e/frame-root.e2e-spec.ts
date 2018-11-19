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

describe("frame-root:", () => {
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

    it("loaded frame root with nested frame", async () => {
        await screen.navigateToPageWithFrame();
        await screen.loadedPageWithFrame();
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
});