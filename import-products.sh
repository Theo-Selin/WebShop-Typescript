#! /bin/bash

mongoimport --uri mongodb://db:27017/web-shop --upsertFields name --collection products --file ./products.json --jsonArray