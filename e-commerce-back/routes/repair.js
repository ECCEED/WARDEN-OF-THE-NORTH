const router = require('express').Router();

const {GetAllItemsRepairable,markasRepaired} = require("../controllers/repair");

router.get("/getallrepairs",GetAllItemsRepairable);
router.post("/itemrepaired/:id",markasRepaired);

module.exports = router;