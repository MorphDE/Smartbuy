import { Items } from './../models/items.js';

const getAllItems = async () => {
    const allItems = await Items.find({});
    return allItems;
}

const getItemsByCategoryId = async (categoryId) => {
    const filteredItems = await Items.find({ categoryId })
    return filteredItems;
}

const getItemsByRatingDesc = async (limit = 10) => {
    const orderedItems = await Items.find({}).sort({ rating: -1 }).limit(limit);
    return orderedItems;
}

const searchItemsByName = async (searchText) => {
    const filteredItems = await Items.find({ name: { $regex: searchText, $options: 'i' } })
    return filteredItems;
}

const createItem = async (itemData) => {
    const itemFound = await Items.findOne({ name: itemData.name })
    if (itemFound) {
        throw new Error("Item with this name already exists!");
    } else {
        const newItem = await Items.create(itemData);
        return newItem;
    }
}

const getItemById = async (itemId) => {
    const itemFound = await Items.findById(itemId);
    if (itemFound) {
        return itemFound;
    } else {
        throw new Error("Item with this id was not found!");
    }
}

const deleteItem = async (itemId) => {
    const delItem = await Items.findByIdAndDelete(itemId)
    if (!delItem) throw new Error("Item with this id doesn't exist!");
    else return delItem;
};

const updateItem = async (itemId, itemData) => {
    const itemFound = await Items.findByIdAndUpdate(itemId, { $set: itemData }, { new: true });
    if (!itemFound) throw new Error("Item with this id doesn't exist!");
    else return itemFound;
}

export const ItemsService = {
    getAllItems,
    getItemsByCategoryId,
    getItemsByRatingDesc,
    getItemById,
    searchItemsByName,
    createItem,
    updateItem,
    deleteItem,
};
