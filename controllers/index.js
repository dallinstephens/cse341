const getName = (req, res) => {
    res.send('Sharlene Ashton');
};

const getMyName = (req, res) => {
    res.send('Dallin Stephens');
};

module.exports = {
    getName,
    getMyName
};