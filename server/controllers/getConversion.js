const axios = require("axios");
const getConversionRouter = require("express").Router();

getConversionRouter.get("/:original&:convertTo", async (req, res) => {
  let original = req.params.original;
  let convertTo = req.params.convertTo;
  await axios
    .get(
      `https://free.currconv.com/api/v7/convert?q=${original}_${convertTo},${convertTo}_${original}&compact=ultra&apiKey=d4cf3228112bfb5a29f5`
    )
    .then((response) => res.status(200).json(response.data))
    .catch((err) => console.log(err));
});

module.exports = getConversionRouter;
