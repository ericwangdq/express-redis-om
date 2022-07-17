import { Router } from "express";
import { personRepository } from "../om/person.js";

export const router = Router();

router.put("/", async (req, res) => {
  console.log(`Create person req ${req.body}`);
  const person = await personRepository.createAndSave(req.body);
  console.log(`Newly created person ${person}`);
  res.send(person);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  console.log(`Fetch person id ${id}`);
  const person = await personRepository.fetch(id);
  console.log(`Found person ${person}`);
  res.send(person);
});

router.post("/:id", async (req, res) => {
  const person = await personRepository.fetch(req.params.id);

  person.firstName = req.body.firstName ?? null;
  person.lastName = req.body.lastName ?? null;
  person.age = req.body.age ?? null;
  person.verified = req.body.verified ?? null;
  person.location = req.body.location ?? null;
  person.locationUpdated = req.body.locationUpdated ?? null;
  person.skills = req.body.skills ?? null;
  person.personalStatement = req.body.personalStatement ?? null;

  await personRepository.save(person);

  res.send(person);
});

router.delete("/:id", async (req, res) => {
  await personRepository.remove(req.params.id);
  res.send({ entityId: req.params.id });
});

router.get("/get/all", async (req, res) => {
  console.log(`Search all`);
  // const offset = 100;
  // const count = 25;
  const persons = await personRepository.search().return.all();
  console.log(`Found persons ${persons.length}`);
  res.send(persons);
});

router.get("/get/page", async (req, res) => {
  console.log(`Search page`);
  const offset = 2;
  const count = 5;
  const persons = await personRepository.search().return.page(offset, count); //
  console.log(`Found persons ${persons.length}`);
  res.send(persons);
});

router.get("/search/:keyword", async (req, res) => {
  const keyword = req.params.keyword;
  console.log(`Search keyword ${keyword}`);
  const persons = await searchPersons(keyword);
  console.log(`Found persons ${persons.length}`);
  res.json(persons);
});

router.get("/search/:keyword/first", async (req, res) => {
  const keyword = req.params.keyword;
  console.log(`Search keyword ${keyword}`);
  const person = await personRepository
    .search()
    .where("firstName")
    .matches(keyword)
    .or("lastName")
    .matches(keyword)
    .or("skills")
    .contain(keyword)
    .sortAscending("age")
    .return.first();
  console.log(`Found persons ${person}`);
  res.json(person);
});

const searchPersons = async (keyword) => {
  // redblade.select('Person', { firstName: keyword }, function(err, persons) {
  //   console.log(persons[0])
  // })
  return await personRepository
    .search()
    .where("firstName")
    .matches(keyword)
    .or("lastName")
    .matches(keyword)
    .or("skills")
    .contain(keyword)
    .sortAscending("age")
    .return.all();
};
