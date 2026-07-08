const express = require("express");
const mongoose = require("mongoose");
const wishlistModel = require("../models/wishlist.models");
const StatusCodes = require("http-status-codes");

module.exports.addWishlist = async (req, res) => {
    try {
        const { user_id, product_id } = req.body;

        // validation
        if (!user_id || !product_id) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "user_id and product_id are required.",
                statusCode: StatusCodes.BAD_REQUEST,
            });
        }

        if (!mongoose.Types.ObjectId.isValid(user_id) || !mongoose.Types.ObjectId.isValid(product_id)) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "Invalid user_id or product_id",
                statusCode: StatusCodes.BAD_REQUEST,
            });
        }

        // check if product already exists in user's wishlist
        let existingWishlistItem = await wishlistModel.findOne({ user_id, product_id });
        if (existingWishlistItem) {
            return res.status(StatusCodes.OK).json({
                success: true,
                message: "Item already in wishlist!",
                data: existingWishlistItem,
                statusCode: StatusCodes.OK,
            });
        }

        // create new wishlist item
        const wishlistItem = await wishlistModel.create({
            user_id,
            product_id
        });

        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Item added to wishlist successfully!",
            data: wishlistItem,
            statusCode: StatusCodes.OK,
        });

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message,
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        });
    }
};

module.exports.viewWishlist = async (req, res) => {
    try {
        const { user_id } = req.params;

        if (!user_id) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                statuscode: StatusCodes.BAD_REQUEST,
                message: "user_id is required",
            });
        }

        const wishlistItems = await wishlistModel
            .find({ user_id })
            .populate("user_id")
            .populate("product_id");

        return res.json({
            success: true,
            statuscode: StatusCodes.OK,
            message: "Wishlist with user & product fetched successfully!",
            data: wishlistItems,
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            statuscode: StatusCodes.INTERNAL_SERVER_ERROR,
            message: error.message,
        });
    }
};

module.exports.removeUserWishlistItems = async (req, res) => {
    try {
        const { _id } = req.body;

        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "Invalid ID Format"
            });
        }

        const deletedItem = await wishlistModel.findByIdAndDelete(_id);
        if (!deletedItem) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: "Wishlist item not found"
            });
        }

        res.status(StatusCodes.OK).json({
            success: true,
            message: "Wishlist item removed successfully"
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
        });
    }
};
