import { AppiumDriver } from "nativescript-dev-appium";
import { assert } from "chai";

const home = "Home";
const layoutWithFrame = "Layout w/ frame";
const layoutWithMultiFrame = "Layout w/ multi frame";
const pageWithFrame = "Page w/ frame";
const pageWithMultiFrame = "Page w/ multi frame";
const layoutHome = "layout home page";
const layoutHomeSecondary = "layout home secondary page";
const frameHome = "frame home page";
const navigateToSomePage = "navigate to some page";
const navigateToOtherPage = "navigate to other page";
const somePage = "some page";
const otherPage = "other page";
const players = "Players";
const teams = "Teams";
const playerBack = "playerBack";
const somePageBack = "somePageBack";
const otherPageBack = "otherPageBack";
const teamBack = "teamBack";
const resetApp = "reset app";

export const playerOne = {
    name: "Player One",
    description: "Goalkeeper"
};
export const playerTwo = {
    name: "Player Two",
    description: "Defender"
}
export const teamOne = {
    name: "Team One",
    description: "u17"
};
export const teamTwo = {
    name: "Team Two",
    description: "u21"
}

export interface Item {
    name: string;
    description: string;
}

export class Screen {

    private _driver: AppiumDriver

    constructor(driver: AppiumDriver) {
        this._driver = driver;
    }

    navigateToLayoutWithFrame = async () => {
        await this.navigateToPage(layoutWithFrame);
    };

    navigateToLayoutWithMultiFrame = async () => {
        await this.navigateToPage(layoutWithMultiFrame);
    }

    navigateToPageWithFrame = async () => {
        await this.navigateToPage(pageWithFrame);
    }

    navigateToSomePage = async () => {
        await this.navigateToPage(navigateToSomePage);
    };

    navigateToOtherPage = async () => {
        await this.navigateToPage(navigateToOtherPage);
    }

    navigateToPlayerDetails = async (player: Item) => {
        await this.navigateToItem(player);
    };

    resetToHome = async () => {
        const btnReset = await this._driver.findElementByText(resetApp);
        await btnReset.tap();
    };

    navigateToTeamDetails = async (team: Item) => {
        await this.navigateToItem(team);
    };

    goBackToPlayersList = async () => {
        await this.goBack(playerBack);
    };

    goBackToTeamsList = async () => {
        await this.goBack(teamBack);
    };

    goBackFromSomePage = async () => {
        await this.goBack(somePageBack);
    }

    goBackFromOtherPage = async () => {
        await this.goBack(otherPageBack);
    }

    loadedHome = async () => {
        const lblHome = await this._driver.findElementByText(home);
        assert.isTrue(await lblHome.isDisplayed());
        console.log(home + " loaded!");
    };

    loadedLayoutWithFrame = async () => {
        await this.loadedPage(layoutHome);
    };

    loadedLayoutWithMultiFrame = async () => {
        await this.loadedPage(layoutHome);
        await this.loadedPage(layoutHomeSecondary);
    };

    loadedPageWithFrame = async () => {
        await this.loadedPage(frameHome);
    }

    loadedSomePage = async () => {
        await this.loadedPage(somePage);
    }

    loadedOtherPage = async () => {
        await this.loadedPage(otherPage);
    }

    loadedPlayersList = async () => {
        const lblPlayerOne = await this._driver.findElementByText(playerOne.name);
        assert.isTrue(await lblPlayerOne.isDisplayed());
        console.log(players + " loaded!");
    }

    loadedPlayerDetails = async (player: Item) => {
        await this.loadedItem(player);
    }

    loadedTeamsList = async () => {
        const lblTeamOne = await this._driver.findElementByText(teamOne.name);
        assert.isTrue(await lblTeamOne.isDisplayed());
        console.log(teams + " loaded!");
    }

    loadedTeamDetails = async (team: Item) => {
        await this.loadedItem(team);
    }

    private navigateToPage = async (page: string) => {
        const btnPage = await this._driver.findElementByText(page);
        await btnPage.tap();
    };

    private loadedPage = async (page: string) => {
        const lblPage = await this._driver.findElementByText(page);
        assert.isTrue(await lblPage.isDisplayed());
        console.log(page + " loaded!");
    };

    private navigateToItem = async (item: Item) => {
        const lblItem = await this._driver.findElementByText(item.name);
        await lblItem.tap();
    }

    private loadedItem = async (item: Item) => {
        const lblItemName = await this._driver.findElementByText(item.name);
        assert.isTrue(await lblItemName.isDisplayed());

        const lblItemDescription = await this._driver.findElementByText(item.description);
        assert.isTrue(await lblItemDescription.isDisplayed()); 

        console.log(item.name + " loaded!");
    }

    private goBack = async (accessibilityId: string) => {
        const btnBack = await this._driver.findElementByAccessibilityId(accessibilityId);
        await btnBack.tap();
    }
}