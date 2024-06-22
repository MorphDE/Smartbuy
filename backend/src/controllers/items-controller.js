import { ItemsService } from "../services/items-service.js";

async function getAllItemsCtrl(req, res) {
    try {
        const result = await ItemsService.getAllItems();
        res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ err, message: err.message || "Could not get items" });
    }
};

async function getItemsByCategoryIdCtrl(req, res) {
    try {
        const result = await ItemsService.getItemsByCategoryId(req.params.categoryId);
        res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ err, message: err.message || "Could not get items for category " + req.params.categoryId });
    }
}

async function getItemsByRatingDescCtrl(req, res) {
    try {
        const result = await ItemsService.getItemsByRatingDesc();
        res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ err, message: err.message || "Could not get items for by rating" });
    }
}

async function getItemsBySearchTextCtrl(req, res) {
    try {
        const result = await ItemsService.searchItemsByName(req.params.searchText);
        res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ err, message: err.message || "Could not get items for search text " + req.params.searchText });
    }
}


async function getItemByIdCtrl(req, res) {
    try {
        const result = await ItemsService.getItemById(req.params.itemId);
        res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ err, message: err.message || "Could not get item with id " + req.params.itemId });
    }
}

async function createItemCtrl(req, res) {
    try {
        let body = req.body;
        body.image = req.file.path;
        const result = await ItemsService.createItem(body);
        res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ err, message: err.message || "Could not create item" });
    }
}

async function updateItemByIdCtrl(req, res) {
    try {
        const result = await ItemsService.updateItem(req.params.itemId, req.body);
        res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ err, message: err.message || "Could not update item with id " + req.params.itemId });
    }
}

async function deleteItemByIdCtrl(req, res) {
    try {
        const result = await ItemsService.deleteItem(req.params.itemId);
        res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ err, message: err.message || "Could not delete item with id " + req.params.itemId });
    }
}

export const ItemsController = {
    getAllItemsCtrl,
    getItemsByCategoryIdCtrl,
    getItemsByRatingDescCtrl,
    getItemsBySearchTextCtrl,
    getItemByIdCtrl,
    createItemCtrl,
    updateItemByIdCtrl,
    deleteItemByIdCtrl
}