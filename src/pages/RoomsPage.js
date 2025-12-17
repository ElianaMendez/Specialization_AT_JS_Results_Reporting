/* // src/pages/RoomsPage.js
const BasePage = require('./BasePage');

class RoomsPage extends BasePage {
    constructor(page) {
        super(page);
        this.roomsList = page.locator('.room');
        this.roomNames = page.locator('.room .room-name');
        // admin controls would have separate selectors if testing admin
    }

    async open() {
        await this.navigate('/');
        await this.waitForVisible(this.roomNames.first());
    }

    async getRoomCount() {
        return await this.roomsList.count();
    }

    async firstRoomName() {
        return await this.getText(this.roomNames.first());
    }
}

module.exports = RoomsPage; */