const dallinRoute = (req, res) => {
    res.send('Hello Dallin!');
};

const sharleneRoute = (req, res) => {
    res.send('Hello Sharlene!');
};

module.exports = {
    dallinRoute,
    sharleneRoute
};