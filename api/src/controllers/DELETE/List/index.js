const { List } = require('../../../db');

const deleteList = async (listId) => {
    const list = await List.findByPk(listId);

    if (!list || list.active === false) {
        return false;
    } else {
        await list.update({ active: false });
        await list.save();
        return true;
    }
}

module.exports = { deleteList }