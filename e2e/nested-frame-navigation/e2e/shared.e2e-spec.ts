import { Screen, Item } from "./screen";
import { AppiumDriver } from "nativescript-dev-appium";

export async function testPlayerNavigated(player: Item, screen: Screen) {
    await screen.navigateToPlayerDetails(player);
    await screen.loadedPlayerDetails(player);
}

export async function testPlayerNavigatedBack(screen: Screen, driver: AppiumDriver) {
    await driver.navBack();
    await screen.loadedPlayersList();
}

export async function testPlayersParentFrameNavigated(screen: Screen) {
    await screen.navigateToSomePage();
    await screen.loadedSomePage();
}

export async function testPlayersParentFrameNavigatedBack(screen: Screen, driver: AppiumDriver) {
    await driver.navBack();
    await screen.loadedPlayersList();
}

export async function testTeamNavigated(team: Item, screen: Screen) {
    await screen.navigateToTeamDetails(team);
    await screen.loadedTeamDetails(team);
}

export async function testTeamNavigatedBack(screen: Screen, driver: AppiumDriver) {
    await driver.navBack();
    await screen.loadedTeamsList();
}

export async function testTeamsParentFrameNavigated(screen: Screen) {
    await screen.navigateToOtherPage();
    await screen.loadedOtherPage();
}

export async function testTeamsParentFrameNavigatedBack(screen: Screen, driver: AppiumDriver) {
    await driver.navBack();
    await screen.loadedTeamsList();
}
