var async = require('async');
const User = require("../model/userModel");
const Book = require("../model/bookModel");
const Result = require("../util/Result");
const CONSTANTS = require("../constant/constants");
const winston = require("winston");
const mongoose = require("mongoose");
const {resolve} = require("path");
const {tokenEncryptPassword, tokenComparePassword, tokenSign, tokenVerify} = require("../auth/token");
const History = require("../model/historyModel");
const Page = require("../util/Page");
const TimeUtils = require("../util/TimeUtils");

module.exports.initialUsers = async () => {
    try {
        const many = [{
            libraryId: null,
            username: "user",
            password: "$2b$10$DDcS9gnik4E2UW7K.6qvUewHZqrpFo4uJsJb5ndu5eaGvZCrVXytm",
            email: "",
            realName: "User1",
            phone: "",
            role: "",
            createTime: "2023-12-31T22:09:09.000Z",
        },
            {
                libraryId: null,
                username: "admin",
                password: "$2b$10$olD2YODuctyJzLm38xPJNOatO4bCVjvkcCBTnJYFB5uP2vSCeMjWu",
                email: "",
                realName: "Admin1",
                phone: "",
                role: "ADMIN",
                createTime: "2024-01-01T00:09:43.000Z",
            }];
        await User.insertMany(many);
    } catch (ex) {
        winston.error("initial users failed, reason:", ex);
    }
}

module.exports.initialBooks = async () => {
    try {
        const many = [{
            title: "Mao's China and the Cold War",
            author: "Jian Chen",
            ISBN: "1803242973",
            genre: "Technology",
            publicationYear: "1952",
            description: "This book is your guide to a full stack development journey using the two most powerful frameworks of the modern web - Django & React. As you progress through the chapters, you'll explore the essential fundamentals of both frameworks to understand it's capabilities. Get ready to leverage the powerful frontend features of React with the.",
            edition: "1",
            format: "432",
            language: "English",
            identifier: "ISBN: 1803242973",
            type: "Book",
            source: " Alma/SFX Local Collection",
            createTime: "2024-01-01T00:36:57.000Z",
        },
            {
                title: "The politics of the Irish Civil War",
                author: "Bill. Kissane",
                ISBN: "1803242973",
                genre: "Technology",
                publicationYear: "2022",
                description: "This book is your guide to a full stack development journey using the two most powerful frameworks of the modern web - Django & React. As you progress through the chapters, you'll explore the essential fundamentals of both frameworks to understand it's capabilities. Get ready to leverage the powerful frontend features of React with the.",
                edition: "1",
                format: "432",
                language: "English",
                identifier: "ISBN: 1803242973",
                type: "Book",
                source: " Alma/SFX Local Collection",
                createTime: ISODate("2024-01-01T00:36:57.000Z")
            },
            {
                ISBN: "1803242973",
                author: "Rob. Larsen",
                createTime: "2024-01-01T00:36:57.000Z",
                description: "This book is your guide to a full stack development journey using the two most powerful frameworks of the modern web - Django & React. As you progress through the chapters, you'll explore the essential fundamentals of both frameworks to understand it's capabilities. Get ready to leverage the powerful frontend features of React with the.",
                edition: "1",
                format: "432",
                genre: "Technology",
                identifier: "ISBN: 1803242973",
                language: "English",
                publicationYear: "2013",
                source: " Alma/SFX Local Collection",
                title: "Beginning HTML & CSS",
                type: "Book"
            },
            {
                ISBN: "1803242973",
                author: "Nova Science Publishers, author, issuing body.",
                createTime: "2024-01-01T00:36:57.000Z",
                description: "This book is your guide to a full stack development journey using the two most powerful frameworks of the modern web - Django & React. As you progress through the chapters, you'll explore the essential fundamentals of both frameworks to understand it's capabilities. Get ready to leverage the powerful frontend features of React with the.",
                edition: "1",
                format: "432",
                genre: "Technology",
                identifier: "ISBN: 1803242973",
                language: "English",
                publicationYear: "2001",
                source: " Alma/SFX Local Collection",
                title: "United Nations Convention on the Law of the Sea",
                type: "Book"
            },
            {
                ISBN: "1803242973",
                author: "International Committee of the Red Cross.",
                createTime: "2024-01-01T00:36:57.000Z",
                description: "This book is your guide to a full stack development journey using the two most powerful frameworks of the modern web - Django & React. As you progress through the chapters, you'll explore the essential fundamentals of both frameworks to understand it's capabilities. Get ready to leverage the powerful frontend features of React with the.",
                edition: "1",
                format: "432",
                genre: "Technology",
                identifier: "ISBN: 1803242973",
                language: "English",
                publicationYear: "2023",
                source: " Alma/SFX Local Collection",
                title: "The international review of the Red Cross.",
                type: "Book"
            },
            {
                ISBN: "1803242973",
                author: "D. G. Newcombe (David Gordon), 1952-, author.",
                createTime: "2024-01-01T00:36:57.000Z",
                description: "This book is your guide to a full stack development journey using the two most powerful frameworks of the modern web - Django & React. As you progress through the chapters, you'll explore the essential fundamentals of both frameworks to understand it's capabilities. Get ready to leverage the powerful frontend features of React with the.",
                edition: "1",
                format: "432",
                genre: "Technology",
                identifier: "ISBN: 1803242973",
                language: "English",
                publicationYear: "1952",
                source: " Alma/SFX Local Collection",
                title: "Henry VIII and the English Reformation",
                type: "Book"
            },
            {
                ISBN: "1803242973",
                author: "Hutter, Frank ; Kotthoff, Lars ; Vanschoren, Joaquin",
                createTime: "2024-01-01T00:36:57.000Z",
                description: "This book is your guide to a full stack development journey using the two most powerful frameworks of the modern web - Django & React. As you progress through the chapters, you'll explore the essential fundamentals of both frameworks to understand it's capabilities. Get ready to leverage the powerful frontend features of React with the.",
                edition: "1",
                format: "432",
                genre: "Technology",
                identifier: "ISBN: 1803242973",
                language: "English",
                publicationYear: "2019",
                source: " Alma/SFX Local Collection",
                title: "Automated Machine Learning: Methods, Systems, Challenges",
                type: "Book"
            },
            {
                ISBN: "1803242973",
                author: "Thucydides.",
                createTime: "2024-01-01T00:36:57.000Z",
                description: "This book is your guide to a full stack development journey using the two most powerful frameworks of the modern web - Django & React. As you progress through the chapters, you'll explore the essential fundamentals of both frameworks to understand it's capabilities. Get ready to leverage the powerful frontend features of React with the.",
                edition: "1",
                format: "432",
                genre: "Technology",
                identifier: "ISBN: 1803242973",
                language: "English",
                publicationYear: "2008",
                source: " Alma/SFX Local Collection",
                title: "The History of the Peloponnesian War",
                type: "Book"
            },
            {
                ISBN: "1803242973",
                author: "Mangabo, Kolawole",
                createTime: "2024-01-01T00:36:57.000Z",
                description: "This book is your guide to a full stack development journey using the two most powerful frameworks of the modern web - Django & React. As you progress through the chapters, you'll explore the essential fundamentals of both frameworks to understand it's capabilities. Get ready to leverage the powerful frontend features of React with the.",
                edition: "1",
                format: "432",
                genre: "Technology",
                identifier: "ISBN: 1803242973",
                language: "English",
                publicationYear: "2023",
                source: " Alma/SFX Local Collection",
                title: " Full Stack Django and React: Get Hands-On Experience in Full-stack Web Development with Python, React, and AWS",
                type: "Book"
            },
            {
                ISBN: "1803242973",
                author: "Susan Atkins author. Brenda Hale author.",
                createTime: "2024-01-01T00:36:57.000Z",
                description: "This book is your guide to a full stack development journey using the two most powerful frameworks of the modern web - Django & React. As you progress through the chapters, you'll explore the essential fundamentals of both frameworks to understand it's capabilities. Get ready to leverage the powerful frontend features of React with the.",
                edition: "1",
                format: "432",
                genre: "Technology",
                identifier: "ISBN: 1803242973",
                language: "English",
                publicationYear: "2023",
                source: " Alma/SFX Local Collection",
                title: "Women and the law",
                type: "Book"
            },
            {
                ISBN: "1803242973",
                author: "Shi, Heng ; Xu, Minghao ; Li, Ran",
                createTime: "2024-01-01T00:36:57.000Z",
                description: "This book is your guide to a full stack development journey using the two most powerful frameworks of the modern web - Django & React. As you progress through the chapters, you'll explore the essential fundamentals of both frameworks to understand it's capabilities. Get ready to leverage the powerful frontend features of React with the.",
                edition: "1",
                format: "432",
                genre: "Technology",
                identifier: "ISBN: 1803242973",
                language: "English",
                publicationYear: "2023",
                source: " Alma/SFX Local Collection",
                title: "Deep Learning for Household Load Forecasting-A Novel Pooling Deep RNN",
                type: "Book"
            }];
        await User.insertMany(many);
    } catch (ex) {
        winston.error("initial books failed, reason:", ex);
    }
}
