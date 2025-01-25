const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const OpenAI = require('openai');
const fs = require('fs');
const axios = require('axios');
const { type } = require('os');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API, // Access API key from .env
});

async function getBookInfo(req, res){
    const imageURL = req.body.imageURL
    // const imageURL = "https://firebasestorage.googleapis.com/v0/b/test-5a8ff.appspot.com/o/images%2F2025-01-25T14%3A45%3A50.462Z_2025-01-25%2021.08.53.jpg?alt=media&token=e8cb4c60-b958-4d74-8476-1079e6a2eb40"

    let bookInfo = await readImage(imageURL)
    bookInfo = await callGoogleAPI(bookInfo)

    res.json(bookInfo)
}

async function callGoogleAPI(bookInfo){
    let title = bookInfo.title
    let author = bookInfo.author
    let googleApiKey = process.env.GOOGLE_API

    try {

        let response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
            params: {
                q: `${title}+intitle:${title}+inauthor:${author}`,
                key: googleApiKey,
                fields: 'totalItems,items(id,volumeInfo,saleInfo)'
            }
        });

        let totalPrice = 0
        let bookCount = 0
        let avgPrice;

        for (element of response.data.items){
            let price = element.saleInfo?.listPrice?.amount

            if (price !== undefined){
                totalPrice += price
                bookCount += 1
            }

            avgPrice = (totalPrice / bookCount).toFixed(2)
        }

        const filteredBooks = response.data.items.filter(book => book.volumeInfo.title.toLowerCase() === 'holes');
        
        let genre;

        for (book of filteredBooks){
            if (book?.volumeInfo?.categories !== undefined){
                genre = book?.volumeInfo?.categories[0]
                break
            }
        }

        bookInfo.price = avgPrice
        bookInfo.genre = genre

        return bookInfo
    }
    catch (error) {
        console.error(error);
    }
}

// Function to encode the image to Base64
async function encodeImageFromUrl(imageUrl) {
    // Fetch the image from the URL
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });

    // Convert the image data to a base64 string
    const base64Image = Buffer.from(response.data, 'binary').toString('base64');

    // Return the base64 string with the data URL prefix
    return `data:image/jpeg;base64,${base64Image}`;
}

async function readImage(imageURL) {
    const base64Image = await encodeImageFromUrl(imageURL)

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "user",
                    content: [
                        {
                            type: "text",
                            text: "Identify the title and author of this book."
                        },
                        {
                            type: "image_url",
                            image_url: {
                                "url": base64Image,
                            },
                        },
                    ],
                },
            ],
            max_tokens: 300,
            response_format: {
                type: "json_schema",
                json_schema: {
                    name: "book_schema",
                    schema: {
                        type: "object",
                        properties: {
                            title: {
                                type: "string",
                            },
                            "author": {
                                type: "string",
                            }
                        },
                        required: ["title", "author"],
                        additionalProperties: false
                    },
                    strict: true
                }
            }
        })
        console.log(JSON.parse(response.choices[0].message.content))
        return JSON.parse(response.choices[0].message.content)
    }
    catch (error) {
        console.error(error);
    }
}

module.exports = { getBookInfo }