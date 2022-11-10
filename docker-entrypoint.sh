#!/bin/bash

mongoimport --uri mongodb://db:27017/web-shop --upsertFields name --collection products --file ./products.json --jsonArray
mongoimport --uri mongodb://db:27017/web-shop --upsertFields name --collection uploads --file ./uploads.json --jsonArray
mongoimport --uri mongodb://db:27017/web-shop --upsertFields name --collection categories --file ./categories.json --jsonArray
