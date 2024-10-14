import express from "express";
import ToDo from "../model/toDo.js";
import auth from "../middleware/auth.js";
import validetObjectId from "../middleware/validateObjectId.js";

const router = express.Router();

router.get("/", auth, async (req, res) => {
    const toDos = await ToDo.find({ user: req.auth._id });
    res.send(toDos);
});

router.post("/", auth, async (req, res) => {
    const toDo = new ToDo({
        user: req.auth._id,
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        priorty: req.body.priorty,
        dueDate: req.body.dueDate
    });

    await toDo.save();
    res.send(toDo);
});

router.put("/:id", [auth, validetObjectId], async (req, res) => {
    const toDo = await ToDo.findOneAndUpdate({ _id: req.params.id, user: req.auth._id }, {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        priorty: req.body.priorty,
        dueDate: req.body.dueDate,
    }, { new: true });

    if (!toDo) return res.status(404).send("The toDo with the given ID was not found.");

    res.send(toDo);
});

router.delete("/:id", [auth, validetObjectId], async (req, res) => {
    const toDo = await ToDo.findOneAndDelete({ _id: req.params.id, user: req.auth._id });

    if (!toDo) return res.status(404).send("The toDo with the given ID was not found.");

    res.send(toDo);
});

export default router;