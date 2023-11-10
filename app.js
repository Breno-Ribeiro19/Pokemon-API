const express = require('express')
const app = express()
const bodyParser = require("body-Parser")
const handlebars = require("express-handlebars").engine
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.engine("handlebars",handlebars({extname: "handlebars" }))
app.set("view engine", "handlebars")
app.set("views", "views")

app.get("/",async function(req,res) {
    const response = await fetch(
		`https://pokeapi.co/api/v2/pokemon/`
	)
	const json = await response.json()

	const pokemons = await Promise.all(
		json.results.map(async ({ url }) => {
			const pokemonRes = await fetch(url)
			return pokemonRes.json()
		})
	)

    return res.render("index", {pokemons})
})

module.exports = app