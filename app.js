const cheerio = require("cheerio")
const axios = require("axios");
const j2cp = require("json2csv")
const fs = require("fs")


const url = "https://www.quill.com/hanging-file-folders/cbk/122567.html"
const data = []
async function getGenre(){
try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data)
    const book = $("h3");
    book.each(function(){
        Productname = $(this).find("a").text().trim();

        const desc = $(".skuBrowseBullets")
        desc.each(function(){
            Productdescription = $(this).text()
        })

        const price = $(".priceupdate");
        price.each(function(){
            Productprice =  $(this).text()
        })

        const item = $(".iNumber");
        item.each(function(){
            Itemnumber = $(this).text()
        })

        const categor = $(".H1")
        categor.each(function(){
            categorie = $(this).text()

        })

        const mode = $(".model-number");
        mode.each(function(){
            Modelnumber = $(this).text()
        })
        data.push({Productname,Modelnumber,Itemnumber,Productprice,Productdescription,categorie})
    })
    const parser =  j2cp;
    const csv = parser.parse(data);
    fs.writeFileSync("./quil.csv",csv);
    console.log(data);

} catch (error) {
    console.error(error)
}
}
getGenre()
