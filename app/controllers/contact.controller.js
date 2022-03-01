const { BadRequestError } = require("../errors");
const handlePromise = require("../helpers/promise.helper");
const Contact = require("../models/contact.model");

// create and Save a new Contact
exports.create = async (req, res, next) => {
    // validate request
    if (!req.body.name){
        return next(new BadRequestError(400, "Name can not be empty"));
    }

    // create a contact
    const contact = new Contact({
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone,
        favorite: String(req.body.favorite).toLowerCase() === "true",
    });

    // save contact in the databse
    const [error, document] = await handlePromise(contact.save());

    if (error) {
        return next(new BadRequestError(500, 
            "An error occurred while creating the contact"));
    }

    return res.send(document);
};

// retrieve all contacts of a user from the database
exports.findAll = async (req, res, next) => {
    const condition = { };
    const name = req.query.name;
    if (name) {
        condition.name = { $regex: new RegExp(name), $option: "i" }; 
    }

    const [error, documents] = await handlePromise(Contact.find(condition));

    if (error) {
        return next(new BadRequestError(500,
            "An error occurred while retrieving contacts"));
    }

    return res.send(documents);
};

// find a single contact with an id
exports.findOne = async (req, res, next) => {
    const condition = {
        _id: req.params.id,
    };
    
    const [error, document] = await handlePromise(Contact.findOne(condition));

    if (error) {
        return next(new BadRequestError(500, 
            `Error retrieving contact with id=${req.params.id}`));
    }

    if (!document) {
        return next(new BadRequestError(404, "Contact not found"));
    }

    return res.send(document);
};

// find all a contact favorite
exports.findAllFavorite = async (req, res, next) => {
    const [error, documents] = await handlePromise(
        Contact.find({ favorite: true, })
    );

    if (error) {
        return next(new BadRequestError(500,
            "An error occurred while retrieving favorite contacts"));
    }
    
    return res.send(documents);
};

// update a contact by the id in the request
exports.update = async (req, res, next) => {
    if (!req.body) {
        return next(new BadRequestError(400,
            "Data to update can not be empty"));
    }

    const condition = {
        _id: req.params.id,
    }

    const [error, document] = await handlePromise(
        Contact.findOneAndUpdate(condition, req.body, {
            new: true,
        })
    );

    if (error) {
        return next(new BadRequestError(500,
            `Error updating contact with id=${req.params.id}`));
    }

    if (!document) {
        return next(new BadRequestError(404, "Contact not found"));
    }

    return res.send({ message: "Contact was update successfully", });
};

// delete a contact with the specified id in the request
exports.delete = async (req, res, next) => {
    const condition = {
        _id: req.params.id,
    };

    const [error, document] = await handlePromise(
        Contact.findOneAndDelete(condition)
    );

    if (error) {
        return next(new BadRequestError(500,
            `Error updating contact with id=${req.params.id}`));
    }

    if (!document) {
        return next(new BadRequestError(404, "Contact not found"));
    }

    return res.send({ message: "Contact was update successfully", });
};

// delete all contact of a user form the database
exports.deleteAll = async (req, res, next) => {
    const [error, data] = await handlePromise(
        Contact.deleteMany({ })
    );

    if (error) {
        return next(new BadRequestError(500,
            "An error occurred while retrieving favorite contacts"));
    }
    
    return res.send({
        message: `${data.deletedCount} contacts were deleted successfully`,
    });
};