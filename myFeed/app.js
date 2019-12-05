const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const Feed = require('feed').Feed;

app.get("/rss", function(req, res) {
  console.log("GET /rss");

  const posts = [
    {
      post: "Example post",
      url: "https://example.com/posts/s01e01.mp3",
      description: "Season one episode one",
      content: "Lorem ipsum dolor sit amet.",
      date: new Date(2018, 10, 01)
    }
  ];

  const feed = new Feed({
    title: "Feed Title",
    description: "This is my personal feed!",
    id: "http://example.com/",
    link: "http://example.com/",
    image: "http://example.com/image.png",
    favicon: "http://example.com/favicon.ico",
    copyright: "All rights reserved 2013, John Doe",
    updated: new Date(2013, 6, 14), // optional, default = today
    generator: "awesome", // optional, default = 'Feed for Node.js'
    feedLinks: {
      json: "https://example.com/json",
      atom: "https://example.com/atom"
    },
    author: {
      name: "John Doe",
      email: "johndoe@example.com",
      link: "https://example.com/johndoe"
    }
  });
   
  posts.forEach(post => {
    feed.addItem({
      title: post.title,
      id: post.url,
      link: post.url,
      description: post.description,
      content: post.content,
      author: [
        {
          name: "Jane Doe",
          email: "janedoe@example.com",
          link: "https://example.com/janedoe"
        },
        {
          name: "Joe Smith",
          email: "joesmith@example.com",
          link: "https://example.com/joesmith"
        }
      ],
      contributor: [
        {
          name: "Shawn Kemp",
          email: "shawnkemp@example.com",
          link: "https://example.com/shawnkemp"
        },
        {
          name: "Reggie Miller",
          email: "reggiemiller@example.com",
          link: "https://example.com/reggiemiller"
        }
      ],
      date: post.date,
      image: post.image
    });
  });
   
  feed.addCategory("Technologie");
   
  feed.addContributor({
    name: "Johan Cruyff",
    email: "johancruyff@example.com",
    link: "https://example.com/johancruyff"
  });

  res.type('application/rss+xml');
  // console.log(feed.rss2());
  res.send(feed.rss2());
});

app.listen(PORT, function(error) {
  if (error) {
    console.log("An error occurred: " + error);
  } else {
    console.log(`express started on port ${PORT}`);
  }
});