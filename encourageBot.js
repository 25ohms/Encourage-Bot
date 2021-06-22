require("dotenv").config()
const Discord = require("discord.js")
const fetch = require("node-fetch")
const client = new Discord.Client()
sadWords = ["sad", "depressed", "unhappy", "angry", "miserable"]
encouragements = [
    "Cheer up!",
    "Hang in there.",
    "You are a great person / bot!"
  ]
const mysql = require("mysql")
const express = require('express')
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.PWD,
    database: "nice-words",
  });

  db.connect(err => {
      if(err) {
          console.log("Error")
      } else {
      console.log("connected to database")
      }
  })

function getQuote() {
    return fetch("https://zenquotes.io/api/random")
    .then(res => {
        return res.json()
    })
    .then(data => {
        return data[0]["q"] + " - " + data[0]["a"] 
    })
}

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`)
})

client.on("message", msg => {
    if (msg.author.bot) {
        return
    } 

    if (msg.content === "$inspire") {
        getQuote().then(quote => msg.channel.send(quote))
    }

    if (sadWords.some(word => msg.content.includes(word)))  {
        const encouragement = encouragements[Math.floor(Math.random() * encouragements.length)]
        msg.reply(encouragement)
    }
})

client.login(process.env.TOKEN)