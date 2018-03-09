const fs = require('fs')
const path = require('path')
const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())

app.get('/api/mapping/:catalogId/:siteId', (req, res) => {
  const siteId = req.params.siteId
  const catalogId = req.params.catalogId

  fs.readFile(
    path.resolve(__dirname, 'response-json.txt'),
    { encoding: 'utf-8' },
    (error, data) => {
      if (error) {
        return res.status(500).json(error)
      }

      const parsed = JSON.parse(data)

      // const mappingList = parsed.mappingList.filter(
      //   item => item.siteID === +siteId && item.catalogId === +catalogId
      // )

      const mappingList = parsed.mappingList.filter(
        catalog => 
              catalog.siteID &&
              catalog.catalogId &&
              catalog.catalogName &&
              catalog.categoryId &&
              catalog.categoryName
      )

      return res.json({ ...parsed, mappingList })
      // return res.json(parsed)
    }
  )
})

app.listen(3000)
