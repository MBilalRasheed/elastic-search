function fetch_fn(req, res, next) {
    try {
        // This is for backwards compability (BQA and BDEV) - where web app is served from a root path.
        res.sendFile(path.join(rootDir, 'src', 'index_nodestart.html'));
    } catch (err) {
        console.log(err.message);
    }
}

module.exports = { fetch_fn }

