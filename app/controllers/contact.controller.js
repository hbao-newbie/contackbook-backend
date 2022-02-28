// create and save a new contact
exports.create = async (req, res) => {
    res.send({ message: "create handler"});
};

// retrieve all contact of a user form the database
exports.findAll = async (req, res) => {
    res.send({ message: "findAll handler"});
};

// find a single contact with an id
exports.findOne = async (req, res) => {
    res.send({ message: "findOne handler"});
};

// find all a contact favorite
exports.findAllFavorite = async (req, res) => {
    res.send({ message: "find all favorite handler"});
};

// update a contact by id in the request
exports.update = async (req, res) => {
    res.send({ message: "update handler"});
};

// delete a contact with the specified id in the request
exports.delete = async (req, res) => {
    res.send({ message: "delete handler"});
};

// delete all contact of a user form the database
exports.deleteAll = async (req, res) => {
    res.send({ message: "deleteAll handler"});
};